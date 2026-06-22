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
                TextInput::make('site_name')
                    ->label('Nama Situs Perpustakaan')
                    ->maxLength(255)
                    ->default('Perpustakaan Mu\'allimin'),
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
                
                // Input Baru
                TextInput::make('opac_url')
                    ->label('URL OPAC (Katalog Pencarian)')
                    ->url()
                    ->maxLength(255),
                TextInput::make('operational_hours')
                    ->label('Jam Layanan Perpustakaan')
                    ->placeholder('Contoh: Senin - Sabtu, 07:30 - 15:00 WIB')
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

                Toggle::make('is_announcement_active')
                    ->label('Aktifkan Banner Pengumuman?'),
                TextInput::make('announcement_text')
                    ->label('Isi Teks Pengumuman')
                    ->placeholder('Contoh: Pendaftaran Anggota Perpustakaan Telah Dibuka!'),
                TextInput::make('announcement_link')
                    ->label('Link Tujuan Pengumuman (Opsional)')
                    ->url()
                    ->placeholder('https://libsys-online.xyz/muallimin'),
            ]);
    }
}