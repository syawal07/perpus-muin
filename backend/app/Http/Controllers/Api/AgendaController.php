<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Agenda;

class AgendaController extends Controller
{
    public function index()
    {
        $agendas = Agenda::orderBy('start_date', 'asc')
            ->take(10)
            ->get([
                'id', 
                'title', 
                'slug', 
                'description', 
                'start_date',
                'end_date',
                'location'
            ]);

        return response()->json([
            'success' => true,
            'message' => 'Daftar Agenda Kegiatan',
            'data'    => $agendas
        ]);
    }

    public function show($slug)
    {
        $agenda = Agenda::where('slug', $slug)->first();

        if (!$agenda) {
            return response()->json([
                'success' => false,
                'message' => 'Agenda tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Detail Agenda',
            'data'    => $agenda
        ]);
    }
}