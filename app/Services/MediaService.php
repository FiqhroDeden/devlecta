<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;

class MediaService
{
    /**
     * Upload portfolio image with optimization
     */
    public function uploadPortfolioImage(UploadedFile $file, int $portfolioId, int $displayOrder = 0): array
    {
        $this->validateImage($file);

        $directory = "portfolio/{$portfolioId}";
        $filename = Str::uuid() . '.webp';

        // Generate multiple sizes
        $sizes = [
            'thumbnail' => 300,
            'medium' => 800,
            'large' => 1200,
        ];

        $paths = [];

        foreach ($sizes as $sizeName => $width) {
            $image = Image::read($file);
            $image->scale(width: $width);

            $path = "{$directory}/{$sizeName}_{$filename}";
            Storage::disk('public')->put($path, (string) $image->toWebp(90));

            $paths[$sizeName] = $path;
        }

        return [
            'type' => 'image',
            'path' => $paths['large'], // Store large as primary
            'display_order' => $displayOrder,
            'sizes' => $paths,
        ];
    }

    /**
     * Upload product media
     */
    public function uploadProductImage(UploadedFile $file, int $productId, string $type = 'screenshot', int $displayOrder = 0): array
    {
        $this->validateImage($file);

        $directory = "products/{$productId}";
        $filename = Str::uuid() . '.webp';

        $image = Image::read($file);

        // Generate optimized WebP
        if ($type === 'thumbnail') {
            $image->scale(width: 400);
        } else {
            $image->scale(width: 1200);
        }

        $path = "{$directory}/{$type}_{$filename}";
        Storage::disk('public')->put($path, (string) $image->toWebp(90));

        return [
            'type' => $type,
            'path' => $path,
            'display_order' => $displayOrder,
        ];
    }

    /**
     * Delete orphaned media files
     */
    public function deleteOrphanedMedia(): int
    {
        // Get all portfolio and product IDs
        $portfolioIds = \App\Models\Portfolio::pluck('id')->toArray();
        $productIds = \App\Models\Product::pluck('id')->toArray();

        $deletedCount = 0;

        // Clean portfolio directory
        $portfolioDirs = Storage::disk('public')->directories('portfolio');
        foreach ($portfolioDirs as $dir) {
            $id = (int) basename($dir);
            if (!in_array($id, $portfolioIds)) {
                Storage::disk('public')->deleteDirectory($dir);
                $deletedCount++;
            }
        }

        // Clean products directory
        $productDirs = Storage::disk('public')->directories('products');
        foreach ($productDirs as $dir) {
            $id = (int) basename($dir);
            if (!in_array($id, $productIds)) {
                Storage::disk('public')->deleteDirectory($dir);
                $deletedCount++;
            }
        }

        return $deletedCount;
    }

    /**
     * Validate image file
     */
    protected function validateImage(UploadedFile $file): void
    {
        $allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
        $maxSize = 5 * 1024 * 1024; // 5MB

        if (!in_array($file->getMimeType(), $allowedMimes)) {
            throw new \InvalidArgumentException('Invalid file type. Only JPG, PNG, and WebP are allowed.');
        }

        if ($file->getSize() > $maxSize) {
            throw new \InvalidArgumentException('File size exceeds 5MB limit.');
        }
    }
}
