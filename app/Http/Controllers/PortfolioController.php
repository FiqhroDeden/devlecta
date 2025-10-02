<?php

namespace App\Http\Controllers;

use App\Http\Resources\PortfolioResource;
use App\Services\PortfolioService;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    public function __construct(
        protected PortfolioService $portfolioService
    ) {}

    /**
     * Display a listing of portfolios
     */
    public function index(): Response
    {
        $filters = request()->only(['category', 'technology', 'type', 'industry']);
        $portfolios = $this->portfolioService->getFilteredPortfolio($filters, 12);

        return Inertia::render('Portfolio/Index', [
            'portfolios' => PortfolioResource::collection($portfolios),
            'filters' => $filters,
        ]);
    }

    /**
     * Display the specified portfolio
     */
    public function show(string $slug): Response
    {
        $portfolio = $this->portfolioService->getPortfolioBySlug($slug);

        if (!$portfolio) {
            abort(404, 'Portfolio not found');
        }

        $relatedPortfolios = $this->portfolioService->getRelatedPortfolios($portfolio, 4);

        return Inertia::render('Portfolio/Show', [
            'portfolio' => new PortfolioResource($portfolio),
            'relatedPortfolios' => $relatedPortfolios,
        ]);
    }
}
