<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use App\Services\MediaService;
use App\Services\ProductService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function __construct(
        protected ProductService $productService,
        protected MediaService $mediaService
    ) {}

    /**
     * Display a listing of products
     */
    public function index(): Response
    {
        $this->authorize('viewAny', Product::class);

        $products = Product::with(['category'])
            ->when(request('status'), fn($q, $v) => $q->where('status', $v))
            ->when(request('search'), fn($q, $v) => $q->where('name', 'like', "%{$v}%"))
            ->orderBy('created_at', 'desc')
            ->paginate(25);

        return Inertia::render('Admin/Products/Index', [
            'products' => ProductResource::collection($products),
            'filters' => request()->only(['status', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new product
     */
    public function create(): Response
    {
        $this->authorize('create', Product::class);

        return Inertia::render('Admin/Products/Create', [
            'categories' => Category::where('type', 'product')->get(),
        ]);
    }

    /**
     * Store a newly created product
     */
    public function store(StoreProductRequest $request): RedirectResponse
    {
        $this->authorize('create', Product::class);

        $product = Product::create($request->except(['images']));

        // Upload images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $type = $index === 0 ? 'thumbnail' : 'screenshot';
                $mediaData = $this->mediaService->uploadProductImage($image, $product->id, $type, $index);
                $product->media()->create($mediaData);
            }
        }

        // Invalidate cache
        $this->productService->invalidateCache();

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'Product created successfully.');
    }

    /**
     * Show the form for editing the product
     */
    public function edit(Product $product): Response
    {
        $this->authorize('update', $product);

        return Inertia::render('Admin/Products/Edit', [
            'product' => new ProductResource($product->load(['category', 'media'])),
            'categories' => Category::where('type', 'product')->get(),
        ]);
    }

    /**
     * Update the specified product
     */
    public function update(StoreProductRequest $request, Product $product): RedirectResponse
    {
        $this->authorize('update', $product);

        $product->update($request->except(['images']));

        // Upload new images
        if ($request->hasFile('images')) {
            $currentCount = $product->media()->count();
            foreach ($request->file('images') as $index => $image) {
                $type = $currentCount === 0 && $index === 0 ? 'thumbnail' : 'screenshot';
                $mediaData = $this->mediaService->uploadProductImage($image, $product->id, $type, $currentCount + $index);
                $product->media()->create($mediaData);
            }
        }

        // Invalidate cache
        $this->productService->invalidateCache();

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified product (soft delete)
     */
    public function destroy(Product $product): RedirectResponse
    {
        $this->authorize('delete', $product);

        $product->delete();

        // Invalidate cache
        $this->productService->invalidateCache();

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'Product archived successfully.');
    }
}
