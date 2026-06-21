<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $category = $request->query('category');
        $limit = $request->query('limit', 9);

        $news = Post::where('status', 'published')
            ->when($category, function ($query, $category) {
                return $query->where('category', $category);
            })
            ->orderBy('published_at', 'desc')
            ->paginate($limit, [
                'id', 
                'title', 
                'category',
                'slug', 
                'content',
                'image',
                'published_at',
                'views',
                'likes'
            ]);

        return response()->json([
            'success' => true,
            'message' => 'Daftar Berita Terbaru Muallimin',
            'data'    => $news
        ]);
    }

    public function show($slug)
    {
        $news = Post::where('status', 'published')
            ->where('slug', $slug)
            ->first();

        if (!$news) {
            return response()->json([
                'success' => false,
                'message' => 'Berita tidak ditemukan'
            ], 404);
        }

        $news->increment('views');

        return response()->json([
            'success' => true,
            'message' => 'Detail Berita',
            'data'    => $news
        ]);
    }

    public function like($slug)
    {
        $news = Post::where('status', 'published')
            ->where('slug', $slug)
            ->first();

        if (!$news) {
            return response()->json([
                'success' => false,
                'message' => 'Berita tidak ditemukan'
            ], 404);
        }

        $news->increment('likes');

        return response()->json([
            'success' => true,
            'message' => 'Berita disukai',
            'data'    => [
                'likes' => $news->likes
            ]
        ]);
    }
}