<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\JsonResponse;

class FaqController extends Controller
{
    /**
     * Mengambil daftar FAQ yang aktif untuk ditampilkan di Frontend
     */
    public function index(): JsonResponse
    {
        $faqs = Faq::select(['id', 'question', 'answer'])
            ->where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar FAQ berhasil diambil',
            'data' => $faqs
        ]);
    }
}