import Link from "next/link";
import { AgendaItem } from "@/types";

function decodeHTMLEntities(text: string) {
  return text.replace(/&amp;/g, '&').replace(/&#8217;/g, "'").replace(/&#8211;/g, "-").replace(/&quot;/g, '"');
}

function stripHTML(html: string) {
  return html ? html.replace(/<[^>]*>?/gm, '') : '';
}

export default function HomeAgenda({ agendas }: { agendas: AgendaItem[] }) {
  return (
    <section className="py-20 px-6 w-full bg-white border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-brand-blue mb-3">Agenda Kegiatan</h2>
            <div className="w-24 h-1.5 bg-brand-yellow rounded-full"></div>
          </div>
          <Link href="/agenda" className="text-brand-blue font-bold hover:text-brand-yellow transition-colors hidden md:block mt-6 md:mt-0">
            Lihat Semua Agenda &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agendas.length > 0 ? (
            agendas.slice(0, 3).map((agenda) => (
              <Link href={`/agenda/${agenda.slug}`} key={agenda.id} className="flex gap-6 items-start p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white cursor-pointer group">
                <div className="bg-brand-blue text-white rounded-xl p-4 text-center min-w-20 shrink-0 shadow-inner group-hover:bg-blue-800 transition-colors">
                  <span className="block text-3xl font-bold leading-none">
                    {new Date(agenda.start_date).getDate()}
                  </span>
                  <span className="block text-sm font-medium mt-1 uppercase tracking-wider text-brand-yellow">
                    {new Date(agenda.start_date).toLocaleDateString('id-ID', { month: 'short' })}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 leading-snug group-hover:text-brand-blue transition-colors line-clamp-2">
                    {decodeHTMLEntities(agenda.title)}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {stripHTML(decodeHTMLEntities(agenda.description || ''))}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">Belum ada agenda terdekat.</p>
          )}
        </div>
        
        <div className="mt-8 text-center md:hidden">
            <Link href="/agenda" className="inline-block border-2 border-brand-blue text-brand-blue px-6 py-2 rounded-full font-bold hover:bg-brand-blue hover:text-white transition-colors">
              Lihat Semua Agenda
            </Link>
        </div>
      </div>
    </section>
  );
}