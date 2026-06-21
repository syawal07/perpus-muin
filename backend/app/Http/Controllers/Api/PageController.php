<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Page;

class PageController extends Controller
{
    // Mengambil daftar semua halaman (biasanya untuk menu navigasi di Next.js)
    public function index()
    {
        $pages = Page::orderBy('title', 'asc')
            ->get([
                'id', 
                'title', 
                'slug'
            ]);

        return response()->json([
            'success' => true,
            'message' => 'Daftar Semua Halaman',
            'data'    => $pages
        ]);
    }

    // Mengambil detail satu halaman spesifik berdasarkan slug (misal: /api/pages/profil)
    public function show($slug)
    {
        $page = Page::where('slug', $slug)->first();

        if (!$page) {
            return response()->json([
                'success' => false,
                'message' => 'Halaman tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Data Halaman',
            'data'    => $page
        ]);
    }
}