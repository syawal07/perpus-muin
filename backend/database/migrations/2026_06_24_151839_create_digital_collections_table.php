<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('digital_collections', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('author');
            $table->enum('type', ['Karya Siswa', 'Modul Guru', 'Publikasi Sekolah', 'Arsip Sejarah']);
            $table->text('description')->nullable();
            $table->string('cover_image')->nullable();
            $table->string('file_path');
            $table->unsignedBigInteger('views_count')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('digital_collections');
    }
};