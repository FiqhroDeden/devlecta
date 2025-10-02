<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PortfolioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'type' => $this->type,
            'industry' => $this->industry,
            'challenge' => $this->challenge,
            'solution' => $this->solution,
            'results' => $this->results,
            'duration' => $this->duration,
            'client_name' => $this->client_name,
            'featured' => (bool) $this->featured,
            'status' => $this->status,
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),

            // Relationships
            'category' => [
                'id' => $this->category?->id,
                'name' => $this->category?->name,
                'slug' => $this->category?->slug,
            ],
            'technologies' => $this->technologies->map(fn($tech) => [
                'id' => $tech->id,
                'name' => $tech->name,
                'slug' => $tech->slug,
                'category' => $tech->category,
            ]),
            'media' => $this->media->map(fn($media) => [
                'id' => $media->id,
                'type' => $media->type,
                'path' => asset('storage/' . $media->path),
                'display_order' => $media->display_order,
            ]),
        ];
    }
}
