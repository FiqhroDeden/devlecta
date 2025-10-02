<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'company',
        'service_interest',
        'budget_range',
        'message',
        'preferred_lang',
        'status',
        'admin_notes',
        'ip_address',
    ];
}
