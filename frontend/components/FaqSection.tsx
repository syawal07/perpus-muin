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
                // Perbaikan TypeScript: Cek apakah err adalah instance dari Error
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
            <section className="w-full max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="animate-pulse flex flex-col space-y-4 bg-white/20 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-3xl p-6 sm:p-8">
                    <div className="h-8 bg-white/40 rounded-xl w-1/3 mb-6 mx-auto"></div>
                    <div className="h-16 bg-white/30 rounded-2xl w-full"></div>
                    <div className="h-16 bg-white/30 rounded-2xl w-full"></div>
                    <div className="h-16 bg-white/30 rounded-2xl w-full"></div>
                </div>
            </section>
        );
    }

    if (error || faqs.length === 0) {
        return null;
    }

    return (
        <section className="w-full max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl drop-shadow-sm">
                    Pertanyaan yang Sering Diajukan
                </h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                    Temukan jawaban cepat untuk pertanyaan umum seputar layanan kami.
                </p>
            </div>

            <div className="bg-white/30 dark:bg-black/20 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] rounded-3xl p-4 sm:p-8 flex flex-col space-y-4 relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl pointer-events-none"></div>

                {faqs.map((faq, index) => (
                    <div 
                        key={faq.id} 
                        className={`relative z-10 border border-white/50 dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'bg-white/70 dark:bg-white/10 shadow-lg scale-[1.01]' : 'bg-white/40 dark:bg-black/10 hover:bg-white/50 dark:hover:bg-white/5 hover:shadow-md'}`}
                    >
                        <button
                            onClick={() => toggleFaq(index)}
                            className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none cursor-pointer"
                        >
                            <span className="font-semibold text-gray-800 dark:text-gray-100 pr-6 text-lg">
                                {faq.question}
                            </span>
                            <span className={`flex-shrink-0 transition-transform duration-500 ease-in-out ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}>
                                <div className="w-8 h-8 rounded-full bg-white/50 dark:bg-black/30 flex items-center justify-center backdrop-blur-sm border border-white/30">
                                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </span>
                        </button>
                        
                        <div 
                            className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="px-6 pb-6 pt-2 text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-wrap text-base">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}