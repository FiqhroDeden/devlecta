<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Cache;

class ProductService
{
    /**
     * Get filtered products with caching and eager loading
     */
    public function getFilteredProducts(array $filters, int $perPage = 12): LengthAwarePaginator
    {
        $cacheKey = 'products:' . md5(json_encode($filters) . ':' . $perPage);

        return Cache::tags(['products'])->remember(
            $cacheKey,
            300, // 5 minutes TTL
            fn() => $this->buildProductQuery($filters)->paginate($perPage)
        );
    }

    /**
     * Get product by slug with related data
     */
    public function getProductBySlug(string $slug): ?Product
    {
        $cacheKey = 'products:detail:' . $slug;

        return Cache::tags(['products'])->remember(
            $cacheKey,
            300,
            fn() => Product::with(['category', 'media'])
                ->where('slug', $slug)
                ->where('status', 'published')
                ->first()
        );
    }

    /**
     * Get related products
     */
    public function getRelatedProducts(Product $product, int $limit = 4): array
    {
        return Product::with(['category', 'media'])
            ->where('id', '!=', $product->id)
            ->where('category_id', $product->category_id)
            ->where('status', 'published')
            ->orderBy('rating', 'desc')
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get()
            ->toArray();
    }

    /**
     * Invalidate product cache
     */
    public function invalidateCache(): void
    {
        Cache::tags(['products'])->flush();
    }

    /**
     * Build product query with filters
     */
    protected function buildProductQuery(array $filters)
    {
        return Product::with(['category', 'media'])
            ->when($filters['category'] ?? null, function ($query, $categorySlug) {
                $query->whereHas('category', fn($q) => $q->where('slug', $categorySlug));
            })
            ->where('status', 'published')
            ->orderBy('rating', 'desc')
            ->orderBy('created_at', 'desc');
    }
}
