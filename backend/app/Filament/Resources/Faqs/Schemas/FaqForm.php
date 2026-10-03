<?php

namespace App\Filament\Resources\Faqs\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;

class FaqForm
{
    public static function schema(): array
    {
        return [
            TextInput::make('question')
                ->label('Pertanyaan')
                ->required()
                ->maxLength(255)
                ->columnSpanFull(),
                
            Textarea::make('answer')
                ->label('Jawaban')
                ->required()
                ->rows(4)
                ->columnSpanFull(),
                
            TextInput::make('sort_order')
                ->label('Urutan')
                ->numeric()
                ->default(0)
                ->helperText('Angka lebih kecil akan tampil di urutan paling atas (misal: 1, 2, 3).'),
                
            Toggle::make('is_active')
                ->label('Status Aktif')
                ->default(true)
                ->helperText('Jika dinonaktifkan, FAQ ini tidak akan tampil di website siswa.'),
        ];
    }
}