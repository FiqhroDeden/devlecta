<?php

use App\Models\Category;
use App\Models\Product;

test('GET /products returns paginated list', function () {
    $category = Category::factory()->create(['type' => 'product']);
    Product::factory()->count(10)->create([
        'category_id' => $category->id,
        'status' => 'published',
    ]);

    $response = $this->getJson('/api/products');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    'slug',
                    'description',
                    'price',
                    'envato_url',
                    'rating',
                    'reviews_count',
                ],
            ],
            'meta',
            'links',
        ]);
});

test('GET /products?category={slug} filters by category', function () {
    $category1 = Category::factory()->create(['type' => 'product', 'slug' => 'wordpress-themes']);
    $category2 = Category::factory()->create(['type' => 'product', 'slug' => 'laravel-packages']);

    Product::factory()->count(4)->create(['category_id' => $category1->id, 'status' => 'published']);
    Product::factory()->count(2)->create(['category_id' => $category2->id, 'status' => 'published']);

    $response = $this->getJson('/api/products?category=wordpress-themes');

    $response->assertStatus(200);
    expect($response->json('data'))->toHaveCount(4);
});

test('GET /products/{slug} returns detail with media, related products', function () {
    $category = Category::factory()->create(['type' => 'product']);
    $product = Product::factory()->create([
        'category_id' => $category->id,
        'slug' => 'test-product',
        'status' => 'published',
    ]);

    $response = $this->getJson('/api/products/test-product');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'slug',
                'description',
                'price',
                'envato_url',
                'demo_link',
                'docs_link',
                'features',
                'media',
                'related_products',
            ],
        ]);
});
