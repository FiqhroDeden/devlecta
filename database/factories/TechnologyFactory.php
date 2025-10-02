<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Technology>
 */
class TechnologyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->randomElement([
            'Laravel',
            'React',
            'Vue.js',
            'MySQL',
            'Redis',
            'Tailwind CSS',
            'TypeScript',
            'Node.js',
            'PostgreSQL',
            'Docker',
            'AWS',
            'Git',
        ]);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'category' => $this->faker->randomElement(['language', 'framework', 'tool', 'platform']),
            'usage_count' => $this->faker->numberBetween(0, 50),
            'display_order' => $this->faker->numberBetween(0, 100),
        ];
    }
}
