<?php

namespace App\Filament\Resources\Settings\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class SettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                // --- INFORMASI UMUM ---
                TextInput::make('site_name')
                    ->label('Nama Situs')
                    ->maxLength(255)
                    ->default('Madrasah Mu\'allimin Muhammadiyah'),
                TextInput::make('address')
                    ->label('Alamat Lengkap')
                    ->maxLength(255),
                TextInput::make('phone')
                    ->label('Nomor Telepon')
                    ->maxLength(255),
                TextInput::make('email')
                    ->label('Email Resmi')
                    ->email()
                    ->maxLength(255),
                FileUpload::make('navbar_logo')
                    ->label('Logo Utama (Navbar)')
                    ->image()
                    ->directory('settings')
                    ->maxSize(2048),
                FileUpload::make('footer_logo')
                    ->label('Logo Footer')
                    ->image()
                    ->directory('settings')
                    ->maxSize(2048),
                TextInput::make('instagram')
                    ->label('Link Instagram')
                    ->url()
                    ->maxLength(255),
                TextInput::make('youtube')
                    ->label('Link YouTube')
                    ->url()
                    ->maxLength(255),

                // --- PENGUMUMAN RUNNING TEXT ---
                Toggle::make('is_announcement_active')
                    ->label('Aktifkan Banner Pengumuman? (Running Text di bagian paling atas web)'),
                TextInput::make('announcement_text')
                    ->label('Isi Teks Pengumuman')
                    ->placeholder('Contoh: Pendaftaran SPMB Gelombang 2 Telah Dibuka!'),
                TextInput::make('announcement_link')
                    ->label('Link Tujuan Pengumuman (Opsional)')
                    ->url()
                    ->placeholder('https://spmb.muallimin.sch.id/'),
            ]);
    }
}