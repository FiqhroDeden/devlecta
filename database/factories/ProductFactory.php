<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->words(3, true);

        return [
            'name' => ucwords($name),
            'slug' => Str::slug($name),
            'description' => $this->faker->paragraphs(2, true),
            'category_id' => Category::factory(),
            'price' => $this->faker->randomFloat(2, 19, 99),
            'envato_url' => 'https://themeforest.net/item/' . Str::slug($name) . '/' . $this->faker->numberBetween(10000, 99999),
            'rating' => $this->faker->randomFloat(2, 3.5, 5.0),
            'reviews_count' => $this->faker->numberBetween(10, 500),
            'demo_link' => 'https://demo.' . Str::slug($name) . '.com',
            'docs_link' => 'https://docs.' . Str::slug($name) . '.com',
            'features' => [
                'Responsive Design',
                'SEO Optimized',
                'Cross-browser Compatible',
                'Fast Loading',
            ],
            'changelog' => [
                ['version' => '1.2', 'changes' => 'Bug fixes and improvements'],
                ['version' => '1.1', 'changes' => 'Added new features'],
            ],
            'status' => $this->faker->randomElement(['draft', 'published', 'archived']),
        ];
    }
}
