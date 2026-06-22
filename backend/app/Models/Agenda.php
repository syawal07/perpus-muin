<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agenda extends Model
{
    protected $fillable = [
        'title', 
        'slug', 
        'description', 
        'image', 
        'start_date', 
        'end_date', 
        'location'
    ];
}