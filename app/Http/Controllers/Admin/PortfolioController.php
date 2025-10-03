<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePortfolioRequest;
use App\Http\Requests\Admin\UpdatePortfolioRequest;
use App\Http\Resources\PortfolioResource;
use App\Models\Category;
use App\Models\Portfolio;
use App\Models\Technology;
use App\Services\MediaService;
use App\Services\PortfolioService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    public function __construct(
        protected PortfolioService $portfolioService,
        protected MediaService $mediaService
    ) {}

    /**
     * Display a listing of portfolios
     */
    public function index(): Response
    {
        $portfolios = Portfolio::with(['category', 'technologies'])
            ->when(request('status'), fn ($q, $v) => $q->where('status', $v))
            ->when(request('search'), fn ($q, $v) => $q->where('title', 'like', "%{$v}%"))
            ->orderBy('created_at', 'desc')
            ->paginate(25);

        return Inertia::render('Admin/Portfolio/Index', [
            'portfolios' => PortfolioResource::collection($portfolios),
            'filters' => request()->only(['status', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new portfolio
     */
    public function create(): Response
    {
        // $this->authorize('create', Portfolio::class);

        return Inertia::render('Admin/Portfolio/Create', [
            'categories' => Category::where('type', 'portfolio')->get(),
            'technologies' => Technology::orderBy('name')->get(),
        ]);
    }

    /**
     * Store a newly created portfolio
     */
    public function store(StorePortfolioRequest $request): RedirectResponse
    {
        // $this->authorize('create', Portfolio::class);

        $portfolio = Portfolio::create($request->except(['technology_ids', 'images']));

        // Attach technologies
        if ($request->has('technology_ids')) {
            $portfolio->technologies()->sync($request->technology_ids);
        }

        // Upload images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $mediaData = $this->mediaService->uploadPortfolioImage($image, $portfolio->id, $index);
                $portfolio->media()->create($mediaData);
            }
        }

        // Invalidate cache
        $this->portfolioService->invalidateCache();

        return redirect()
            ->route('admin.portfolio.index')
            ->with('success', 'Portfolio created successfully.');
    }

    /**
     * Show the form for editing the portfolio
     */
    public function edit(Portfolio $portfolio): Response
    {
        // $this->authorize('update', $portfolio);

        return Inertia::render('Admin/Portfolio/Edit', [
            'portfolio' => new PortfolioResource($portfolio->load(['category', 'technologies', 'media'])),
            'categories' => Category::where('type', 'portfolio')->get(),
            'technologies' => Technology::orderBy('name')->get(),
        ]);
    }

    /**
     * Update the specified portfolio
     */
    public function update(UpdatePortfolioRequest $request, Portfolio $portfolio): RedirectResponse
    {
        // $this->authorize('update', $portfolio);

        $portfolio->update($request->except(['technology_ids', 'images']));

        // Sync technologies
        if ($request->has('technology_ids')) {
            $portfolio->technologies()->sync($request->technology_ids);
        }

        // Upload new images
        if ($request->hasFile('images')) {
            $currentCount = $portfolio->media()->count();
            foreach ($request->file('images') as $index => $image) {
                $mediaData = $this->mediaService->uploadPortfolioImage($image, $portfolio->id, $currentCount + $index);
                $portfolio->media()->create($mediaData);
            }
        }

        // Invalidate cache
        $this->portfolioService->invalidateCache();

        return redirect()
            ->route('admin.portfolio.index')
            ->with('success', 'Portfolio updated successfully.');
    }

    /**
     * Remove the specified portfolio (soft delete)
     */
    public function destroy(Portfolio $portfolio): RedirectResponse
    {
        // $this->authorize('delete', $portfolio);

        $portfolio->delete();

        // Invalidate cache
        $this->portfolioService->invalidateCache();

        return redirect()
            ->route('admin.portfolio.index')
            ->with('success', 'Portfolio archived successfully.');
    }
}
