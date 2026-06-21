<?php

namespace App\Filament\Resources\Directors;

use App\Filament\Resources\Directors\Pages\CreateDirector;
use App\Filament\Resources\Directors\Pages\EditDirector;
use App\Filament\Resources\Directors\Pages\ListDirectors;
use App\Filament\Resources\Directors\Schemas\DirectorForm;
use App\Filament\Resources\Directors\Tables\DirectorsTable;
use App\Models\Director;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class DirectorResource extends Resource
{
    protected static ?string $model = Director::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return DirectorForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return DirectorsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListDirectors::route('/'),
            'create' => CreateDirector::route('/create'),
            'edit' => EditDirector::route('/{record}/edit'),
        ];
    }
}
