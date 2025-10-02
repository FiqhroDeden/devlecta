<?php

use App\Models\Category;
use App\Models\Portfolio;
use App\Models\User;

test('POST /admin/portfolio creates portfolio (authenticated admin)', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $category = Category::factory()->create(['type' => 'portfolio']);

    $response = $this->actingAs($user)->postJson('/api/admin/portfolio', [
        'title' => 'New Portfolio Project',
        'description' => 'This is a detailed description with more than 50 characters to pass validation.',
        'category_id' => $category->id,
        'type' => 'custom_project',
        'status' => 'published',
    ]);

    $response->assertStatus(201)
        ->assertJsonStructure([
            'data' => [
                'id',
                'title',
                'slug',
                'status',
            ],
        ]);

    $this->assertDatabaseHas('portfolios', [
        'title' => 'New Portfolio Project',
        'slug' => 'new-portfolio-project',
    ]);
});

test('POST /admin/portfolio returns 422 with validation errors for invalid data', function () {
    $user = User::factory()->create(['role' => 'admin']);

    $response = $this->actingAs($user)->postJson('/api/admin/portfolio', [
        'title' => 'Test',
        'description' => 'Short', // Less than 50 characters
        // Missing required category_id
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['description', 'category_id']);
});

test('PUT /admin/portfolio/{id} updates portfolio', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $category = Category::factory()->create(['type' => 'portfolio']);
    $portfolio = Portfolio::factory()->create([
        'category_id' => $category->id,
        'title' => 'Original Title',
    ]);

    $response = $this->actingAs($user)->putJson("/api/admin/portfolio/{$portfolio->id}", [
        'title' => 'Updated Title',
        'description' => 'This is an updated description with more than 50 characters required.',
        'category_id' => $category->id,
        'type' => 'custom_project',
        'status' => 'published',
    ]);

    $response->assertStatus(200);

    $this->assertDatabaseHas('portfolios', [
        'id' => $portfolio->id,
        'title' => 'Updated Title',
    ]);
});

test('DELETE /admin/portfolio/{id} soft deletes portfolio', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $category = Category::factory()->create(['type' => 'portfolio']);
    $portfolio = Portfolio::factory()->create(['category_id' => $category->id]);

    $response = $this->actingAs($user)->deleteJson("/api/admin/portfolio/{$portfolio->id}");

    $response->assertStatus(200);

    $this->assertSoftDeleted('portfolios', [
        'id' => $portfolio->id,
    ]);
});

test('unauthenticated user gets 401 on admin routes', function () {
    $category = Category::factory()->create(['type' => 'portfolio']);

    $response = $this->postJson('/api/admin/portfolio', [
        'title' => 'Unauthorized',
        'description' => 'This should fail without authentication.',
        'category_id' => $category->id,
    ]);

    $response->assertStatus(401);
});
