<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'price' => $this->price ? number_format((float) $this->price, 2) : null,
            'envato_url' => $this->envato_url,
            'rating' => $this->rating ? number_format((float) $this->rating, 2) : null,
            'reviews_count' => $this->reviews_count,
            'demo_link' => $this->demo_link,
            'docs_link' => $this->docs_link,
            'features' => $this->features,
            'changelog' => $this->changelog,
            'status' => $this->status,
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),

            // Relationships
            'category' => [
                'id' => $this->category?->id,
                'name' => $this->category?->name,
                'slug' => $this->category?->slug,
            ],
            'media' => $this->media->map(fn ($media) => [
                'id' => $media->id,
                'type' => $media->type,
                'path' => asset('storage/'.$media->path),
                'display_order' => $media->display_order,
            ]),
        ];
    }
}
