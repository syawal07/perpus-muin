"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageItem } from "@/types";

function AnimatedNumber({ value }: { value: string | null }) {
  const [count, setCount] = useState("0");

  useEffect(() => {
    if (!value) return;

    const match = value.match(/^(\D*)(\d+)(\D*)$/);
    if (!match) {
      requestAnimationFrame(() => {
        setCount(value);
      });
      return;
    }

    const prefix = match[1] || "";
    const target = parseInt(match[2], 10);
    const suffix = match[3] || "";

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const animate = () => {
      start += increment;
      if (start < target) {
        setCount(prefix + Math.floor(start) + suffix);
        requestAnimationFrame(animate);
      } else {
        setCount(prefix + target + suffix);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <span>{count}</span>;
}

export default function StatsSection({ data }: { data: PageItem | null }) {
  // Array data stats dengan penyesuaian ikon dan warna aksen masing-masing
  const stats = [
    {
      title: data?.stat_1_title || "Koleksi Cetak",
      value: data?.stat_1_value || "15.000+",
      icon: (
        <svg className="w-8 h-8 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: "bg-green-50/50 border-green-100",
      blurColor: "bg-green-100",
    },
    {
      title: data?.stat_2_title || "E-Resources",
      value: data?.stat_2_value || "5.000+",
      icon: (
        <svg className="w-8 h-8 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: "bg-yellow-50/50 border-yellow-100",
      blurColor: "bg-yellow-100",
    },
    {
      title: data?.stat_3_title || "Kunjungan Bulanan",
      value: data?.stat_3_value || "2.500+",
      icon: (
        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "bg-orange-50/50 border-orange-100",
      blurColor: "bg-orange-100",
    },
    {
      title: data?.stat_4_title || "Fasilitas Layanan",
      value: data?.stat_4_value || "8+",
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: "bg-blue-50/50 border-blue-100",
      blurColor: "bg-blue-100",
    },
  ];

  return (
    <section className="py-24 px-6 w-full bg-white relative z-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-green mb-4">
            Perpustakaan dalam Angka
          </h2>
          <div className="w-24 h-1.5 bg-brand-yellow mx-auto rounded-full"></div>
        </div>

        {/* Modern Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="relative bg-white rounded-[2rem] p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col items-center text-center group overflow-hidden"
            >
              {/* Efek Cahaya Blur di Sudut */}
              <div className={`absolute -top-6 -right-6 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 ${stat.blurColor}`}></div>
              
              {/* Box Ikon */}
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-inner border relative z-10 group-hover:scale-110 transition-transform duration-500 ${stat.color}`}>
                {stat.icon}
              </div>
              
              {/* Judul & Nilai */}
              <h3 className="text-gray-400 font-bold text-sm tracking-widest uppercase mb-2 relative z-10">
                {stat.title}
              </h3>
              
              <p className="text-4xl md:text-5xl font-black text-gray-800 relative z-10 tracking-tight">
                <AnimatedNumber value={stat.value} />
              </p>
            </div>
          ))}
        </div>

        {/* Tombol Aksi */}
        <div className="mt-16 flex justify-center">
          <Link
            href={data?.stats_link || "/profil"}
            className="group flex items-center gap-3 bg-brand-green text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-green-800 transition-all shadow-md hover:shadow-xl transform hover:-translate-y-1"
          >
            Pelajari Selengkapnya
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>
        </div>
        
      </div>
    </section>
  );
}