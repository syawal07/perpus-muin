<?php

namespace App\Filament\Resources\DigitalCollections\Schemas;

use App\Models\DigitalCollection;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class DigitalCollectionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->schema([
                TextInput::make('title')
                    ->label('Judul Karya / Dokumen')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (string $operation, $state, callable $set) => $operation === 'create' ? $set('slug', Str::slug($state)) : null),

                TextInput::make('slug')
                    ->disabled()
                    ->dehydrated()
                    ->required()
                    ->unique(DigitalCollection::class, 'slug', ignoreRecord: true),

                TextInput::make('author')
                    ->label('Penulis / Pembuat')
                    ->required(),

                Select::make('type')
                    ->label('Jenis Koleksi')
                    ->options([
                        'Karya Siswa' => 'Karya Siswa',
                        'Modul Guru' => 'Modul Guru',
                        'Publikasi Sekolah' => 'Publikasi Sekolah',
                        'Arsip Sejarah' => 'Arsip Sejarah',
                    ])
                    ->required(),

                Textarea::make('description')
                    ->label('Deskripsi Singkat')
                    ->columnSpanFull(),

                FileUpload::make('cover_image')
                    ->label('Cover Dokumen (Gambar)')
                    ->image()
                    ->directory('collections/covers')
                    ->maxSize(2048),

                FileUpload::make('file_path')
                    ->label('File Dokumen (Wajib PDF)')
                    ->acceptedFileTypes(['application/pdf'])
                    ->directory('collections/files')
                    ->required()
                    ->maxSize(20480),
            ]);
    }
}