"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SettingItem } from '@/types'; 
import MobileMenu from './MobileMenu';
import AnnouncementBanner from './AnnouncementBanner';

interface NavbarProps {
  settings: SettingItem | SettingItem[] | null;
}

export default function Navbar({ settings }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPublikasiOpen, setIsPublikasiOpen] = useState(false);
  const [isProfilOpen, setIsProfilOpen] = useState(false);
  const pathname = usePathname();
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8000';

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBackground = isScrolled || !isHomePage 
    ? 'bg-brand-green shadow-lg py-2' 
    : 'bg-transparent py-4';

  const currentSetting = Array.isArray(settings) ? settings[0] : settings;
  const isAnnouncementActive = currentSetting?.is_announcement_active && currentSetting?.announcement_text;

  return (
    <>
      {isAnnouncementActive && (
        <div className="fixed top-0 left-0 w-full z-60 h-9">
          <AnnouncementBanner 
            text={currentSetting.announcement_text as string} 
            link={currentSetting.announcement_link} 
          />
        </div>
      )}

      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${navBackground} ${
          isAnnouncementActive ? 'top-9' : 'top-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            
            <div className="shrink-0 flex items-center z-20 gap-3">
              {currentSetting?.navbar_logo ? (
                <div className="relative w-12 h-12 bg-white rounded-full p-1 overflow-hidden shadow-sm flex items-center justify-center">
                  <Image 
                    src={`${storageUrl}/${currentSetting.navbar_logo}`} 
                    alt="Logo Perpustakaan" 
                    fill 
                    className="object-contain p-1.5"
                    sizes="48px"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 shadow-sm">
                  <span className="text-brand-green font-bold text-[10px]">LOGO</span>
                </div>
              )}
              
              <Link href="/" className="text-2xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
                PERPUSTAKAAN <br/>
                <span className="text-sm font-medium tracking-normal opacity-90 drop-shadow-md">MU&apos;ALLIMIN</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8 z-10">
              
              {/* Menu 1: Profil & Panduan */}
              <div 
                className="relative group"
                onMouseEnter={() => setIsProfilOpen(true)}
                onMouseLeave={() => setIsProfilOpen(false)}
              >
                <button className="text-white hover:text-brand-yellow font-semibold transition-colors flex items-center gap-1 drop-shadow-sm py-2">
                  Profil & Panduan
                  <svg className={`w-4 h-4 transition-transform duration-200 ${isProfilOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                <div 
                  className={`absolute top-full left-0 w-56 bg-white rounded-lg shadow-xl py-2 mt-1 transition-all duration-200 origin-top ${
                    isProfilOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                  }`}
                >
                  <Link href="/profil?category=sejarah" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green">Profil & Sejarah</Link>
                  <Link href="/profil?category=visi-misi" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green">Visi, Misi & Tujuan</Link>
                  <Link href="/profil?category=fasilitas" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green">Fasilitas & Layanan</Link>
                  <Link href="/profil?category=tata-tertib" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green">Tata Tertib</Link>
                  <Link href="/profil?category=panduan-opac" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green">Panduan OPAC</Link>
                  <Link href="/profil?category=keanggotaan" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green">Syarat Keanggotaan</Link>
                </div>
              </div>

              {/* Menu 2: Publikasi & Informasi */}
              <div 
                className="relative group"
                onMouseEnter={() => setIsPublikasiOpen(true)}
                onMouseLeave={() => setIsPublikasiOpen(false)}
              >
                <button className="text-white hover:text-brand-yellow font-semibold transition-colors flex items-center gap-1 drop-shadow-sm py-2">
                  Publikasi & Informasi
                  <svg className={`w-4 h-4 transition-transform duration-200 ${isPublikasiOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                <div 
                  className={`absolute top-full left-0 w-52 bg-white rounded-lg shadow-xl py-2 mt-1 transition-all duration-200 origin-top ${
                    isPublikasiOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                  }`}
                >
                  <div className="px-4 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Media & Kegiatan</div>
                  <Link href="/berita" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green">Koleksi Literasi</Link>
                  <Link href="/repositori" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green">Repositori Digital</Link>
                  <Link href="/video" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green">Video Publikasi</Link>
                  <Link href="/agenda" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green">Agenda Kegiatan</Link>
                  
                  <div className="border-t border-gray-100 my-1"></div>
                  <div className="px-4 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Kategori Spesifik</div>
                  <Link href="/berita?category=informasi" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green">Informasi</Link>
                  <Link href="/berita?category=resensi" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green">Resensi Buku</Link>
                  <Link href="/berita?category=pengumuman" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green">Pengumuman</Link>
                </div>
              </div>

              {/* Menu 3: Pustakawan & Staf */}
              <Link href="/pustakawan" className="text-white hover:text-brand-yellow font-semibold transition-colors flex items-center gap-1 drop-shadow-sm">
                Pustakawan & Staf
              </Link>
              
            </div>
            
            <div className="flex items-center justify-end z-20 gap-4">
              <div className="hidden md:flex items-center gap-3">
                <a href={currentSetting?.opac_url || "https://www.libsys-online.xyz/muallimin/opac/"} target="_blank" rel="noopener noreferrer" className="inline-block bg-brand-yellow text-brand-green px-7 py-2.5 rounded-full font-bold hover:bg-yellow-400 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  Katalog OPAC
                </a>
              </div>
              <MobileMenu />
            </div>

          </div>
        </div>
      </nav>
    </>
  );
}