<?php

namespace App\Filament\Resources\Faqs\Tables;

use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
// Menggunakan namespace Actions global (Filament v4/v5)
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;

class FaqsTable
{
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('sort_order')
                    ->label('Urutan')
                    ->sortable()
                    ->badge()
                    ->color('gray'),
                    
                TextColumn::make('question')
                    ->label('Pertanyaan')
                    ->searchable()
                    ->limit(50),
                    
                ToggleColumn::make('is_active')
                    ->label('Aktif')
                    ->sortable(),
            ])
            ->defaultSort('sort_order', 'asc')
            ->filters([
                // Filter belum diperlukan
            ])
            // Pada Filament terbaru menggunakan recordActions, bukan actions
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            // Pada Filament terbaru menggunakan groupedBulkActions
            ->groupedBulkActions([
                DeleteBulkAction::make(),
            ]);
    }
}