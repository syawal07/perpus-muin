<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $fillable = [
        'title', 
        'slug', 
        'content', 
        'image', 
        'hero_logo', 
        'hero_title', 
        'hero_subtitle', 
        'stat_1_title', 'stat_1_value', 
        'stat_2_title', 'stat_2_value', 
        'stat_3_title', 'stat_3_value', 
        'stat_4_title', 'stat_4_value', 
        'stats_link'
    ];
}