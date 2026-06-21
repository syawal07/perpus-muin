<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    use HasFactory;

    // Wajib ada karena nama tabel pakai 's' (staffs)
    protected $table = 'staffs';

    // Cara instan (sama seperti model Setting)
    protected $guarded = [];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}