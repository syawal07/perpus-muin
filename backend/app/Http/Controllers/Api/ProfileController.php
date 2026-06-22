<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        $category = $request->query('category');

        $profiles = Profile::where('status', 'published')
            ->when($category, function ($query, $category) {
                return $query->where('category', $category);
            })
            ->orderBy('created_at', 'asc')
            ->get([
                'id', 
                'title', 
                'slug', 
                'category',
                'content',
                'image',
                'file_pdf',
                'updated_at'
            ]);

        return response()->json([
            'success' => true,
            'message' => 'Daftar Panduan dan Profil Perpustakaan',
            'data'    => $profiles
        ]);
    }

    public function show($slug)
    {
        $profile = Profile::where('status', 'published')
            ->where('slug', $slug)
            ->first();

        if (!$profile) {
            return response()->json([
                'success' => false,
                'message' => 'Profil / Panduan tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Detail Profil Perpustakaan',
            'data'    => $profile
        ]);
    }
}