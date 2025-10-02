<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lead>
 */
class LeadFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'company' => $this->faker->company(),
            'service_interest' => $this->faker->randomElement([
                'Custom Web Development',
                'Mobile App Development',
                'Template Customization',
                'E-commerce Development',
                'Consulting',
            ]),
            'budget_range' => $this->faker->randomElement(['$5k-$10k', '$10k-$25k', '$25k-$50k', '$50k+']),
            'message' => $this->faker->paragraph(),
            'preferred_lang' => $this->faker->randomElement(['en', 'id']),
            'status' => $this->faker->randomElement(['new', 'contacted', 'qualified', 'converted', 'closed']),
            'admin_notes' => $this->faker->optional()->sentence(),
            'ip_address' => $this->faker->ipv4(),
        ];
    }
}
