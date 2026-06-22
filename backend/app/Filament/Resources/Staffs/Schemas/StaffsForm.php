<?php

namespace App\Filament\Resources\Staffs\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class StaffsForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nama Lengkap')
                    ->required()
                    ->maxLength(255),
                Select::make('type')
                    ->label('Kategori Staf')
                    ->options([
                        'Kepala Perpustakaan' => 'Kepala Perpustakaan',
                        'Pustakawan' => 'Pustakawan',
                        'Staf Layanan & IT' => 'Staf Layanan & IT',
                        'Tenaga Administrasi' => 'Tenaga Administrasi',
                    ])
                    ->required(),
                TextInput::make('subject')
                    ->label('Bidang Tugas / Jabatan')
                    ->placeholder('Contoh: Layanan Referensi / Layanan Sirkulasi')
                    ->maxLength(255),
                FileUpload::make('image')
                    ->label('Foto Profil')
                    ->image()
                    ->directory('staffs')
                    ->maxSize(2048),
                Toggle::make('is_active')
                    ->label('Status Aktif')
                    ->default(true),
            ]);
    }
}