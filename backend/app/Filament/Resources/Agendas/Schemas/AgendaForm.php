<?php

namespace App\Filament\Resources\Agendas\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class AgendaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Nama Kegiatan / Agenda')
                    ->placeholder('Contoh: Bedah Buku & Pelatihan Literasi')
                    ->required()
                    ->maxLength(255),
                TextInput::make('slug')
                    ->required()
                    ->maxLength(255),
                Textarea::make('description')
                    ->label('Deskripsi Kegiatan')
                    ->columnSpanFull(),
                FileUpload::make('image')
                    ->label('Poster / Gambar Sampul')
                    ->image()
                    ->directory('agendas')
                    ->maxSize(2048),
                DateTimePicker::make('start_date')
                    ->label('Waktu Mulai')
                    ->required(),
                DateTimePicker::make('end_date')
                    ->label('Waktu Selesai')
                    ->required(),
                TextInput::make('location')
                    ->label('Lokasi')
                    ->placeholder('Contoh: Ruang Audio Visual Perpustakaan')
                    ->maxLength(255),
            ]);
    }
}