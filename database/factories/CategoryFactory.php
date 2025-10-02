<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->randomElement([
            'Web Development',
            'Mobile Apps',
            'E-commerce',
            'SaaS Solutions',
            'UI/UX Design',
            'Custom Development',
            'WordPress Themes',
            'Laravel Packages',
        ]);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'type' => $this->faker->randomElement(['portfolio', 'product']),
            'description' => $this->faker->sentence(12),
            'parent_id' => null,
        ];
    }
}
