<?php

use App\Models\Category;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->service = new ProductService;
});

it('filters products by category', function () {
    $category = Category::factory()->create(['slug' => 'wordpress-themes', 'type' => 'product']);
    $product = Product::factory()->create([
        'category_id' => $category->id,
        'status' => 'published',
    ]);

    $result = $this->service->getFilteredProducts(['category' => 'wordpress-themes']);

    expect($result->items())->toHaveCount(1);
    expect($result->first()->id)->toBe($product->id);
});

it('only returns published products', function () {
    Product::factory()->create(['status' => 'draft']);
    Product::factory()->create(['status' => 'published']);
    Product::factory()->create(['status' => 'archived']);

    $result = $this->service->getFilteredProducts([]);

    expect($result->items())->toHaveCount(1);
    expect($result->first()->status)->toBe('published');
});

it('caches product listings', function () {
    Cache::spy();
    Product::factory()->count(5)->create(['status' => 'published']);

    $this->service->getFilteredProducts([]);

    Cache::shouldHaveReceived('tags')->with(['products'])->once();
});

it('returns cached results on second call', function () {
    Product::factory()->count(5)->create(['status' => 'published']);

    $result1 = $this->service->getFilteredProducts([]);
    $result2 = $this->service->getFilteredProducts([]);

    expect($result1->items())->toHaveCount(5);
    expect($result2->items())->toHaveCount(5);
    expect($result1->first()->id)->toBe($result2->first()->id);
});

it('eager loads relationships', function () {
    $product = Product::factory()->create(['status' => 'published']);

    enableQueryLog();

    $result = $this->service->getFilteredProducts([]);
    $product = $result->first();

    // Access relationships
    $product->category;
    $product->media;

    $queries = getQueryLog();

    expect(count($queries))->toBeLessThan(8);
});

it('returns related products from same category', function () {
    $category = Category::factory()->create(['type' => 'product']);
    $product1 = Product::factory()->create(['category_id' => $category->id, 'status' => 'published']);
    $product2 = Product::factory()->create(['category_id' => $category->id, 'status' => 'published']);
    $product3 = Product::factory()->create(['category_id' => $category->id, 'status' => 'published']);

    $related = $this->service->getRelatedProducts($product1, 2);

    expect($related)->toHaveCount(2);
    expect(collect($related)->pluck('id'))->not->toContain($product1->id);
});

it('invalidates cache when requested', function () {
    Cache::spy();

    $this->service->invalidateCache();

    Cache::shouldHaveReceived('tags')->with(['products'])->once();
});
