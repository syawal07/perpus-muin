<?php

namespace App\Filament\Resources\Profiles\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ProfileForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                TextInput::make('slug')
                    ->required()
                    ->maxLength(255),
                Select::make('category')
                    ->options([
                        'sejarah' => 'Sejarah (Muqadimah)',
                        'visi-misi' => 'Visi, Misi & Tujuan',
                        'logo' => 'Makna Logo',
                        'fasilitas' => 'Fasilitas',
                        'kurikulum' => 'Kurikulum',
                        'biaya' => 'Biaya Pendidikan',
                        'brosur' => 'Brosur',
                    ])
                    ->required(),
                RichEditor::make('content')
                    ->columnSpanFull(),
                FileUpload::make('image')
                    ->image()
                    ->directory('profiles/images')
                    ->required()
                    ->maxSize(2048),
                FileUpload::make('file_pdf')
                    ->acceptedFileTypes(['application/pdf'])
                    ->directory('profiles/pdf')
                    ->maxSize(5120)
                    ->helperText('Opsional. Hanya menerima file PDF (Maksimal 5MB).'),
                Select::make('status')
                    ->options(['draft' => 'Draft', 'published' => 'Published'])
                    ->default('draft')
                    ->required(),
            ]);
    }
}