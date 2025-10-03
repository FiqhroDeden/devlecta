<?php

use App\Http\Controllers\Admin\LeadController;
use App\Http\Controllers\Admin\PortfolioController as AdminPortfolioController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public API routes
Route::get('/portfolio', [PortfolioController::class, 'index']);
Route::get('/portfolio/{slug}', [PortfolioController::class, 'show']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{slug}', [ProductController::class, 'show']);

Route::post('/contact', [ContactController::class, 'store'])
    ->middleware('throttle:5,60');

// Admin API routes (authenticated)
Route::middleware(['auth:sanctum'])->prefix('admin')->group(function () {
    Route::apiResource('portfolio', AdminPortfolioController::class);
    Route::apiResource('products', AdminProductController::class);

    Route::get('/leads', [LeadController::class, 'index']);
    Route::get('/leads/{lead}', [LeadController::class, 'show']);
    Route::patch('/leads/{lead}', [LeadController::class, 'update']);
    Route::get('/leads/export', [LeadController::class, 'export']);
});
