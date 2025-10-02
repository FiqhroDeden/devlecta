<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\User;

test('POST /admin/products creates product (authenticated)', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $category = Category::factory()->create(['type' => 'product']);

    $response = $this->actingAs($user)->postJson('/api/admin/products', [
        'name' => 'New Product',
        'description' => 'This is a detailed product description with more than 50 characters.',
        'category_id' => $category->id,
        'envato_url' => 'https://themeforest.net/item/test-product/12345',
        'status' => 'published',
    ]);

    $response->assertStatus(201)
        ->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'slug',
            ],
        ]);

    $this->assertDatabaseHas('products', [
        'name' => 'New Product',
    ]);
});

test('PUT /admin/products/{id} updates product', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $category = Category::factory()->create(['type' => 'product']);
    $product = Product::factory()->create([
        'category_id' => $category->id,
        'name' => 'Original Product',
    ]);

    $response = $this->actingAs($user)->putJson("/api/admin/products/{$product->id}", [
        'name' => 'Updated Product',
        'description' => 'Updated description with more than 50 characters for validation.',
        'category_id' => $category->id,
        'envato_url' => 'https://themeforest.net/item/updated/67890',
        'status' => 'published',
    ]);

    $response->assertStatus(200);

    $this->assertDatabaseHas('products', [
        'id' => $product->id,
        'name' => 'Updated Product',
    ]);
});

test('DELETE /admin/products/{id} soft deletes product', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $category = Category::factory()->create(['type' => 'product']);
    $product = Product::factory()->create(['category_id' => $category->id]);

    $response = $this->actingAs($user)->deleteJson("/api/admin/products/{$product->id}");

    $response->assertStatus(200);

    $this->assertSoftDeleted('products', [
        'id' => $product->id,
    ]);
});
