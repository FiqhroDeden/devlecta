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
    public function index(): Response
    {
        $filters = request()->only(['category']);
        $products = $this->productService->getFilteredProducts($filters, 12);

        return Inertia::render('Products/Index', [
            'products' => ProductResource::collection($products),
            'filters' => $filters,
        ]);
    }

    /**
     * Display the specified product
     */
    public function show(string $slug): Response
    {
        $product = $this->productService->getProductBySlug($slug);

        if (!$product) {
            abort(404, 'Product not found');
        }

        $relatedProducts = $this->productService->getRelatedProducts($product, 4);

        return Inertia::render('Products/Show', [
            'product' => new ProductResource($product),
            'relatedProducts' => $relatedProducts,
        ]);
    }
}
