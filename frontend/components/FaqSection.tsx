"use client";

import { useState, useEffect } from 'react';

interface Faq {
    id: number;
    question: string;
    answer: string;
}

export default function FaqSection() {
    const [faqs, setFaqs] = useState<Faq[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
                const response = await fetch(`${apiUrl}/api/faqs`);
                
                if (!response.ok) {
                    throw new Error('Gagal mengambil data FAQ');
                }
                
                const result = await response.json();
                
                if (result.success) {
                    setFaqs(result.data);
                } else {
                    throw new Error(result.message);
                }
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
            } finally {
                setIsLoading(false);
            }
        };

        fetchFaqs();
    }, []);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (isLoading) {
        return (
            <section className="w-full max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="animate-pulse flex flex-col space-y-4 bg-brand-green/5 border border-brand-green/20 rounded-3xl p-6 sm:p-8">
                    <div className="h-8 bg-brand-green/20 rounded-xl w-1/3 mb-6 mx-auto"></div>
                    <div className="h-16 bg-brand-green/10 rounded-2xl w-full"></div>
                    <div className="h-16 bg-brand-green/10 rounded-2xl w-full"></div>
                    <div className="h-16 bg-brand-green/10 rounded-2xl w-full"></div>
                </div>
            </section>
        );
    }

    if (error || faqs.length === 0) {
        return null;
    }

    return (
        <section className="w-full max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold tracking-tight text-brand-green sm:text-4xl drop-shadow-sm">
                    Pertanyaan yang Sering Diajukan
                </h2>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Temukan jawaban cepat untuk pertanyaan umum seputar layanan perpustakaan digital kami.
                </p>
            </div>

            {/* Container Utama Bernuansa Hijau Glassmorphism */}
            <div className="bg-brand-green/5 backdrop-blur-xl border border-brand-green/20 shadow-[0_8px_30px_rgb(25,135,84,0.1)] rounded-3xl p-4 sm:p-8 flex flex-col space-y-4 relative overflow-hidden">
                
                {/* Efek Cahaya Latar (Aksen Kuning & Hijau) */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl pointer-events-none"></div>

                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    
                    return (
                        <div 
                            key={faq.id} 
                            className={`relative z-10 border rounded-2xl overflow-hidden transition-all duration-300 ease-in-out ${
                                isOpen 
                                ? 'bg-brand-green border-brand-green shadow-xl scale-[1.02] sm:scale-[1.01]' 
                                : 'bg-white border-brand-green/20 hover:border-brand-green/50 hover:shadow-md'
                            }`}
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none cursor-pointer group"
                            >
                                <span className={`font-bold pr-6 text-lg transition-colors duration-300 ${isOpen ? 'text-white' : 'text-brand-green group-hover:text-green-800'}`}>
                                    {faq.question}
                                </span>
                                <span className={`flex-shrink-0 transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                                        isOpen 
                                        ? 'bg-brand-yellow text-brand-green shadow-sm' 
                                        : 'bg-brand-green/10 text-brand-green group-hover:bg-brand-green/20'
                                    }`}>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </span>
                            </button>
                            
                            <div 
                                className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className={`px-6 pb-6 pt-1 leading-relaxed whitespace-pre-wrap text-base sm:text-lg ${isOpen ? 'text-green-50' : 'text-gray-700'}`}>
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}