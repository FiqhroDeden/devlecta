<?php

namespace App\Services;

use App\Models\Portfolio;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Cache;

class PortfolioService
{
    /**
     * Get filtered portfolio with caching and eager loading
     */
    public function getFilteredPortfolio(array $filters, int $perPage = 12): LengthAwarePaginator
    {
        $cacheKey = 'portfolio:'.md5(json_encode($filters).':'.$perPage);

        return Cache::tags(['portfolio'])->remember(
            $cacheKey,
            300, // 5 minutes TTL
            fn () => $this->buildPortfolioQuery($filters)->paginate($perPage)
        );
    }

    /**
     * Get portfolio by slug with related data
     */
    public function getPortfolioBySlug(string $slug): ?Portfolio
    {
        $cacheKey = 'portfolio:detail:'.$slug;

        return Cache::tags(['portfolio'])->remember(
            $cacheKey,
            300,
            fn () => Portfolio::with(['category', 'technologies', 'media'])
                ->where('slug', $slug)
                ->where('status', 'published')
                ->first()
        );
    }

    /**
     * Get related portfolios
     */
    public function getRelatedPortfolios(Portfolio $portfolio, int $limit = 4): array
    {
        return Portfolio::with(['category', 'technologies', 'media'])
            ->where('id', '!=', $portfolio->id)
            ->where('category_id', $portfolio->category_id)
            ->where('status', 'published')
            ->orderBy('featured', 'desc')
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get()
            ->toArray();
    }

    /**
     * Invalidate portfolio cache
     */
    public function invalidateCache(): void
    {
        Cache::tags(['portfolio'])->flush();
    }

    /**
     * Build portfolio query with filters
     */
    protected function buildPortfolioQuery(array $filters)
    {
        return Portfolio::with(['category', 'technologies', 'media'])
            ->when($filters['category'] ?? null, function ($query, $categorySlug) {
                $query->whereHas('category', fn ($q) => $q->where('slug', $categorySlug));
            })
            ->when($filters['technology'] ?? null, function ($query, $technologySlug) {
                $query->whereHas('technologies', fn ($q) => $q->where('slug', $technologySlug));
            })
            ->when($filters['type'] ?? null, function ($query, $type) {
                $query->where('type', $type);
            })
            ->when($filters['industry'] ?? null, function ($query, $industry) {
                $query->where('industry', $industry);
            })
            ->where('status', 'published')
            ->orderBy('featured', 'desc')
            ->orderBy('created_at', 'desc');
    }
}
