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
        Schema::table('portfolios', function (Blueprint $table) {
            $table->index(['status', 'featured', 'created_at'], 'idx_portfolio_listing');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->index(['status', 'created_at'], 'idx_product_listing');
        });

        Schema::table('leads', function (Blueprint $table) {
            $table->index(['status', 'created_at'], 'idx_lead_management');
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->index(['type', 'parent_id'], 'idx_category_hierarchy');
        });

        Schema::table('portfolio_technology', function (Blueprint $table) {
            $table->index('technology_id', 'idx_tech_reverse_lookup');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('portfolios', function (Blueprint $table) {
            $table->dropIndex('idx_portfolio_listing');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex('idx_product_listing');
        });

        Schema::table('leads', function (Blueprint $table) {
            $table->dropIndex('idx_lead_management');
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->dropIndex('idx_category_hierarchy');
        });

        Schema::table('portfolio_technology', function (Blueprint $table) {
            $table->dropIndex('idx_tech_reverse_lookup');
        });
    }
};
