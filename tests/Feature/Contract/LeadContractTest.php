<?php

use App\Models\Lead;
use App\Models\User;

test('GET /admin/leads returns paginated list (authenticated)', function () {
    $user = User::factory()->create(['role' => 'admin']);
    Lead::factory()->count(15)->create();

    $response = $this->actingAs($user)->getJson('/api/admin/leads');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    'email',
                    'service_interest',
                    'status',
                    'created_at',
                ],
            ],
            'meta',
            'links',
        ]);
});

test('GET /admin/leads?status=new filters by status', function () {
    $user = User::factory()->create(['role' => 'admin']);
    Lead::factory()->count(5)->create(['status' => 'new']);
    Lead::factory()->count(3)->create(['status' => 'contacted']);

    $response = $this->actingAs($user)->getJson('/api/admin/leads?status=new');

    $response->assertStatus(200);
    expect($response->json('data'))->toHaveCount(5);
});

test('PATCH /admin/leads/{id} updates status and admin notes', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $lead = Lead::factory()->create(['status' => 'new']);

    $response = $this->actingAs($user)->patchJson("/api/admin/leads/{$lead->id}", [
        'status' => 'contacted',
        'admin_notes' => 'Sent initial proposal',
    ]);

    $response->assertStatus(200);

    $this->assertDatabaseHas('leads', [
        'id' => $lead->id,
        'status' => 'contacted',
        'admin_notes' => 'Sent initial proposal',
    ]);
});

test('GET /admin/leads/export downloads CSV file', function () {
    $user = User::factory()->create(['role' => 'admin']);
    Lead::factory()->count(5)->create();

    $response = $this->actingAs($user)->get('/api/admin/leads/export');

    $response->assertStatus(200)
        ->assertHeader('Content-Type', 'text/csv; charset=UTF-8')
        ->assertHeader('Content-Disposition');
});
