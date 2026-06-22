<?php

namespace App\Filament\Widgets;

use App\Models\Post;
use App\Models\Agenda;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class DashboardStats extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Artikel & Literasi', Post::count())
                ->description('Koleksi tulisan diterbitkan')
                ->descriptionIcon('heroicon-m-book-open')
                ->color('primary'),
                
            Stat::make('Total Agenda', Agenda::count())
                ->description('Jadwal kegiatan perpustakaan')
                ->descriptionIcon('heroicon-m-calendar-days')
                ->color('warning'),
        ];
    }
}