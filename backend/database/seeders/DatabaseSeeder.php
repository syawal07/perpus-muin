<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('settings')->insert([
            'site_name' => 'Perpustakaan Digital Mu\'allimin',
            'address' => 'Jl. Letjen S. Parman No. 68, Wirobrajan, Yogyakarta',
            'phone' => '(0274) 373322',
            'email' => 'perpustakaan@muallimin.sch.id',
            'instagram' => 'https://instagram.com/mualliminjogja',
            'youtube' => 'https://youtube.com/c/MualliminJogja',
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        DB::table('pages')->insert([
            [
                'title' => 'Beranda',
                'slug' => 'beranda',
                'content' => null,
                'image' => null,
                'hero_logo' => null,
                'hero_title' => 'PERPUSTAKAAN DIGITAL MU\'ALLIMIN',
                'hero_subtitle' => 'Pusat layanan literasi, inovasi, dan ekosistem pengetahuan digital adaptif bagi pemustaka.',
                'stat_1_title' => 'Koleksi Cetak',
                'stat_1_value' => '15.000+',
                'stat_2_title' => 'E-Resources',
                'stat_2_value' => '5.000+',
                'stat_3_title' => 'Kunjungan Bulanan',
                'stat_3_value' => '2.500+',
                'stat_4_title' => 'Fasilitas Layanan',
                'stat_4_value' => '8+',
                'stats_link' => '/profil',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Profil Perpustakaan',
                'slug' => 'profil-perpustakaan',
                'content' => '<p>Perpustakaan Madrasah Mu\'allimin Muhammadiyah bertransformasi menjadi pusat sumber belajar berbasis digital yang inklusif. Kami berkomitmen untuk mendukung terciptanya kesadaran dan budaya informasi yang baik di era kecerdasan buatan bagi seluruh santri dan civitas akademika.</p>',
                'image' => null,
                'hero_logo' => null,
                'hero_title' => 'Profil Perpustakaan',
                'hero_subtitle' => 'Jendela dunia dan pusat literasi santri.',
                'stat_1_title' => null,
                'stat_1_value' => null,
                'stat_2_title' => null,
                'stat_2_value' => null,
                'stat_3_title' => null,
                'stat_3_value' => null,
                'stat_4_title' => null,
                'stat_4_value' => null,
                'stats_link' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ]
        ]);

        DB::table('agendas')->insert([
            [
                'title' => 'Bedah Buku dan Pelatihan Literasi Informasi Digital',
                'slug' => 'bedah-buku-pelatihan-literasi-digital',
                'description' => '<p>Kegiatan diskusi buku terbaru koleksi perpustakaan sekaligus pelatihan pemanfaatan e-resources bagi santri baru untuk menguatkan budaya interaksi informasi.</p>',
                'start_date' => Carbon::now()->addDays(5)->format('Y-m-d'),
                'end_date' => Carbon::now()->addDays(5)->format('Y-m-d'),
                'location' => 'Ruang Audio Visual Perpustakaan',
                'image' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);

        DB::table('posts')->insert([
            [
                'title' => 'Optimalisasi OPAC: Cara Mudah Mencari Buku di Perpustakaan',
                'slug' => 'optimalisasi-opac-cara-mudah-mencari-buku',
                'category' => 'informasi',
                'status' => 'published',
                'content' => '<p>Kini mencari buku, jurnal, dan referensi lainnya semakin mudah dengan sistem OPAC (Online Public Access Catalog). Pemustaka dapat mengakses katalog kami dari asrama melalui perangkat masing-masing.</p>',
                'image' => null,
                'published_at' => Carbon::now()->subDays(1),
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Membangun Kesadaran Literasi di Era Kecerdasan Buatan',
                'slug' => 'membangun-kesadaran-literasi-era-ai',
                'category' => 'literasi',
                'status' => 'published',
                'content' => '<p>Perkembangan AI menuntut kita untuk memiliki kemampuan evaluasi informasi yang tajam. Perpustakaan hadir sebagai pilar utama untuk melatih kemampuan berpikir kritis pemustaka.</p>',
                'image' => null,
                'published_at' => Carbon::now()->subDays(2),
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Resensi: Menyelami Makna Kehidupan dalam Buku Buya Hamka',
                'slug' => 'resensi-buku-buya-hamka',
                'category' => 'resensi',
                'status' => 'published',
                'content' => '<p>Salah satu koleksi terpopuler bulan ini adalah karya-karya sastra dan pemikiran Buya Hamka. Mari simak resensi singkat dari Pustakawan kami mengenai nilai-nilai yang bisa dipetik dari buku tersebut.</p>',
                'image' => null,
                'published_at' => Carbon::now()->subDays(3),
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Jam Layanan Perpustakaan Selama Masa Ujian',
                'slug' => 'jam-layanan-perpustakaan-masa-ujian',
                'category' => 'pengumuman',
                'status' => 'published',
                'content' => '<p>Untuk mendukung fokus belajar santri selama masa ujian, Perpustakaan Mu\'allimin memperpanjang jam buka layanan ruang baca dan diskusi kelompok.</p>',
                'image' => null,
                'published_at' => Carbon::now()->subDays(4),
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}