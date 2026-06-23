<?php

namespace App\Filament\Resources\Videos\Tables;

use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class VideosTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('thumbnail')
                    ->label('Thumbnail'),
                TextColumn::make('title')
                    ->label('Judul Video')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('created_at')
                    ->label('Diunggah Pada')
                    ->dateTime()
                    ->sortable(),
            ]);
    }
}