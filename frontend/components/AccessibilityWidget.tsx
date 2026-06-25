"use client";

import { useState, useEffect } from 'react';

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isDyslexic, setIsDyslexic] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const savedContrast = localStorage.getItem('accessibility_contrast') === 'true';
    const savedDyslexic = localStorage.getItem('accessibility_dyslexic') === 'true';
    const savedFontSize = Number(localStorage.getItem('accessibility_fontSize')) || 16;

    if (savedContrast) document.documentElement.classList.add('high-contrast');
    if (savedDyslexic) document.documentElement.classList.add('font-dyslexic');
    document.documentElement.style.fontSize = `${savedFontSize}px`;

    const timeoutId = setTimeout(() => {
      setIsHighContrast(savedContrast);
      setIsDyslexic(savedDyslexic);
      setFontSize(savedFontSize);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  const toggleContrast = () => {
    setIsHighContrast((prev) => {
      const newValue = !prev;
      localStorage.setItem('accessibility_contrast', String(newValue));
      
      if (newValue) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
      return newValue;
    });
  };

  const toggleDyslexic = () => {
    setIsDyslexic((prev) => {
      const newValue = !prev;
      localStorage.setItem('accessibility_dyslexic', String(newValue));

      if (newValue) {
        document.documentElement.classList.add('font-dyslexic');
      } else {
        document.documentElement.classList.remove('font-dyslexic');
      }
      return newValue;
    });
  };

  const changeFontSize = (newSize: number) => {
    if (newSize >= 12 && newSize <= 24) {
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}px`;
      localStorage.setItem('accessibility_fontSize', String(newSize));
    }
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const mainContent = document.querySelector('main')?.innerText || document.body.innerText;
      const utterance = new SpeechSynthesisUtterance(mainContent);
      utterance.lang = 'id-ID';
      utterance.rate = 0.9;
      
      utterance.onend = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Menu Modal */}
      {isOpen && (
        <div className="bg-white p-4 rounded-2xl shadow-2xl mb-4 border border-gray-100 w-64 transform transition-all animate-fade-in-up">
          <h3 className="font-bold text-gray-800 border-b pb-2 mb-4 text-sm">Pengaturan Aksesibilitas</h3>
          
          <div className="flex flex-col gap-3">
            <button 
              onClick={toggleSpeech}
              className={`flex items-center gap-2 p-2 rounded-lg text-sm font-medium transition-colors ${isSpeaking ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
            >
              <span>{isSpeaking ? '⏹ Hentikan Audio' : '▶️ Dengarkan Halaman'}</span>
            </button>

            <button 
              onClick={toggleContrast}
              className={`flex items-center gap-2 p-2 rounded-lg text-sm font-medium transition-colors ${isHighContrast ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
            >
              <span>{isHighContrast ? '☀️ Mode Normal' : '🌗 High Contrast'}</span>
            </button>

            <button 
              onClick={toggleDyslexic}
              className={`flex items-center gap-2 p-2 rounded-lg text-sm font-medium transition-colors ${isDyslexic ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
            >
              <span>{isDyslexic ? '🔤 Font Normal' : '🔤 Font Disleksia'}</span>
            </button>

            <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Ukuran Teks</span>
              <div className="flex gap-2">
                <button onClick={() => changeFontSize(fontSize - 2)} className="w-8 h-8 flex items-center justify-center bg-white rounded shadow hover:bg-gray-100 text-gray-800 font-bold">-</button>
                <button onClick={() => changeFontSize(fontSize + 2)} className="w-8 h-8 flex items-center justify-center bg-white rounded shadow hover:bg-gray-100 text-gray-800 font-bold">+</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Area Tombol Melayang */}
      <div className="relative flex items-center justify-center mt-2">
        
        {/* Label Teks Penunjuk (Hanya Muncul Saat Widget Tertutup, dan pada layar desktop/tablet) */}
        {!isOpen && (
          <div className="hidden md:flex absolute right-full mr-5 items-center animate-bounce">
            <div className="bg-brand-green text-brand-yellow text-xs font-extrabold px-4 py-2 rounded-xl shadow-lg border border-brand-yellow whitespace-nowrap">
              Fitur Aksesibilitas
            </div>
            {/* Segitiga panah menunjuk ke tombol */}
            <div className="w-0 h-0 border-y-8 border-y-transparent border-l-8 border-l-brand-green -ml-px"></div>
          </div>
        )}

        {/* Animasi Radar (Ping) agar mencolok */}
        {!isOpen && (
          <div className="absolute inset-0 bg-brand-yellow rounded-full animate-ping opacity-60"></div>
        )}

        {/* Tombol Utama */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`relative z-10 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform focus:outline-none border-4 ${
            isOpen 
              ? 'bg-white text-gray-400 border-gray-200' 
              : 'bg-brand-yellow text-brand-green border-white'
          }`}
          aria-label="Menu Aksesibilitas"
        >
          {isOpen ? (
            // Ikon X saat terbuka
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Ikon Universal Aksesibilitas
            <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/>
            </svg>
          )}
        </button>
      </div>

    </div>
  );
}