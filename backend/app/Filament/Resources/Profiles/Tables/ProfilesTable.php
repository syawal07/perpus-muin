<?php

namespace App\Filament\Resources\Profiles\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class ProfilesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->searchable(),
                TextColumn::make('category')
                    ->badge()
                    ->searchable(),
                ImageColumn::make('image'),
                TextColumn::make('file_pdf')
                    ->label('PDF')
                    ->formatStateUsing(fn (string $state): string => $state ? 'Ada PDF' : '-')
                    ->badge()
                    ->color(fn (string $state): string => $state ? 'success' : 'gray'),
                TextColumn::make('status')
                    ->badge(),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('category')
                    ->options([
                        'sejarah' => 'Sejarah (Muqadimah)',
                        'visi-misi' => 'Visi, Misi & Tujuan',
                        'logo' => 'Makna Logo',
                        'fasilitas' => 'Fasilitas',
                        'kurikulum' => 'Kurikulum',
                        'biaya' => 'Biaya Pendidikan',
                        'brosur' => 'Brosur',
                    ]),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}