<?php

namespace Database\Seeders;

use App\Models\Technology;
use Illuminate\Database\Seeder;

class TechnologySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $technologies = [
            ['name' => 'Laravel', 'slug' => 'laravel', 'category' => 'framework', 'display_order' => 1],
            ['name' => 'React', 'slug' => 'react', 'category' => 'framework', 'display_order' => 2],
            ['name' => 'Vue.js', 'slug' => 'vue-js', 'category' => 'framework', 'display_order' => 3],
            ['name' => 'TypeScript', 'slug' => 'typescript', 'category' => 'language', 'display_order' => 4],
            ['name' => 'PHP', 'slug' => 'php', 'category' => 'language', 'display_order' => 5],
            ['name' => 'JavaScript', 'slug' => 'javascript', 'category' => 'language', 'display_order' => 6],
            ['name' => 'MySQL', 'slug' => 'mysql', 'category' => 'platform', 'display_order' => 7],
            ['name' => 'PostgreSQL', 'slug' => 'postgresql', 'category' => 'platform', 'display_order' => 8],
            ['name' => 'Redis', 'slug' => 'redis', 'category' => 'platform', 'display_order' => 9],
            ['name' => 'Tailwind CSS', 'slug' => 'tailwind-css', 'category' => 'framework', 'display_order' => 10],
            ['name' => 'Docker', 'slug' => 'docker', 'category' => 'tool', 'display_order' => 11],
            ['name' => 'Git', 'slug' => 'git', 'category' => 'tool', 'display_order' => 12],
            ['name' => 'AWS', 'slug' => 'aws', 'category' => 'platform', 'display_order' => 13],
            ['name' => 'Node.js', 'slug' => 'node-js', 'category' => 'platform', 'display_order' => 14],
            ['name' => 'Inertia.js', 'slug' => 'inertia-js', 'category' => 'framework', 'display_order' => 15],
        ];

        foreach ($technologies as $technology) {
            Technology::create($technology);
        }
    }
}
