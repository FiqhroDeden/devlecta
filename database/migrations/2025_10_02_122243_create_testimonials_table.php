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
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('client_name');
            $table->string('company')->nullable();
            $table->string('role', 100)->nullable();
            $table->text('text');
            $table->enum('language', ['en', 'id'])->default('en');
            $table->unsignedTinyInteger('rating')->nullable()->check('rating >= 1 AND rating <= 5');
            $table->string('avatar_path', 500)->nullable();
            $table->boolean('featured')->default(false);
            $table->timestamps();

            $table->index(['featured', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
