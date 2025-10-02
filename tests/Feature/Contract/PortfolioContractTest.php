<?php

use App\Models\Category;
use App\Models\Portfolio;
use App\Models\Technology;

test('GET /portfolio returns paginated list with correct schema', function () {
    $category = Category::factory()->create(['type' => 'portfolio']);
    Portfolio::factory()->count(15)->create([
        'category_id' => $category->id,
        'status' => 'published',
    ]);

    $response = $this->getJson('/api/portfolio');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'title',
                    'slug',
                    'description',
                    'type',
                    'category',
                    'featured',
                    'created_at',
                ],
            ],
            'meta' => [
                'current_page',
                'total',
                'per_page',
            ],
            'links',
        ]);
});

test('GET /portfolio?category={slug} filters by category', function () {
    $category1 = Category::factory()->create(['type' => 'portfolio', 'slug' => 'web-development']);
    $category2 = Category::factory()->create(['type' => 'portfolio', 'slug' => 'mobile-apps']);

    Portfolio::factory()->count(5)->create(['category_id' => $category1->id, 'status' => 'published']);
    Portfolio::factory()->count(3)->create(['category_id' => $category2->id, 'status' => 'published']);

    $response = $this->getJson('/api/portfolio?category=web-development');

    $response->assertStatus(200);
    expect($response->json('data'))->toHaveCount(5);
});

test('GET /portfolio?technology={slug} filters by technology', function () {
    $category = Category::factory()->create(['type' => 'portfolio']);
    $tech1 = Technology::factory()->create(['slug' => 'laravel']);
    $tech2 = Technology::factory()->create(['slug' => 'react']);

    $portfolio1 = Portfolio::factory()->create(['category_id' => $category->id, 'status' => 'published']);
    $portfolio1->technologies()->attach($tech1);

    $portfolio2 = Portfolio::factory()->create(['category_id' => $category->id, 'status' => 'published']);
    $portfolio2->technologies()->attach($tech2);

    $response = $this->getJson('/api/portfolio?technology=laravel');

    $response->assertStatus(200);
    expect($response->json('data'))->toHaveCount(1);
    expect($response->json('data.0.id'))->toBe($portfolio1->id);
});

test('GET /portfolio/{slug} returns detail with technologies, media, related projects', function () {
    $category = Category::factory()->create(['type' => 'portfolio']);
    $technology = Technology::factory()->create();

    $portfolio = Portfolio::factory()->create([
        'category_id' => $category->id,
        'slug' => 'test-project',
        'status' => 'published',
    ]);
    $portfolio->technologies()->attach($technology);

    $response = $this->getJson('/api/portfolio/test-project');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                'id',
                'title',
                'slug',
                'description',
                'challenge',
                'solution',
                'results',
                'technologies' => [
                    '*' => ['id', 'name', 'slug'],
                ],
                'media',
                'related_projects',
            ],
        ]);
});

test('GET /portfolio/invalid-slug returns 404', function () {
    $response = $this->getJson('/api/portfolio/non-existent-slug');

    $response->assertStatus(404);
});
