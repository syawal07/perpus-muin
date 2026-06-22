import Image from "next/image";
import Link from "next/link";
import { NewsItem } from "@/types";

function decodeHTMLEntities(text: string) {
  return text.replace(/&amp;/g, '&').replace(/&#8217;/g, "'").replace(/&#8211;/g, "-").replace(/&quot;/g, '"');
}

function getCategoryColor(category: string) {
  if (!category) return 'bg-brand-yellow text-brand-green';
  const lowerCat = category.toLowerCase();
  if (lowerCat.includes('resensi')) return 'bg-orange-500 text-white';
  if (lowerCat.includes('literasi')) return 'bg-brand-yellow text-brand-green';
  if (lowerCat.includes('informasi')) return 'bg-green-600 text-white';
  if (lowerCat.includes('pengumuman')) return 'bg-red-500 text-white';
  return 'bg-brand-yellow text-brand-green';
}

export default function HomeNews({ news, storageUrl }: { news: NewsItem[], storageUrl: string }) {
  return (
    <section className="py-20 px-6 w-full bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-brand-green mb-2">Koleksi Literasi & Artikel</h2>
            <div className="w-24 h-1.5 bg-brand-yellow rounded-full"></div>
          </div>
          <Link href="/berita" className="text-brand-green font-bold hover:text-brand-yellow transition-colors hidden md:block mt-6 md:mt-0">
            Lihat Semua Koleksi &rarr;
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news && news.length > 0 ? (
            news.slice(0, 3).map((item) => (
              <Link href={`/berita/${item.slug}`} key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col cursor-pointer relative">
                <div className={`absolute top-4 right-4 z-20 text-xs font-extrabold uppercase px-3 py-1 rounded-full shadow-md ${getCategoryColor(item.category)}`}>
                  {item.category}
                </div>
                <div className="relative w-full h-56 bg-brand-green flex items-center justify-center overflow-hidden">
                  <span className="absolute z-0 text-brand-yellow font-bold opacity-30 text-2xl px-4 text-center tracking-widest uppercase">
                    PERPUSTAKAAN
                  </span>
                  {item.image && (
                    <Image 
                      src={`${storageUrl}/${item.image}`} 
                      alt={decodeHTMLEntities(item.title)} 
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 z-10"
                    />
                  )}
                </div>

                <div className="p-6 flex flex-col grow">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    {item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Baru saja'}
                  </span>
                  <h3 className="text-lg font-bold text-brand-green mb-3 line-clamp-2 leading-snug group-hover:text-green-700 transition-colors">
                    {decodeHTMLEntities(item.title)}
                  </h3>
                  <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-sm font-semibold text-brand-green group-hover:text-brand-yellow transition-colors">
                      Baca Selengkapnya &rarr;
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      {item.views || 0}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
             <p className="col-span-full text-center text-gray-400">Belum ada literasi diterbitkan.</p>
          )}
        </div>
        
        <div className="mt-8 text-center md:hidden">
            <Link href="/berita" className="inline-block border-2 border-brand-green text-brand-green px-6 py-2 rounded-full font-bold hover:bg-brand-green hover:text-white transition-colors">
              Lihat Semua Koleksi
            </Link>
        </div>
      </div>
    </section>
  );
}