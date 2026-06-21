<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Director;

class DirectorController extends Controller
{
    public function index()
    {
        $directors = Director::orderBy('start_year', 'asc')->get();

        return response()->json([
            'success' => true,
            'message' => 'Data Direktur Berhasil Diambil',
            'data' => $directors
        ]);
    }
}