<?php

namespace App\Filament\Resources\DigitalCollections\Tables;

use Filament\Tables\Table;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;

class DigitalCollectionTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('cover_image')
                    ->label('Cover'),
                TextColumn::make('title')
                    ->label('Judul')
                    ->searchable(),
                TextColumn::make('type')
                    ->label('Kategori')
                    ->badge(),
                TextColumn::make('author')
                    ->label('Penulis')
                    ->searchable(),
                TextColumn::make('views_count')
                    ->label('Dilihat')
                    ->numeric()
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('type')
                    ->label('Filter Kategori')
                    ->options([
                        'Karya Siswa' => 'Karya Siswa',
                        'Modul Guru' => 'Modul Guru',
                        'Publikasi Sekolah' => 'Publikasi Sekolah',
                        'Arsip Sejarah' => 'Arsip Sejarah',
                    ]),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}