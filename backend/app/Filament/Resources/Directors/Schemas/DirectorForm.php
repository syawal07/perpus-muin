<?php

namespace App\Filament\Resources\Directors\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class DirectorForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                FileUpload::make('image')
                    ->image()
                    ->directory('directors')
                    ->maxSize(2048),
                TextInput::make('start_year')
                    ->required()
                    ->numeric(),
                TextInput::make('end_year')
                    ->numeric()
                    ->default(null),
                TextInput::make('position')
                    ->required()
                    ->maxLength(255)
                    ->default('Direktur'),
            ]);
    }
}