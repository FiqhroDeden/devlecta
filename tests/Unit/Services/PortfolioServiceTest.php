<?php

use App\Models\Category;
use App\Models\Portfolio;
use App\Models\Technology;
use App\Services\PortfolioService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->service = new PortfolioService;
});

it('filters portfolios by category', function () {
    $category = Category::factory()->create(['slug' => 'web-development']);
    $portfolio = Portfolio::factory()->create([
        'category_id' => $category->id,
        'status' => 'published',
    ]);

    $result = $this->service->getFilteredPortfolio(['category' => 'web-development']);

    expect($result->items())->toHaveCount(1);
    expect($result->first()->id)->toBe($portfolio->id);
});

it('filters portfolios by technology', function () {
    $tech = Technology::factory()->create(['slug' => 'laravel']);
    $portfolio = Portfolio::factory()->create(['status' => 'published']);
    $portfolio->technologies()->attach($tech);

    $result = $this->service->getFilteredPortfolio(['technology' => 'laravel']);

    expect($result->items())->toHaveCount(1);
    expect($result->first()->id)->toBe($portfolio->id);
});

it('filters portfolios by type', function () {
    Portfolio::factory()->create(['type' => 'custom_project', 'status' => 'published']);
    Portfolio::factory()->create(['type' => 'envato_product', 'status' => 'published']);

    $result = $this->service->getFilteredPortfolio(['type' => 'custom_project']);

    expect($result->items())->toHaveCount(1);
    expect($result->first()->type)->toBe('custom_project');
});

it('caches filtered portfolio results', function () {
    Cache::spy();
    Portfolio::factory()->count(3)->create(['status' => 'published']);

    // First call - should cache
    $this->service->getFilteredPortfolio([]);

    Cache::shouldHaveReceived('tags')->with(['portfolio'])->once();
});

it('returns cached results on second call', function () {
    Portfolio::factory()->count(3)->create(['status' => 'published']);

    // First call - hits database
    $result1 = $this->service->getFilteredPortfolio([]);

    // Second call - should hit cache
    $result2 = $this->service->getFilteredPortfolio([]);

    expect($result1->items())->toHaveCount(3);
    expect($result2->items())->toHaveCount(3);
    expect($result1->first()->id)->toBe($result2->first()->id);
});

it('eager loads relationships to prevent N+1 queries', function () {
    $portfolio = Portfolio::factory()->create(['status' => 'published']);

    enableQueryLog();

    $result = $this->service->getFilteredPortfolio([]);
    $portfolio = $result->first();

    // Access relationships
    $portfolio->category;
    $portfolio->technologies;
    $portfolio->media;

    $queries = getQueryLog();

    // Should have max 4-5 queries due to eager loading (portfolio, category, technologies, media, + count)
    expect(count($queries))->toBeLessThan(8);
});

it('returns related portfolios from same category', function () {
    $category = Category::factory()->create();
    $portfolio1 = Portfolio::factory()->create(['category_id' => $category->id, 'status' => 'published']);
    $portfolio2 = Portfolio::factory()->create(['category_id' => $category->id, 'status' => 'published']);
    $portfolio3 = Portfolio::factory()->create(['category_id' => $category->id, 'status' => 'published']);

    $related = $this->service->getRelatedPortfolios($portfolio1, 2);

    expect($related)->toHaveCount(2);
    expect(collect($related)->pluck('id'))->not->toContain($portfolio1->id);
});

it('invalidates cache when requested', function () {
    Cache::spy();

    $this->service->invalidateCache();

    Cache::shouldHaveReceived('tags')->with(['portfolio'])->once();
});
