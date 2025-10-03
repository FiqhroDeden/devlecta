<?php

use App\Models\Lead;
use App\Services\LeadService;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->service = new LeadService;
});

it('creates a lead with valid data', function () {
    $data = [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'phone' => '+1-555-1234',
        'company' => 'Acme Corp',
        'service_interest' => 'Custom Development',
        'budget_range' => '$10k-$25k',
        'message' => 'I need a custom e-commerce platform.',
        'preferred_lang' => 'en',
        'ip_address' => '127.0.0.1',
    ];

    $lead = $this->service->createLead($data);

    expect($lead)->toBeInstanceOf(Lead::class);
    expect($lead->name)->toBe('John Doe');
    expect($lead->status)->toBe('new');
});

it('updates lead status', function () {
    $lead = Lead::factory()->create(['status' => 'new']);

    $updated = $this->service->updateLeadStatus($lead->id, 'contacted', 'Sent initial proposal');

    expect($updated->status)->toBe('contacted');
    expect($updated->admin_notes)->toBe('Sent initial proposal');
});

it('exports leads to CSV', function () {
    Lead::factory()->count(5)->create(['status' => 'new']);
    Lead::factory()->count(3)->create(['status' => 'contacted']);

    $csv = $this->service->exportToCsv(['status' => 'new']);

    expect($csv)->toBeString();
    expect($csv)->toContain('John Doe'); // Assuming factory creates this name
    expect(substr_count($csv, "\n"))->toBe(6); // Header + 5 rows
});

it('exports all leads when no filters provided', function () {
    Lead::factory()->count(8)->create();

    $csv = $this->service->exportToCsv([]);

    expect(substr_count($csv, "\n"))->toBe(9); // Header + 8 rows
});

it('returns correct CSV format', function () {
    Lead::factory()->create([
        'name' => 'Test User',
        'email' => 'test@example.com',
        'status' => 'new',
    ]);

    $csv = $this->service->exportToCsv([]);

    $lines = explode("\n", trim($csv));
    $header = str_getcsv($lines[0]);

    expect($header)->toContain('Name');
    expect($header)->toContain('Email');
    expect($header)->toContain('Status');
    expect($header)->toContain('Created At');
});
