<?php

namespace App\Services;

use App\Models\Lead;
use Illuminate\Support\Facades\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class LeadService
{
    /**
     * Create a new lead
     */
    public function createLead(array $data): Lead
    {
        return Lead::create($data);
    }

    /**
     * Update lead status and admin notes
     */
    public function updateLeadStatus(int $id, string $status, ?string $notes = null): Lead
    {
        $lead = Lead::findOrFail($id);

        $lead->update([
            'status' => $status,
            'admin_notes' => $notes ?? $lead->admin_notes,
        ]);

        return $lead->fresh();
    }

    /**
     * Export leads to CSV
     */
    public function exportToCsv(array $filters = []): StreamedResponse
    {
        $fileName = 'leads_'.($filters['status'] ?? 'all').'_'.now()->format('Y-m-d').'.csv';

        $leads = $this->getFilteredLeads($filters);

        return Response::streamDownload(function () use ($leads) {
            $handle = fopen('php://output', 'w');

            // CSV Headers
            fputcsv($handle, [
                'ID',
                'Name',
                'Email',
                'Phone',
                'Company',
                'Service Interest',
                'Budget Range',
                'Message',
                'Preferred Language',
                'Status',
                'IP Address',
                'Created At',
                'Updated At',
            ]);

            // CSV Rows
            foreach ($leads as $lead) {
                fputcsv($handle, [
                    $lead->id,
                    $lead->name,
                    $lead->email,
                    $lead->phone,
                    $lead->company,
                    $lead->service_interest,
                    $lead->budget_range,
                    $lead->message,
                    $lead->preferred_lang,
                    $lead->status,
                    $lead->ip_address,
                    $lead->created_at?->toDateTimeString(),
                    $lead->updated_at?->toDateTimeString(),
                ]);
            }

            fclose($handle);
        }, $fileName, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="'.$fileName.'"',
        ]);
    }

    /**
     * Get filtered leads
     */
    protected function getFilteredLeads(array $filters)
    {
        return Lead::query()
            ->when($filters['status'] ?? null, fn ($q, $v) => $q->where('status', $v))
            ->when($filters['date_from'] ?? null, fn ($q, $v) => $q->whereDate('created_at', '>=', $v))
            ->when($filters['date_to'] ?? null, fn ($q, $v) => $q->whereDate('created_at', '<=', $v))
            ->orderBy('created_at', 'desc')
            ->get();
    }
}
