<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->boolean('is_announcement_active')->default(false)->after('site_name');
            $table->text('announcement_text')->nullable()->after('is_announcement_active');
            $table->string('announcement_link')->nullable()->after('announcement_text');
        });
    }

    public function down(): void
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->dropColumn(['is_announcement_active', 'announcement_text', 'announcement_link']);
        });
    }
};