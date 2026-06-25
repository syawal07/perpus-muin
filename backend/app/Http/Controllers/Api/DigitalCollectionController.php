<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DigitalCollection;
use Illuminate\Http\Request;

class DigitalCollectionController extends Controller
{
    public function index(Request $request)
    {
        $limit = $request->query('limit', 9);
        $type = $request->query('type');

        $query = DigitalCollection::query()
            ->select(['id', 'title', 'slug', 'author', 'type', 'cover_image', 'views_count', 'created_at']);

        if ($type) {
            $query->where('type', $type);
        }

        $collections = $query->orderBy('created_at', 'desc')->paginate($limit);

        return response()->json([
            'success' => true,
            'message' => 'Daftar Repositori Digital',
            'data' => $collections
        ]);
    }

    public function show($slug)
    {
        $collection = DigitalCollection::where('slug', $slug)->first();

        if (!$collection) {
            return response()->json([
                'success' => false,
                'message' => 'Koleksi digital tidak ditemukan'
            ], 404);
        }

        $collection->increment('views_count');

        return response()->json([
            'success' => true,
            'message' => 'Detail Koleksi Digital',
            'data' => $collection
        ]);
    }
}