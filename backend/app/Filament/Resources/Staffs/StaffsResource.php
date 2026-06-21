<?php

namespace App\Filament\Resources\Staffs;

use App\Filament\Resources\Staffs\Pages;
use App\Filament\Resources\Staffs\Schemas\StaffsForm;
use App\Filament\Resources\Staffs\Tables\StaffsTable;
use App\Models\Staff;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use BackedEnum;
use UnitEnum;

class StaffsResource extends Resource
{
    protected static ?string $model = Staff::class;

    protected static string | BackedEnum | null $navigationIcon = 'heroicon-o-users';

    protected static string | UnitEnum | null $navigationGroup = 'Manajemen Web';

    protected static ?string $navigationLabel = 'Guru & Tendik';

    protected static ?string $modelLabel = 'Staff';

    public static function form(Schema $schema): Schema
    {
        return StaffsForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return StaffsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListStaffs::route('/'),
            'create' => Pages\CreateStaffs::route('/create'),
            'edit' => Pages\EditStaffs::route('/{record}/edit'),
        ];
    }
}