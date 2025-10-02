<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Portfolio extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'category_id',
        'type',
        'industry',
        'challenge',
        'solution',
        'results',
        'duration',
        'client_name',
        'featured',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'results' => 'array',
            'featured' => 'boolean',
        ];
    }

    /**
     * Get the category
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get technologies used
     */
    public function technologies(): BelongsToMany
    {
        return $this->belongsToMany(Technology::class, 'portfolio_technology')
            ->withTimestamps();
    }

    /**
     * Get portfolio media
     */
    public function media(): HasMany
    {
        return $this->hasMany(PortfolioMedia::class)->orderBy('display_order');
    }
}
