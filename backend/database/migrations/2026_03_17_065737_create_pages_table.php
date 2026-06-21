<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('content')->nullable();
            
            // Bagian Hero / Jumbotron
            $table->string('image')->nullable(); // Untuk Background Hero
            $table->string('hero_logo')->nullable(); // KHUSUS UNTUK LOGO HERO
            $table->string('hero_title')->nullable();
            $table->text('hero_subtitle')->nullable();
            $table->string('stat_1_title')->nullable();
            $table->string('stat_1_value')->nullable();
            
            $table->string('stat_2_title')->nullable();
            $table->string('stat_2_value')->nullable();
            
            $table->string('stat_3_title')->nullable();
            $table->string('stat_3_value')->nullable();
            
            $table->string('stat_4_title')->nullable();
            $table->string('stat_4_value')->nullable();
            
            $table->string('stats_link')->nullable(); // Tautan untuk tombol
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pages');
    }
};