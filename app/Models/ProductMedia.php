<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductMedia extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'product_id',
        'type',
        'path',
        'display_order',
    ];

    protected function casts(): array
    {
        return [
            'display_order' => 'integer',
            'created_at' => 'datetime',
        ];
    }

    /**
     * Get the product
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
