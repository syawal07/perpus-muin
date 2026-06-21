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
            'site_name' => 'Madrasah Mu\'allimin Muhammadiyah',
            'address' => 'Jl. Letjen S. Parman No. 68, Wirobrajan, Yogyakarta',
            'phone' => '(0274) 373322',
            'email' => 'info@muallimin.sch.id',
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
                'hero_title' => 'MADRASAH MU\'ALLIMIN MUHAMMADIYAH YOGYAKARTA',
                'hero_subtitle' => 'Menyiapkan kader ulama, pendidik, dan pemimpin bangsa yang berkemajuan.',
                'stat_1_title' => 'Mendidik Sejak',
                'stat_1_value' => '1918',
                'stat_2_title' => 'Tahun Berdiri',
                'stat_2_value' => '1918',
                'stat_3_title' => 'Jumlah Pelajar',
                'stat_3_value' => '1500+',
                'stat_4_title' => 'Komunitas Siswa',
                'stat_4_value' => '1500+',
                'stats_link' => '/profil',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Sejarah & Dedikasi',
                'slug' => 'sejarah',
                'content' => '<p>Madrasah Mu\'allimin Muhammadiyah Yogyakarta didirikan langsung oleh KH. Ahmad Dahlan pada tahun 1918. Awalnya bernama Qismul Arqa, sekolah ini dibangun dengan visi besar untuk menyiapkan kader-kader persyarikatan yang mumpuni dalam ilmu agama sekaligus ilmu umum.</p>',
                'image' => null,
                'hero_logo' => null,
                'hero_title' => 'Sejarah Mu\'allimin',
                'hero_subtitle' => 'Lebih dari satu abad mengabdi untuk negeri.',
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

        DB::table('directors')->insert([
            [
                'name' => 'KH. Ahmad Dahlan',
                'start_year' => 1918,
                'end_year' => 1923,
                'position' => 'Pendiri & Direktur Pertama',
                'image' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'H. Aly Amin',
                'start_year' => 1928,
                'end_year' => 1932,
                'position' => 'Direktur',
                'image' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);

        DB::table('agendas')->insert([
            [
                'title' => 'Penilaian Akhir Tahun (PAT)',
                'slug' => 'penilaian-akhir-tahun-pat',
                'description' => '<p>Pelaksanaan Ujian Akhir untuk penentuan kenaikan kelas seluruh santri.</p>',
                'start_date' => Carbon::now()->addDays(5)->format('Y-m-d'),
                'end_date' => Carbon::now()->addDays(12)->format('Y-m-d'),
                'location' => 'Kampus Induk & Terpadu',
                'image' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);

        DB::table('posts')->insert([
            [
                'title' => 'Santri Mu\'allimin Borong Juara Lomba Robotik Nasional',
                'slug' => 'santri-muallimin-borong-juara-lomba-robotik-nasional',
                'category' => 'prestasi',
                'status' => 'published',
                'content' => '<p>Alhamdulillah, tim robotik Madrasah Mu\'allimin kembali mengharumkan nama sekolah di kancah nasional dengan menyabet juara 1 dan 2 pada ajang kompetisi bergengsi tahun ini.</p>',
                'image' => null,
                'published_at' => Carbon::now()->subDays(1),
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Kajian Rutin Ahad Pagi Bersama Pimpinan Pusat Muhammadiyah',
                'slug' => 'kajian-rutin-ahad-pagi-bersama-pp-muhammadiyah',
                'category' => 'kegiatan',
                'status' => 'published',
                'content' => '<p>Seluruh civitas akademika Madrasah Mu\'allimin mengikuti kegiatan kajian rutin yang diisi langsung oleh jajaran Pimpinan Pusat Muhammadiyah guna memperkuat ideologi persyarikatan.</p>',
                'image' => null,
                'published_at' => Carbon::now()->subDays(2),
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Antologi Puisi "Gema Wirobrajan" Karya Santri Kelas 4',
                'slug' => 'antologi-puisi-gema-wirobrajan-karya-santri-kelas-4',
                'category' => 'karya',
                'status' => 'published',
                'content' => '<p>Buku antologi puisi ini merupakan kumpulan karya sastra terbaik dari para santri kelas 4 yang menumpahkan rasa cinta mereka terhadap madrasah.</p>',
                'image' => null,
                'published_at' => Carbon::now()->subDays(3),
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Lowongan Guru Bahasa Arab & Tahfidz Tahun Ajaran 2026/2027',
                'slug' => 'lowongan-guru-bahasa-arab-dan-tahfidz-2026',
                'category' => 'karier',
                'status' => 'published',
                'content' => '<p>Madrasah Mu\'allimin Muhammadiyah Yogyakarta membuka kesempatan bagi para lulusan terbaik untuk bergabung menjadi tenaga pendidik pada posisi Guru Bahasa Arab dan Tahfidz.</p>',
                'image' => null,
                'published_at' => Carbon::now()->subDays(4),
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}