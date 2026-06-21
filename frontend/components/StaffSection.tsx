"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export interface StaffItem {
  id: number;
  name: string;
  type: string;
  subject: string | null;
  image: string | null;
}

interface StaffSectionProps {
  staffs: StaffItem[];
  title?: string;
  showFilters?: boolean;
}

export default function StaffSection({ staffs, title = "Guru & Tenaga Kependidikan", showFilters = true }: StaffSectionProps) {
  const [activeTab, setActiveTab] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8000/storage';

  const filteredStaffs = useMemo(() => {
    if (!staffs || staffs.length === 0) return [];
    
    return staffs.filter((staff) => {
      const matchTab = activeTab === 'Semua' || staff.type === activeTab;
      const matchSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (staff.subject && staff.subject.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchTab && matchSearch;
    });
  }, [staffs, activeTab, searchQuery]);

  const tabs = ['Semua', 'Guru', 'Tenaga Kependidikan'];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-brand-blue mb-4">{title}</h2>
          <div className="w-24 h-1.5 bg-brand-yellow mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Mengenal lebih dekat para pendidik dan tenaga kependidikan yang berdedikasi di Madrasah Mu&apos;allimin Muhammadiyah Yogyakarta.
          </p>
        </motion.div>

        {showFilters && (
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100 w-full md:w-auto overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                    activeTab === tab 
                      ? 'bg-brand-blue text-white shadow-md' 
                      : 'text-gray-500 hover:text-brand-blue hover:bg-blue-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Cari nama atau mapel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-shadow text-sm"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        )}

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredStaffs.map((staff, index) => (
              <motion.div
                layout
                key={staff.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col h-full"
              >
                <div className="relative h-72 w-full bg-gray-100 overflow-hidden">
                    {staff.image ? (
                    <Image
                      src={`${storageUrl}/${staff.image}`}
                      alt={staff.name}
                      fill
                      loading="lazy" // Menegaskan bahwa gambar ini harus di-lazy load
                      quality={60} // Mengompres gambar menjadi 60% (Sangat meringankan beban tanpa merusak visual yang parah)
                      className="object-cover object-top group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                      <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 px-4">
                       <p className="text-xs font-light uppercase tracking-widest mb-1 opacity-80">Mu&apos;allimin Yogyakarta</p>
                       <p className="text-sm font-bold">{staff.type === 'Guru' ? staff.subject : 'Staff Terampil'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-2 group-hover:text-brand-blue transition-colors">{staff.name}</h3>
                  <div className="flex items-center gap-2 mt-auto">
                    <span className={`w-2 h-2 rounded-full ${staff.type === 'Guru' ? 'bg-green-500' : 'bg-brand-yellow'}`}></span>
                    <p className="text-sm font-medium text-gray-500">
                      {staff.type}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredStaffs.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-2xl border border-gray-100 border-dashed"
          >
            <h3 className="text-xl font-bold text-gray-600 mb-2">Data Tidak Ditemukan</h3>
            <p className="text-gray-500">Coba gunakan kata kunci lain untuk mencari guru atau tendik.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}