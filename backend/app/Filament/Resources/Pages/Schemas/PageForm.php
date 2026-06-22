<?php

namespace App\Filament\Resources\Pages\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class PageForm
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
                    ->maxLength(255)
                    ->unique(ignoreRecord: true),
                RichEditor::make('content')
                    ->columnSpanFull(),
                
                FileUpload::make('image')
                    ->label('Background Hero')
                    ->image()
                    ->directory('pages')
                    ->maxSize(2048),
                FileUpload::make('hero_logo')
                    ->label('Logo Overlay Hero')
                    ->image()
                    ->directory('pages')
                    ->maxSize(2048),
                TextInput::make('hero_title')
                    ->maxLength(255),
                Textarea::make('hero_subtitle')
                    ->columnSpanFull(),
                
                TextInput::make('stat_1_title')
                    ->label('Teks Stat 1 (Cth: Koleksi Cetak)')
                    ->maxLength(255),
                TextInput::make('stat_1_value')
                    ->label('Angka Stat 1 (Cth: 15.000+)')
                    ->maxLength(255),
                
                TextInput::make('stat_2_title')
                    ->label('Teks Stat 2 (Cth: E-Resources)')
                    ->maxLength(255),
                TextInput::make('stat_2_value')
                    ->label('Angka Stat 2 (Cth: 5.000+)')
                    ->maxLength(255),
                
                TextInput::make('stat_3_title')
                    ->label('Teks Stat 3 (Cth: Kunjungan Bulanan)')
                    ->maxLength(255),
                TextInput::make('stat_3_value')
                    ->label('Angka Stat 3 (Cth: 2.500+)')
                    ->maxLength(255),
                
                TextInput::make('stat_4_title')
                    ->label('Teks Stat 4 (Cth: Fasilitas Layanan)')
                    ->maxLength(255),
                TextInput::make('stat_4_value')
                    ->label('Angka Stat 4 (Cth: 8+)')
                    ->maxLength(255),
                
                TextInput::make('stats_link')
                    ->label('Tautan Tombol (Baca Selengkapnya)')
                    ->maxLength(255)
            ]);
    }
}