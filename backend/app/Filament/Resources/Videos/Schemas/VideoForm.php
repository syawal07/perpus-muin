<?php

namespace App\Filament\Resources\Videos\Schemas;

use App\Models\Video;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class VideoForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Judul Video')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (string $operation, $state, callable $set) => $operation === 'create' ? $set('slug', Str::slug($state)) : null),

                TextInput::make('slug')
                    ->disabled()
                    ->dehydrated()
                    ->required()
                    ->maxLength(255)
                    ->unique(Video::class, 'slug', ignoreRecord: true),

                Textarea::make('description')
                    ->label('Deskripsi Video')
                    ->columnSpanFull(),

                FileUpload::make('thumbnail')
                    ->label('Gambar Sampul (Thumbnail)')
                    ->image()
                    ->imageEditor()
                    ->optimize('webp')
                    ->directory('videos/thumbnails')
                    ->required()
                    ->maxSize(2048),

                TextInput::make('video_path')
                    ->label('Link Video (YouTube atau Google Drive)')
                    ->placeholder('Contoh: https://youtu.be/xxx atau https://drive.google.com/file/d/xxx')
                    ->url()
                    ->required()
                    ->helperText('Dukung link YouTube (embed) atau link pratinjau Google Drive.')
                    ->columnSpanFull(),
            ]);
    }
}