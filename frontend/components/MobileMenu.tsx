"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfilOpen, setIsProfilOpen] = useState(false);
  const [isLayananOpen, setIsLayananOpen] = useState(false);
  const [isPublikasiOpen, setIsPublikasiOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
    setIsProfilOpen(false);
    setIsLayananOpen(false);
    setIsPublikasiOpen(false);
  };

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div className="md:hidden flex items-center">
      
      <button
        onClick={toggleMenu}
        className={`relative flex flex-col justify-center items-center w-12 h-12 space-y-1.5 focus:outline-none z-50 rounded-full transition-colors duration-300 ${
          isOpen ? 'bg-green-50' : 'bg-transparent'
        }`}
        aria-label="Toggle Menu"
      >
        <span className={`block w-6 h-0.5 rounded-full transition-transform duration-300 ease-in-out ${isOpen ? 'bg-brand-green rotate-45 translate-y-2' : 'bg-white'}`}></span>
        <span className={`block w-6 h-0.5 rounded-full transition-opacity duration-300 ease-in-out ${isOpen ? 'bg-brand-green opacity-0' : 'bg-white opacity-100'}`}></span>
        <span className={`block w-6 h-0.5 rounded-full transition-transform duration-300 ease-in-out ${isOpen ? 'bg-brand-green -rotate-45 -translate-y-2' : 'bg-white'}`}></span>
      </button>

      <div 
        className={`fixed inset-0 bg-brand-green/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: '80px' }}
        onClick={closeMenu}
      ></div>

      <div 
        className={`fixed left-0 right-0 bg-white shadow-2xl z-50 transform transition-all duration-500 ease-in-out origin-top rounded-b-3xl border-t border-gray-100 overflow-y-auto max-h-[calc(100vh-80px)] pb-6 ${
          isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
        style={{ top: '80px' }}
      >
        <div className="flex flex-col px-6 py-6 space-y-2">
          
          <Link href="/" onClick={closeMenu} className="flex items-center justify-between text-brand-green hover:text-brand-yellow font-bold text-lg py-3 px-4 rounded-xl hover:bg-green-50 transition-all">
            <span>Beranda</span>
          </Link>
          
          <div className="flex flex-col">
            <button 
              onClick={() => setIsProfilOpen(!isProfilOpen)} 
              className="flex items-center justify-between w-full text-brand-green hover:text-brand-yellow font-bold text-lg py-3 px-4 rounded-xl hover:bg-green-50 transition-all"
            >
              <span>Profil & Panduan</span>
              <svg className={`w-5 h-5 transform transition-transform duration-300 ${isProfilOpen ? 'rotate-180 text-brand-yellow' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isProfilOpen ? 'max-h-125 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
              <div className="flex flex-col pl-8 pr-4 py-2 border-l-2 border-gray-100 ml-6 space-y-3">
                <Link href="/profil?category=sejarah" onClick={closeMenu} className="text-gray-600 hover:text-brand-green font-medium text-sm">Profil & Sejarah</Link>
                <Link href="/profil?category=visi-misi" onClick={closeMenu} className="text-gray-600 hover:text-brand-green font-medium text-sm">Visi, Misi & Tujuan</Link>
                <Link href="/profil?category=fasilitas" onClick={closeMenu} className="text-gray-600 hover:text-brand-green font-medium text-sm">Fasilitas & Layanan</Link>
                <Link href="/profil?category=tata-tertib" onClick={closeMenu} className="text-gray-600 hover:text-brand-green font-medium text-sm">Tata Tertib</Link>
                <Link href="/profil?category=panduan-layanan" onClick={closeMenu} className="text-gray-600 hover:text-brand-green font-medium text-sm">Panduan Layanan Digital</Link>
                <Link href="/profil?category=keanggotaan" onClick={closeMenu} className="text-gray-600 hover:text-brand-green font-medium text-sm">Syarat Keanggotaan</Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <button 
              onClick={() => setIsLayananOpen(!isLayananOpen)} 
              className="flex items-center justify-between w-full text-brand-green hover:text-brand-yellow font-bold text-lg py-3 px-4 rounded-xl hover:bg-green-50 transition-all"
            >
              <span>Layanan Digital</span>
              <svg className={`w-5 h-5 transform transition-transform duration-300 ${isLayananOpen ? 'rotate-180 text-brand-yellow' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isLayananOpen ? 'max-h-125 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
              <div className="flex flex-col pl-8 pr-4 py-2 border-l-2 border-gray-100 ml-6 space-y-3">
                <Link href="/repositori" onClick={closeMenu} className="text-gray-600 hover:text-brand-green font-medium text-sm">Repositori Karya Guru</Link>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-brand-green font-medium text-sm">Tanya Pustakawan (Virtual)</a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col">
            <button 
              onClick={() => setIsPublikasiOpen(!isPublikasiOpen)} 
              className="flex items-center justify-between w-full text-brand-green hover:text-brand-yellow font-bold text-lg py-3 px-4 rounded-xl hover:bg-green-50 transition-all"
            >
              <span>Publikasi & Informasi</span>
              <svg className={`w-5 h-5 transform transition-transform duration-300 ${isPublikasiOpen ? 'rotate-180 text-brand-yellow' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isPublikasiOpen ? 'max-h-125 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
              <div className="flex flex-col pl-8 pr-4 py-2 border-l-2 border-gray-100 ml-6 space-y-3">
                <Link href="/berita" onClick={closeMenu} className="text-gray-600 hover:text-brand-green font-medium text-sm">Koleksi Literasi</Link>
                <Link href="/video" onClick={closeMenu} className="text-gray-600 hover:text-brand-green font-medium text-sm">Video Publikasi</Link>
                <Link href="/agenda" onClick={closeMenu} className="text-gray-600 hover:text-brand-green font-medium text-sm">Agenda Kegiatan</Link>
                <Link href="/berita?category=literasi-digital" onClick={closeMenu} className="text-gray-600 hover:text-brand-green font-medium text-sm">Literasi Digital</Link>
                <Link href="/berita?category=informasi" onClick={closeMenu} className="text-gray-600 hover:text-brand-green font-medium text-sm">Informasi</Link>
                <Link href="/berita?category=resensi" onClick={closeMenu} className="text-gray-600 hover:text-brand-green font-medium text-sm">Resensi Buku</Link>
                <Link href="/berita?category=pengumuman" onClick={closeMenu} className="text-gray-600 hover:text-brand-green font-medium text-sm">Pengumuman</Link>
              </div>
            </div>
          </div>

          <Link href="/pustakawan" onClick={closeMenu} className="flex items-center justify-between text-brand-green hover:text-brand-yellow font-bold text-lg py-3 px-4 rounded-xl hover:bg-green-50 transition-all">
            <span>Pustakawan & Staf</span>
          </Link>

          <div className="pt-6 pb-2 px-2 mt-4 border-t border-gray-100 flex flex-col gap-3">
            <a href="https://sites.google.com/muallimin.sch.id/perpustakaandigital/" target="_blank" rel="noopener noreferrer" className="block text-center w-full bg-brand-yellow text-brand-green px-6 py-4 rounded-2xl font-extrabold hover:bg-yellow-400 hover:shadow-lg transform hover:-translate-y-1 transition-all text-lg">
              Perpustakaan Digital
            </a>
            <a href="https://www.libsys-online.xyz/muallimin/opac/" target="_blank" rel="noopener noreferrer" className="block text-center w-full bg-brand-yellow text-brand-green px-6 py-4 rounded-2xl font-extrabold hover:bg-yellow-400 hover:shadow-lg transform hover:-translate-y-1 transition-all text-lg">
              Katalog OPAC
            </a>
          </div>
          
        </div>
      </div>

    </div>
  );
}