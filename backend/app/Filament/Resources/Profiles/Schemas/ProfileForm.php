<?php

namespace App\Filament\Resources\Profiles\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ProfileForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                TextInput::make('slug')
                    ->required()
                    ->maxLength(255),
                Select::make('category')
                    ->label('Kategori Halaman')
                    ->options([
                        'sejarah' => 'Profil & Sejarah Perpustakaan',
                        'visi-misi' => 'Visi, Misi & Tujuan',
                        'fasilitas' => 'Fasilitas & Layanan',
                        'tata-tertib' => 'Tata Tertib Perpustakaan',
                        'panduan-opac' => 'Panduan Pencarian OPAC',
                        'keanggotaan' => 'Syarat Keanggotaan',
                    ])
                    ->required(),
                RichEditor::make('content')
                    ->label('Konten Halaman')
                    ->columnSpanFull(),
                FileUpload::make('image')
                    ->label('Gambar Utama / Banner')
                    ->image()
                    ->directory('profiles/images')
                    ->required()
                    ->maxSize(2048),
                FileUpload::make('file_pdf')
                    ->label('Lampiran PDF')
                    ->acceptedFileTypes(['application/pdf'])
                    ->directory('profiles/pdf')
                    ->maxSize(5120)
                    ->helperText('Opsional. Gunakan untuk melampirkan Dokumen Panduan atau SK (Maksimal 5MB).'),
                Select::make('status')
                    ->options(['draft' => 'Draft', 'published' => 'Published'])
                    ->default('draft')
                    ->required(),
            ]);
    }
}