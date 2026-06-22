"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 text-center">
      <div className="bg-white p-10 md:p-16 rounded-3xl shadow-xl border border-gray-100 max-w-lg w-full">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold text-brand-green mb-4">Ups! Terjadi Kesalahan</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Sistem perpustakaan kami gagal terhubung ke server atau sedang dalam perbaikan. Mohon coba beberapa saat lagi.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="bg-brand-green text-white px-8 py-3 rounded-full font-bold hover:bg-green-800 transition-all shadow-md"
          >
            Coba Ulangi
          </button>
          <Link
            href="/"
            className="bg-brand-yellow text-brand-green px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-all shadow-md"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}