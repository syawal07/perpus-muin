<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 
        'slug', 
        'category', 
        'content', 
        'image', 
        'file_pdf', 
        'status'
    ];
}