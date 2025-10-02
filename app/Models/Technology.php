<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Technology extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'category',
        'usage_count',
        'display_order',
    ];

    protected function casts(): array
    {
        return [
            'usage_count' => 'integer',
            'display_order' => 'integer',
        ];
    }

    /**
     * Get portfolios using this technology
     */
    public function portfolios(): BelongsToMany
    {
        return $this->belongsToMany(Portfolio::class, 'portfolio_technology')
            ->withTimestamps();
    }
}
