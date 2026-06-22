import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AgendaItem } from "@/types";

function decodeHTMLEntities(text: string) {
  return text.replace(/&amp;/g, '&').replace(/&#8217;/g, "'").replace(/&#8211;/g, "-").replace(/&quot;/g, '"');
}

async function getAgenda(slug: string): Promise<AgendaItem | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  const res = await fetch(`${apiUrl}/api/agendas/${slug}`, { next: { revalidate: 60 } });
  
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`HTTP Error Detail Agenda: ${res.status}`);
  }
  
  const json = await res.json();
  
  if (!json || !json.data) {
    throw new Error("Invalid data format received inside agenda slug");
  }
  
  return json.data || json;
}

export default async function DetailAgenda({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const agenda = await getAgenda(resolvedParams.slug);
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8000';

  if (!agenda) {
    notFound();
  }

  const startDate = new Date(agenda.start_date);
  const endDate = new Date(agenda.end_date);
  const formattedStartDate = startDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const formattedEndDate = endDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto mt-20">
        
        <Link href="/agenda" className="inline-flex items-center text-brand-green font-semibold hover:text-brand-yellow transition-colors mb-8 group">
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Daftar Agenda
        </Link>

        <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          
          {agenda.image && (
            <div className="relative w-full h-64 md:h-96 bg-gray-100">
              <Image 
                src={`${storageUrl}/${agenda.image}`} 
                alt={agenda.title} 
                fill 
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {decodeHTMLEntities(agenda.title)}
            </h1>

            <div className="flex flex-col md:flex-row gap-4 mb-10 pb-10 border-b border-gray-100">
              
              <div className="flex items-start gap-4 p-4 bg-green-50/50 rounded-2xl flex-1 border border-green-100/50">
                <div className="w-12 h-12 bg-brand-green text-white rounded-full flex items-center justify-center shrink-0 shadow-inner">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Waktu Pelaksanaan</h3>
                  <p className="font-semibold text-brand-green">{formattedStartDate}</p>
                  {formattedStartDate !== formattedEndDate && (
                    <p className="text-sm text-gray-500 mt-0.5">s/d {formattedEndDate}</p>
                  )}
                </div>
              </div>

              {agenda.location && (
                <div className="flex items-start gap-4 p-4 bg-green-50/50 rounded-2xl flex-1 border border-green-100/50">
                  <div className="w-12 h-12 bg-brand-yellow text-brand-green rounded-full flex items-center justify-center shrink-0 shadow-inner">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Lokasi</h3>
                    <p className="font-semibold text-brand-green">{agenda.location}</p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Detail Kegiatan</h3>
              {agenda.description ? (
                 <div 
                   className="prose prose-lg prose-green max-w-none text-gray-600"
                   dangerouslySetInnerHTML={{ __html: agenda.description }}
                 />
              ) : (
                <p className="text-gray-500 italic">Tidak ada deskripsi detail untuk kegiatan ini.</p>
              )}
            </div>

          </div>
        </article>

      </div>
    </main>
  );
}