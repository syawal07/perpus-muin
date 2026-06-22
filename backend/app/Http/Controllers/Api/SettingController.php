<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;

class SettingController extends Controller
{
    public function getHero()
    {
        $setting = Setting::first();

        if (!$setting) {
            return response()->json([
                'success' => false,
                'message' => 'Data pengaturan tidak ditemukan',
            ], 404);
        }

        $data = [
            'hero_title' => $setting->hero_title ?? "PERPUSTAKAAN DIGITAL MU'ALLIMIN",
            'hero_subtitle' => $setting->hero_subtitle ?? "Pusat layanan literasi dan informasi digital.",
            'hero_button_text' => $setting->hero_button_text ?? "Profil Perpustakaan",
            'hero_button_link' => $setting->hero_button_link ?? "/profil",
            'hero_bg_image' => $setting->hero_bg_image ?? "https://muallimin.sch.id/wp-content/uploads/2023/07/DJI_0435-scaled.jpg",
            'hero_overlay_logo' => $setting->hero_overlay_logo ?? "https://muallimin.sch.id/wp-content/uploads/2021/01/logo-muallimin-2021-1.png",
            
            'navbar_logo' => $setting->navbar_logo,
            'footer_logo' => $setting->footer_logo,
            'site_name' => $setting->site_name ?? "Perpustakaan Mu'allimin",
            'address' => $setting->address,
            'email' => $setting->email,
            'phone' => $setting->phone,
            'instagram' => $setting->instagram,
            'youtube' => $setting->youtube,
            
            // Kolom Baru
            'opac_url' => $setting->opac_url,
            'operational_hours' => $setting->operational_hours,

            'is_announcement_active' => (bool) $setting->is_announcement_active,
            'announcement_text' => $setting->announcement_text,
            'announcement_link' => $setting->announcement_link,
        ];

        return response()->json([
            'success' => true,
            'message' => 'Data Pengaturan Lengkap',
            'data' => $data
        ]);
    }
}