<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Menambah URL OPAC dan Jam Layanan di tabel settings
        Schema::table('settings', function (Blueprint $table) {
            $table->string('opac_url')->nullable()->after('youtube');
            $table->string('operational_hours')->nullable()->after('opac_url');
        });

        // Menambah Penulis (Pustakawan/Reviewer) di tabel posts untuk resensi buku
        Schema::table('posts', function (Blueprint $table) {
            $table->string('author_name')->nullable()->after('status');
        });
    }

    public function down(): void
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->dropColumn(['opac_url', 'operational_hours']);
        });

        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn('author_name');
        });
    }
};