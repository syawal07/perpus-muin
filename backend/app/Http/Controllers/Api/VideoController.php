<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\Request;

class VideoController extends Controller
{
    public function index(Request $request)
    {
        $limit = $request->query('limit', 6);
        $videos = Video::orderBy('created_at', 'desc')->paginate($limit);

        return response()->json([
            'success' => true,
            'message' => 'Daftar Video Publikasi Perpustakaan',
            'data' => $videos
        ]);
    }

    public function show($slug)
    {
        $video = Video::where('slug', $slug)->first();

        if (!$video) {
            return response()->json([
                'success' => false,
                'message' => 'Video tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Detail Video Publikasi',
            'data' => $video
        ]);
    }
}