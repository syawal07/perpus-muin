<?php

namespace App\Filament\Resources\Faqs\Tables;

use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;

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
            ->defaultSort('sort_order', 'asc') // Default urutan berdasarkan sort_order terkecil
            ->filters([
                // Filter belum diperlukan sesuai instruksi audit, menjaga fitur tetap ringan
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}