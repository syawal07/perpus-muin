"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, FormEvent, Suspense } from 'react';

// Pisahkan isi komponen ke dalam fungsi tersendiri agar bisa dibungkus Suspense
function SearchBarContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Mengambil kata kunci dari URL jika ada (misal sedang di-refresh)
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault(); // Mencegah halaman reload penuh
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchTerm.trim()) {
      params.set('q', searchTerm.trim()); // Setel query pencarian
    } else {
      params.delete('q'); // Hapus query jika kosong
    }
    
    // Setiap kali mencari baru, kembalikan ke Halaman 1
    params.set('page', '1'); 
    
    // Dorong ke URL baru
    router.push(`/berita?${params.toString()}`);
  };

  // Fungsi untuk membersihkan kolom pencarian dengan cepat
  const handleClear = () => {
    setSearchTerm('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    params.set('page', '1');
    router.push(`/berita?${params.toString()}`);
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className="flex w-full max-w-2xl mx-auto mb-16 shadow-lg hover:shadow-xl rounded-full overflow-hidden border border-gray-100 bg-white focus-within:ring-2 focus-within:ring-brand-yellow focus-within:border-transparent transition-all duration-300"
    >
      {/* Ikon Kaca Pembesar */}
      <div className="flex items-center pl-6 text-gray-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Cari judul berita atau artikel..."
        className="grow px-4 py-4 outline-none text-gray-700 bg-transparent text-lg placeholder-gray-400"
      />

      {/* Tombol Silang (Muncul hanya jika ada teks) */}
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

      {/* Tombol Cari */}
      <button 
        type="submit" 
        className="bg-brand-blue text-brand-yellow px-8 md:px-10 py-4 font-extrabold hover:bg-blue-800 transition-colors text-lg flex items-center gap-2"
      >
        <span className="hidden md:inline">Cari</span>
        <span className="md:hidden">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </span>
      </button>
    </form>
  );
}

// Komponen Utama yang diekspor (Dibungkus Suspense agar Next.js tidak marah)
export default function SearchBar() {
  return (
    <Suspense fallback={<div className="w-full max-w-2xl mx-auto mb-16 h-16 bg-gray-100 animate-pulse rounded-full shadow-sm"></div>}>
      <SearchBarContent />
    </Suspense>
  );
}