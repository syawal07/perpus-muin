<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('videos', function (Blueprint $blueprint) {
            $blueprint->id();
            $blueprint->string('title');
            $blueprint->string('slug')->unique();
            $blueprint->text('description')->nullable();
            $blueprint->string('thumbnail');
            $blueprint->string('video_path');
            $blueprint->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('videos');
    }
};