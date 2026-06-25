<?php

namespace App\Filament\Resources\DigitalCollections\Pages;

use App\Filament\Resources\DigitalCollections\DigitalCollectionResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListDigitalCollections extends ListRecords
{
    protected static string $resource = DigitalCollectionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
