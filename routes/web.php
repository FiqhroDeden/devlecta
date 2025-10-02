<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\LeadController;
use App\Http\Controllers\Admin\PortfolioController as AdminPortfolioController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Routes with Locale Prefix
|--------------------------------------------------------------------------
*/

// Root redirect to default locale
Route::get('/', function () {
    $locale = session('locale', 'en');
    return redirect("/{$locale}");
});

// Localized routes
Route::prefix('{locale}')->where(['locale' => 'en|id'])->middleware(['locale'])->group(function () {
    // Homepage
    Route::get('/', function () {
        return Inertia::render('Home');
    })->name('home');

    // Portfolio routes
    Route::get('/portfolio', [PortfolioController::class, 'index'])->name('portfolio.index');
    Route::get('/portfolio/{slug}', [PortfolioController::class, 'show'])->name('portfolio.show');

    // Product routes
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/products/{slug}', [ProductController::class, 'show'])->name('products.show');

    // Contact routes
    Route::get('/contact', [ContactController::class, 'create'])->name('contact.create');
    Route::post('/contact', [ContactController::class, 'store'])
        ->middleware('throttle:5,60') // 5 submissions per hour
        ->name('contact.store');

    // Services page
    Route::get('/services', function () {
        return Inertia::render('Services');
    })->name('services');

    // About page
    Route::get('/about', function () {
        return Inertia::render('About');
    })->name('about');
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Portfolio management
    Route::resource('portfolio', AdminPortfolioController::class);

    // Product management
    Route::resource('products', AdminProductController::class);

    // Lead management
    Route::get('/leads', [LeadController::class, 'index'])->name('leads.index');
    Route::get('/leads/{lead}', [LeadController::class, 'show'])->name('leads.show');
    Route::patch('/leads/{lead}', [LeadController::class, 'update'])->name('leads.update');
    Route::get('/leads/export', [LeadController::class, 'export'])->name('leads.export');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
