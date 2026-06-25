<?php

namespace App\Filament\Resources\DigitalCollections\Pages;

use App\Filament\Resources\DigitalCollections\DigitalCollectionResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditDigitalCollection extends EditRecord
{
    protected static string $resource = DigitalCollectionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
