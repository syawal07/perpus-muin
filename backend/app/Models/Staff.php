<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    use HasFactory;

    // Wajib ada karena nama tabel pakai 's' (staffs)
    protected $table = 'staffs';

    protected $fillable = [
        'name', 
        'type', 
        'subject', 
        'image', 
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}