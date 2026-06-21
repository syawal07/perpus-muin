<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;

class SettingController extends Controller
{
    public function getHero()
    {
        $setting = Setting::first();

        // Jika data setting belum ada sama sekali di DB
        if (!$setting) {
            return response()->json([
                'success' => false,
                'message' => 'Data pengaturan tidak ditemukan',
            ], 404);
        }

        $data = [
            // Data Hero
            'hero_title' => $setting->hero_title ?? "MADRASAH MU'ALLIMIN MUHAMMADIYAH YOGYAKARTA",
            'hero_subtitle' => $setting->hero_subtitle ?? "Mu'allimin Muhammadiyah Yogyakarta menyiapkan kader ulama, pendidik, dan pemimpin bangsa...",
            'hero_button_text' => $setting->hero_button_text ?? "Visi Misi Mu'allimin",
            'hero_button_link' => $setting->hero_button_link ?? "/profil",
            'hero_bg_image' => $setting->hero_bg_image ?? "https://muallimin.sch.id/wp-content/uploads/2023/07/DJI_0435-scaled.jpg",
            'hero_overlay_logo' => $setting->hero_overlay_logo ?? "https://muallimin.sch.id/wp-content/uploads/2021/01/logo-muallimin-2021-1.png",
            
            // DATA NAVBAR & FOOTER
            'navbar_logo' => $setting->navbar_logo,
            'footer_logo' => $setting->footer_logo,
            'site_name' => $setting->site_name ?? "Madrasah Mu'allimin",
            'address' => $setting->address,
            'email' => $setting->email,
            'phone' => $setting->phone,
            'instagram' => $setting->instagram,
            'youtube' => $setting->youtube,

            // --- TAMBAHKAN TIGA BARIS INI (PENTING!) ---
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