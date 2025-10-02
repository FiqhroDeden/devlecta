<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Services\ProductService;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function __construct(
        protected ProductService $productService
    ) {}

    /**
     * Display a listing of products
     */
    public function index()
    {
        $filters = request()->only(['category']);
        $products = $this->productService->getFilteredProducts($filters, 12);

        // Return JSON for API requests
        if (request()->wantsJson() || request()->is('api/*')) {
            return ProductResource::collection($products);
        }

        return Inertia::render('Products/Index', [
            'products' => ProductResource::collection($products),
            'filters' => $filters,
        ]);
    }

    /**
     * Display the specified product
     */
    public function show(string $slug)
    {
        $product = $this->productService->getProductBySlug($slug);

        if (!$product) {
            abort(404, 'Product not found');
        }

        $relatedProducts = $this->productService->getRelatedProducts($product, 4);

        // Return JSON for API requests
        if (request()->wantsJson() || request()->is('api/*')) {
            return response()->json([
                'data' => new ProductResource($product),
                'related' => $relatedProducts,
            ]);
        }

        return Inertia::render('Products/Show', [
            'product' => new ProductResource($product),
            'relatedProducts' => $relatedProducts,
        ]);
    }
}
