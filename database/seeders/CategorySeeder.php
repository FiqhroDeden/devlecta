<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Web Development',
                'slug' => 'web-development',
                'type' => 'portfolio',
                'description' => 'Custom web applications and websites',
            ],
            [
                'name' => 'Mobile Apps',
                'slug' => 'mobile-apps',
                'type' => 'portfolio',
                'description' => 'iOS and Android mobile applications',
            ],
            [
                'name' => 'E-commerce',
                'slug' => 'e-commerce',
                'type' => 'portfolio',
                'description' => 'Online stores and shopping platforms',
            ],
            [
                'name' => 'SaaS Solutions',
                'slug' => 'saas-solutions',
                'type' => 'portfolio',
                'description' => 'Software as a Service applications',
            ],
            [
                'name' => 'WordPress Themes',
                'slug' => 'wordpress-themes',
                'type' => 'product',
                'description' => 'Premium WordPress themes',
            ],
            [
                'name' => 'Laravel Packages',
                'slug' => 'laravel-packages',
                'type' => 'product',
                'description' => 'Laravel packages and plugins',
            ],
            [
                'name' => 'HTML Templates',
                'slug' => 'html-templates',
                'type' => 'product',
                'description' => 'Static HTML/CSS templates',
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
