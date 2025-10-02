<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Portfolio>
 */
class PortfolioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(3);
        $type = $this->faker->randomElement(['custom_project', 'envato_product']);

        return [
            'title' => rtrim($title, '.'),
            'slug' => Str::slug($title),
            'description' => $this->faker->paragraphs(3, true),
            'category_id' => Category::factory(),
            'type' => $type,
            'industry' => $this->faker->randomElement(['E-commerce', 'Healthcare', 'Finance', 'Education', 'Real Estate']),
            'challenge' => $this->faker->paragraph(),
            'solution' => $this->faker->paragraph(),
            'results' => [
                'metric_1' => '50% faster load time',
                'metric_2' => '30% increase in conversions',
            ],
            'duration' => $this->faker->randomElement(['2 weeks', '1 month', '3 months', '6 months']),
            'client_name' => $type === 'custom_project' ? $this->faker->company() : null,
            'featured' => $this->faker->boolean(20),
            'status' => $this->faker->randomElement(['draft', 'published', 'archived']),
        ];
    }
}
