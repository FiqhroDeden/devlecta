<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_name',
        'company',
        'role',
        'text',
        'language',
        'rating',
        'avatar_path',
        'featured',
    ];

    protected function casts(): array
    {
        return [
            'featured' => 'boolean',
            'rating' => 'integer',
        ];
    }
}
