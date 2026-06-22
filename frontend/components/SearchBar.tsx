"use client";

import { useState, FormEvent } from 'react';

export default function SearchBar({ opacUrl }: { opacUrl?: string }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    
    const baseUrl = opacUrl || 'https://www.libsys-online.xyz/muallimin/opac/';
    
    if (searchTerm.trim()) {
      window.open(`${baseUrl}?keywords=${encodeURIComponent(searchTerm.trim())}`, '_blank');
    } else {
      window.open(baseUrl, '_blank');
    }
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className="flex w-full max-w-3xl mx-auto md:mx-0 mt-8 mb-4 shadow-2xl rounded-full overflow-hidden border-4 border-white/20 bg-white focus-within:ring-4 focus-within:ring-brand-yellow focus-within:border-white transition-all duration-300"
    >
      <div className="flex items-center pl-6 text-gray-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Cari judul buku, pengarang, atau subjek..."
        className="grow px-4 py-4 md:py-5 outline-none text-gray-700 bg-transparent text-lg placeholder-gray-400"
      />

      {searchTerm && (
        <button 
          type="button" 
          onClick={handleClear}
          className="px-4 text-gray-300 hover:text-red-500 transition-colors focus:outline-none"
          aria-label="Hapus pencarian"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      <button 
        type="submit" 
        className="bg-brand-green text-brand-yellow px-8 md:px-12 py-4 md:py-5 font-extrabold hover:bg-green-800 transition-colors text-lg flex items-center gap-2"
      >
        <span className="hidden md:inline">Cari Katalog</span>
        <span className="md:hidden">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </span>
      </button>
    </form>
  );
}