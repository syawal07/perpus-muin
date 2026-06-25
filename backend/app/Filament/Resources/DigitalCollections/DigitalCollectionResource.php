<?php

namespace App\Filament\Resources\DigitalCollections;

use App\Filament\Resources\DigitalCollections\Pages;
use App\Filament\Resources\DigitalCollections\Schemas\DigitalCollectionForm;
use App\Filament\Resources\DigitalCollections\Tables\DigitalCollectionTable;
use App\Models\DigitalCollection;
use BackedEnum;
use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class DigitalCollectionResource extends Resource
{
    protected static ?string $model = DigitalCollection::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-book-open';
    protected static string|UnitEnum|null $navigationGroup = 'Layanan Perpustakaan';
    
    protected static ?string $navigationLabel = 'Repositori Digital';
    protected static ?string $pluralModelLabel = 'Repositori Digital';

    public static function form(Schema $schema): Schema
    {
        return DigitalCollectionForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return DigitalCollectionTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListDigitalCollections::route('/'),
            'create' => Pages\CreateDigitalCollection::route('/create'),
            'edit' => Pages\EditDigitalCollection::route('/{record}/edit'),
        ];
    }
}