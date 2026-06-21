"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfilOpen, setIsProfilOpen] = useState(false);
  const [isBeritaOpen, setIsBeritaOpen] = useState(false);

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
    setIsBeritaOpen(false);
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
          isOpen ? 'bg-blue-50' : 'bg-transparent'
        }`}
        aria-label="Toggle Menu"
      >
        <span className={`block w-6 h-0.5 rounded-full transition-transform duration-300 ease-in-out ${isOpen ? 'bg-brand-blue rotate-45 translate-y-2' : 'bg-white'}`}></span>
        <span className={`block w-6 h-0.5 rounded-full transition-opacity duration-300 ease-in-out ${isOpen ? 'bg-brand-blue opacity-0' : 'bg-white opacity-100'}`}></span>
        <span className={`block w-6 h-0.5 rounded-full transition-transform duration-300 ease-in-out ${isOpen ? 'bg-brand-blue -rotate-45 -translate-y-2' : 'bg-white'}`}></span>
      </button>

      <div 
        className={`fixed inset-0 bg-brand-blue/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
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
          
          <Link href="/" onClick={closeMenu} className="flex items-center justify-between text-brand-blue hover:text-brand-yellow font-bold text-lg py-3 px-4 rounded-xl hover:bg-blue-50 transition-all">
            <span>Beranda</span>
          </Link>
          
          <div className="flex flex-col">
            <button 
              onClick={() => setIsProfilOpen(!isProfilOpen)} 
              className="flex items-center justify-between w-full text-brand-blue hover:text-brand-yellow font-bold text-lg py-3 px-4 rounded-xl hover:bg-blue-50 transition-all"
            >
              <span>Profil</span>
              <svg className={`w-5 h-5 transform transition-transform duration-300 ${isProfilOpen ? 'rotate-180 text-brand-yellow' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isProfilOpen ? 'max-h-125 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
              <div className="flex flex-col pl-8 pr-4 py-2 border-l-2 border-gray-100 ml-6 space-y-3">
                <Link href="/profil?category=sejarah" onClick={closeMenu} className="text-gray-600 hover:text-brand-blue font-medium text-sm">Sejarah (Muqadimah)</Link>
                <Link href="/profil?category=visi-misi" onClick={closeMenu} className="text-gray-600 hover:text-brand-blue font-medium text-sm">Visi, Misi, Tujuan</Link>
                <Link href="/profil?category=logo" onClick={closeMenu} className="text-gray-600 hover:text-brand-blue font-medium text-sm">Makna Logo</Link>
                <Link href="/profil?category=fasilitas" onClick={closeMenu} className="text-gray-600 hover:text-brand-blue font-medium text-sm">Fasilitas</Link>
                <Link href="/profil?category=kurikulum" onClick={closeMenu} className="text-gray-600 hover:text-brand-blue font-medium text-sm">Kurikulum</Link>
                <Link href="/profil?category=biaya" onClick={closeMenu} className="text-gray-600 hover:text-brand-blue font-medium text-sm">Biaya Pendidikan</Link>
                <Link href="/profil?category=brosur" onClick={closeMenu} className="text-gray-600 hover:text-brand-blue font-medium text-sm">Brosur</Link>
              </div>
            </div>
          </div>
          
          <Link href="/agenda" onClick={closeMenu} className="flex items-center justify-between text-brand-blue hover:text-brand-yellow font-bold text-lg py-3 px-4 rounded-xl hover:bg-blue-50 transition-all">
            <span>Agenda</span>
          </Link>
          
          <div className="flex flex-col">
            <button 
              onClick={() => setIsBeritaOpen(!isBeritaOpen)} 
              className="flex items-center justify-between w-full text-brand-blue hover:text-brand-yellow font-bold text-lg py-3 px-4 rounded-xl hover:bg-blue-50 transition-all"
            >
              <span>Berita</span>
              <svg className={`w-5 h-5 transform transition-transform duration-300 ${isBeritaOpen ? 'rotate-180 text-brand-yellow' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isBeritaOpen ? 'max-h-100 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
              <div className="flex flex-col pl-8 pr-4 py-2 border-l-2 border-gray-100 ml-6 space-y-3">
                <Link href="/berita" onClick={closeMenu} className="text-gray-600 hover:text-brand-blue font-medium text-sm">Semua Berita</Link>
                <Link href="/berita?category=karier" onClick={closeMenu} className="text-gray-600 hover:text-brand-blue font-medium text-sm">Karier</Link>
                <Link href="/berita?category=kegiatan" onClick={closeMenu} className="text-gray-600 hover:text-brand-blue font-medium text-sm">Kegiatan</Link>
                <Link href="/berita?category=karya" onClick={closeMenu} className="text-gray-600 hover:text-brand-blue font-medium text-sm">Karya</Link>
                <Link href="/berita?category=prestasi" onClick={closeMenu} className="text-gray-600 hover:text-brand-blue font-medium text-sm">Prestasi</Link>
              </div>
            </div>
          </div>
          <Link href="/guru-tendik" onClick={closeMenu} className="flex items-center justify-between text-brand-blue hover:text-brand-yellow font-bold text-lg py-3 px-4 rounded-xl hover:bg-blue-50 transition-all">
            <span>Guru & Tendik</span>
          </Link>
          <div className="pt-6 pb-2 px-2 mt-4 border-t border-gray-100 flex flex-col gap-3">
            <a href="https://alumni.muallimin.sch.id/" target="_blank" rel="noopener noreferrer" className="block text-center w-full bg-blue-50 text-brand-blue px-6 py-4 rounded-2xl font-extrabold hover:bg-blue-100 hover:shadow-lg transform hover:-translate-y-1 transition-all text-lg">
              Portal Alumni
            </a>
            <a href="https://spmb.muallimin.sch.id/" target="_blank" rel="noopener noreferrer" className="block text-center w-full bg-brand-yellow text-brand-blue px-6 py-4 rounded-2xl font-extrabold hover:bg-yellow-400 hover:shadow-lg transform hover:-translate-y-1 transition-all text-lg">
              Portal SPMB
            </a>
          </div>
          
        </div>
      </div>

    </div>
  );
}