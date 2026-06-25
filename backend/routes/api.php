<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Import semua Controller yang sudah kita buat
use App\Http\Controllers\Api\AgendaController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\StaffController;
use App\Http\Controllers\Api\VideoController;
use App\Http\Controllers\Api\DigitalCollectionController; // <-- Tambahkan import ini

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// ------------------------------------------------------------------------
// ROUTE API WEB MUALLIMIN (PUBLIC)
// ------------------------------------------------------------------------

// Endpoint Agenda
Route::get('/agendas', [AgendaController::class, 'index']);
Route::get('/agendas/{slug}', [AgendaController::class, 'show']);

// Endpoint Berita
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{slug}', [PostController::class, 'show']);
Route::post('/posts/{slug}/like', [PostController::class, 'like']);

// Endpoint Video (Lebih rapi)
Route::get('/videos', [VideoController::class, 'index']);
Route::get('/videos/{slug}', [VideoController::class, 'show']);

// Endpoint Halaman Statis (Page)
Route::get('/pages', [PageController::class, 'index']);
Route::get('/pages/{slug}', [PageController::class, 'show']);

// Endpoint Pengaturan (Settings)
Route::get('/settings', [SettingController::class, 'getHero']);
Route::get('/settings/hero', [SettingController::class, 'getHero']);

// Endpoint Profil
Route::get('/profiles', [ProfileController::class, 'index']);
Route::get('/profiles/{slug}', [ProfileController::class, 'show']);

// Endpoint Staff
Route::get('/staffs', [StaffController::class, 'index']);

// Endpoint Repositori Digital (Digital Collection)
Route::get('/digital-collections', [DigitalCollectionController::class, 'index']);
Route::get('/digital-collections/{slug}', [DigitalCollectionController::class, 'show']);