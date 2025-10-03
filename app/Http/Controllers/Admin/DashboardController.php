<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Models\Portfolio;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard
     */
    public function index(): Response
    {
        $stats = [
            'total_portfolios' => Portfolio::count(),
            'total_products' => Product::count(),
            'total_leads' => Lead::count(),
            'new_leads' => Lead::where('status', 'new')->count(),
        ];

        $recentLeads = Lead::orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recent_leads' => $recentLeads,
        ]);
    }
}
