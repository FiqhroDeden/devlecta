<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Testimonial>
 */
class TestimonialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'client_name' => $this->faker->name(),
            'company' => $this->faker->company(),
            'role' => $this->faker->randomElement(['CEO', 'CTO', 'Product Manager', 'Marketing Director']),
            'text' => $this->faker->paragraph(4),
            'language' => $this->faker->randomElement(['en', 'id']),
            'rating' => $this->faker->numberBetween(4, 5),
            'avatar_path' => null,
            'featured' => $this->faker->boolean(30),
        ];
    }
}
