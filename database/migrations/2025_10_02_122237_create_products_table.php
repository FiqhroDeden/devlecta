<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->decimal('price', 10, 2)->nullable();
            $table->string('envato_url', 500);
            $table->decimal('rating', 3, 2)->nullable()->check('rating >= 0 AND rating <= 5');
            $table->unsignedInteger('reviews_count')->default(0);
            $table->string('demo_link', 500)->nullable();
            $table->string('docs_link', 500)->nullable();
            $table->json('features')->nullable();
            $table->json('changelog')->nullable();
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->timestamps();
            $table->softDeletes();

            $table->index(['category_id', 'status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
