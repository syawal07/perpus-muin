<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DigitalCollection extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'author',
        'type',
        'description',
        'cover_image',
        'file_path',
        'views_count',
    ];
}