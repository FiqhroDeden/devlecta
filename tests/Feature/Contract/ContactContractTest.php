<?php

test('POST /contact creates lead with valid data', function () {
    $response = $this->postJson('/api/contact', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'phone' => '+1-555-123-4567',
        'company' => 'Test Company',
        'service_interest' => 'Custom Web Development',
        'budget_range' => '$10k-$25k',
        'message' => 'I need a custom e-commerce platform with payment integration.',
        'preferred_lang' => 'en',
        'recaptcha_token' => 'test-token',
    ]);

    $response->assertStatus(201)
        ->assertJson([
            'message' => 'Thank you for your inquiry. We will contact you soon.',
        ]);

    $this->assertDatabaseHas('leads', [
        'email' => 'john@example.com',
        'status' => 'new',
    ]);
});

test('POST /contact returns 422 for missing required fields (name, email, message)', function () {
    $response = $this->postJson('/api/contact', [
        'email' => 'invalid-email',
        // Missing name, message
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['name', 'email', 'message']);
});

test('POST /contact returns 422 for invalid email format', function () {
    $response = $this->postJson('/api/contact', [
        'name' => 'John Doe',
        'email' => 'not-an-email',
        'message' => 'This is a test message.',
        'service_interest' => 'Consulting',
        'recaptcha_token' => 'test-token',
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['email']);
});

test('POST /contact returns 429 after 6 submissions (rate limit)', function () {
    $data = [
        'name' => 'John Doe',
        'email' => 'test@example.com',
        'message' => 'Test message with sufficient length for validation.',
        'service_interest' => 'Consulting',
        'recaptcha_token' => 'test-token',
    ];

    // Submit 5 times successfully
    for ($i = 0; $i < 5; $i++) {
        $this->postJson('/api/contact', $data)->assertStatus(201);
    }

    // 6th submission should be rate limited
    $response = $this->postJson('/api/contact', $data);
    $response->assertStatus(429);
});
