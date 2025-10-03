<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Services\LeadService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class LeadController extends Controller
{
    public function __construct(
        protected LeadService $leadService
    ) {}

    /**
     * Display a listing of leads
     */
    public function index(): Response
    {
        $leads = Lead::query()
            ->when(request('status'), fn ($q, $v) => $q->where('status', $v))
            ->when(request('date_from'), fn ($q, $v) => $q->whereDate('created_at', '>=', $v))
            ->when(request('date_to'), fn ($q, $v) => $q->whereDate('created_at', '<=', $v))
            ->orderBy('created_at', 'desc')
            ->paginate(25);

        return Inertia::render('Admin/Leads/Index', [
            'leads' => $leads,
            'filters' => request()->only(['status', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Display the specified lead
     */
    public function show(Lead $lead): Response
    {
        return Inertia::render('Admin/Leads/Show', [
            'lead' => $lead,
        ]);
    }

    /**
     * Update the specified lead
     */
    public function update(Request $request, Lead $lead): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:new,contacted,qualified,converted,closed'],
            'admin_notes' => ['nullable', 'string'],
        ]);

        $this->leadService->updateLeadStatus(
            $lead->id,
            $validated['status'],
            $validated['admin_notes'] ?? null
        );

        return redirect()
            ->route('admin.leads.index')
            ->with('success', 'Lead updated successfully.');
    }

    /**
     * Export leads to CSV
     */
    public function export(): StreamedResponse
    {
        $filters = request()->only(['status', 'date_from', 'date_to']);

        return $this->leadService->exportToCsv($filters);
    }
}
