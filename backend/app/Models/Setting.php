<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'site_name', 'address', 'phone', 'email', 'instagram', 'youtube', 
        'opac_url', 'operational_hours', 
        'is_announcement_active', 'announcement_text', 'announcement_link'
    ];
}