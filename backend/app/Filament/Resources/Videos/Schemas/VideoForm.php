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
                    ->directory('videos/thumbnails')
                    ->required()
                    ->maxSize(2048),
                FileUpload::make('video_path')
                    ->label('File Video (MP4/WEBM)')
                    ->acceptedFileTypes(['video/mp4', 'video/webm'])
                    ->directory('videos/files')
                    ->required()
                    ->maxSize(51200),
            ]);
    }
}