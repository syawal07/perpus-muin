<?php

namespace App\Filament\Resources\Staffs\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class StaffsForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                Select::make('type')
                    ->options([
                        'Guru' => 'Guru',
                        'Tenaga Kependidikan' => 'Tenaga Kependidikan',
                    ])
                    ->required(),
                TextInput::make('subject')
                    ->label('Mata Pelajaran')
                    ->maxLength(255),
                FileUpload::make('image')
                    ->image()
                    ->directory('staffs')
                    ->maxSize(2048),
                Toggle::make('is_active')
                    ->label('Status Aktif')
                    ->default(true),
            ]);
    }
}