<?php

namespace App\Filament\Resources\Faqs;

use App\Models\Faq;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use App\Filament\Resources\Faqs\Pages;
use App\Filament\Resources\Faqs\Schemas\FaqForm;
use App\Filament\Resources\Faqs\Tables\FaqsTable;

class FaqResource extends Resource
{
    protected static ?string $model = Faq::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-question-mark-circle';
    
    protected static ?string $navigationLabel = 'Daftar FAQ';
    
    protected static ?string $pluralModelLabel = 'Daftar FAQ';
    
    protected static ?string $modelLabel = 'FAQ';

    public static function form(Schema $schema): Schema
    {
        return $schema->components(FaqForm::schema());
    }

    public static function table(Table $table): Table
    {
        return FaqsTable::table($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListFaqs::route('/'),
            'create' => Pages\CreateFaq::route('/create'),
            'edit' => Pages\EditFaq::route('/{record}/edit'),
        ];
    }
}