import Link from "next/link";
import { AgendaItem } from "@/types";

function decodeHTMLEntities(text: string) {
  return text.replace(/&amp;/g, '&').replace(/&#8217;/g, "'").replace(/&#8211;/g, "-").replace(/&quot;/g, '"');
}

function stripHTML(html: string) {
  return html ? html.replace(/<[^>]*>?/gm, '') : '';
}

async function getAgendas(): Promise<AgendaItem[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  const res = await fetch(`${apiUrl}/api/agendas`, { next: { revalidate: 60 } });
  
  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`);
  }

  const json = await res.json();
  
  if (!json || (!json.data && !Array.isArray(json))) {
    throw new Error("Invalid data format received");
  }

  return json.data || json;
}

export default async function DaftarAgenda() {
  const agendas = await getAgendas();

  return (
    <main className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-16 mt-20">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-green mb-4">
            Agenda & Kegiatan Perpustakaan
          </h1>
          <div className="w-24 h-1.5 bg-brand-yellow mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg">
            Pantau jadwal kegiatan literasi, bedah buku, pelatihan e-resources, dan acara penting lainnya di Perpustakaan Mu&apos;allimin Muhammadiyah.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {agendas && agendas.length > 0 ? (
            agendas.map((agenda: AgendaItem) => (
              <Link href={`/agenda/${agenda.slug}`} key={agenda.id} className="flex flex-col md:flex-row gap-6 items-start p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white cursor-pointer group">
                
                <div className="bg-brand-green text-white rounded-xl p-5 text-center min-w-27.5 shrink-0 shadow-inner group-hover:bg-green-800 transition-colors">
                  <span className="block text-4xl font-bold leading-none mb-1">
                    {new Date(agenda.start_date).getDate()}
                  </span>
                  <span className="block text-sm font-medium uppercase tracking-wider text-brand-yellow">
                    {new Date(agenda.start_date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                
                <div className="grow pt-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 leading-snug group-hover:text-brand-green transition-colors">
                    {decodeHTMLEntities(agenda.title)}
                  </h3>
                  <p className="text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                    {stripHTML(decodeHTMLEntities(agenda.description || ''))}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-brand-green group-hover:text-brand-yellow transition-colors inline-flex items-center gap-1">
                      Lihat Detail Agenda <span aria-hidden="true">&rarr;</span>
                    </span>
                    {agenda.location && (
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {agenda.location}
                      </span>
                    )}
                  </div>
                </div>
                
              </Link>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-500 text-lg">Belum ada agenda kegiatan yang terdaftar.</p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}