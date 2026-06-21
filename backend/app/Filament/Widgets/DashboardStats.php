<?php

namespace App\Filament\Widgets;

use App\Models\Post;
use App\Models\Agenda;
use App\Models\Director;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class DashboardStats extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Berita', Post::count())
                ->description('Seluruh artikel diterbitkan')
                ->descriptionIcon('heroicon-m-newspaper')
                ->color('primary'),
                
            Stat::make('Total Agenda', Agenda::count())
                ->description('Jadwal kegiatan madrasah')
                ->descriptionIcon('heroicon-m-calendar-days')
                ->color('warning'),
                
            Stat::make('Total Direktur', Director::count())
                ->description('Data pimpinan tercatat')
                ->descriptionIcon('heroicon-m-users')
                ->color('success'),
        ];
    }
}