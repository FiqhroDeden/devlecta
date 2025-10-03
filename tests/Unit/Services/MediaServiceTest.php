<?php

use App\Models\Portfolio;
use App\Models\PortfolioMedia;
use App\Services\MediaService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

beforeEach(function () {
    Storage::fake('public');
    $this->service = new MediaService;
});

it('uploads portfolio image successfully', function () {
    $portfolio = Portfolio::factory()->create();
    $file = UploadedFile::fake()->image('screenshot.jpg', 1200, 800);

    $media = $this->service->uploadPortfolioImage($file, $portfolio->id);

    expect($media)->toBeInstanceOf(PortfolioMedia::class);
    expect($media->portfolio_id)->toBe($portfolio->id);
    expect($media->type)->toBe('image');
    Storage::disk('public')->assertExists($media->path);
});

it('validates file type', function () {
    $portfolio = Portfolio::factory()->create();
    $file = UploadedFile::fake()->create('document.pdf', 1000);

    expect(fn () => $this->service->uploadPortfolioImage($file, $portfolio->id))
        ->toThrow(ValidationException::class);
});

it('validates file size is under 5MB', function () {
    $portfolio = Portfolio::factory()->create();
    $file = UploadedFile::fake()->image('large.jpg', 3000, 3000)->size(6000); // 6MB

    expect(fn () => $this->service->uploadPortfolioImage($file, $portfolio->id))
        ->toThrow(ValidationException::class);
});

it('generates WebP version of uploaded image', function () {
    $portfolio = Portfolio::factory()->create();
    $file = UploadedFile::fake()->image('screenshot.jpg');

    $media = $this->service->uploadPortfolioImage($file, $portfolio->id);

    $webpPath = str_replace('.jpg', '.webp', $media->path);
    Storage::disk('public')->assertExists($webpPath);
});

it('creates multiple image sizes', function () {
    $portfolio = Portfolio::factory()->create();
    $file = UploadedFile::fake()->image('screenshot.jpg', 1920, 1080);

    $media = $this->service->uploadPortfolioImage($file, $portfolio->id);

    // Check for thumbnail, medium, large versions
    $basePath = pathinfo($media->path, PATHINFO_DIRNAME);
    $filename = pathinfo($media->path, PATHINFO_FILENAME);

    Storage::disk('public')->assertExists("{$basePath}/{$filename}_thumb.jpg");
    Storage::disk('public')->assertExists("{$basePath}/{$filename}_medium.jpg");
    Storage::disk('public')->assertExists("{$basePath}/{$filename}_large.jpg");
});

it('deletes orphaned media files', function () {
    $portfolio = Portfolio::factory()->create();
    $media = PortfolioMedia::factory()->create([
        'portfolio_id' => $portfolio->id,
        'path' => 'portfolio/test/image.jpg',
    ]);

    // Create fake file
    Storage::disk('public')->put($media->path, 'fake content');

    // Delete portfolio (soft delete)
    $portfolio->delete();

    // Run cleanup
    $deleted = $this->service->deleteOrphanedMedia();

    expect($deleted)->toBeGreaterThan(0);
    Storage::disk('public')->assertMissing($media->path);
});

it('preserves media for non-deleted portfolios', function () {
    $portfolio = Portfolio::factory()->create();
    $media = PortfolioMedia::factory()->create([
        'portfolio_id' => $portfolio->id,
        'path' => 'portfolio/test/image.jpg',
    ]);

    Storage::disk('public')->put($media->path, 'fake content');

    $deleted = $this->service->deleteOrphanedMedia();

    expect($deleted)->toBe(0);
    Storage::disk('public')->assertExists($media->path);
});
