import Image from "next/image";
import Link from "next/link";
import { NewsItem } from "@/types";
import SearchBar from "@/components/SearchBar";

function decodeHTMLEntities(text: string) {
  return text.replace(/&amp;/g, '&').replace(/&#8217;/g, "'").replace(/&#8211;/g, "-").replace(/&quot;/g, '"');
}

function getCategoryColor(category: string) {
  if (!category) return 'bg-brand-yellow text-brand-blue';
  const lowerCat = category.toLowerCase();
  if (lowerCat.includes('prestasi')) return 'bg-blue-600 text-white';
  if (lowerCat.includes('karir')) return 'bg-green-600 text-white';
  if (lowerCat.includes('kegiatan')) return 'bg-orange-500 text-white';
  if (lowerCat.includes('karya')) return 'bg-purple-600 text-white';
  return 'bg-brand-yellow text-brand-blue';
}

async function getNews(category?: string, page: number = 1) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const limit = 6;
  
  let endpoint = `/api/posts?page=${page}&limit=${limit}`;
  if (category) {
    endpoint += `&category=${category}`;
  }
  
  const res = await fetch(`${apiUrl}${endpoint}`, { next: { revalidate: 60 } });
  
  if (!res.ok) {
    throw new Error(`HTTP Error Daftar Berita: ${res.status}`);
  }

  const json = await res.json();
  
  if (!json || !json.data) {
    throw new Error("Invalid paginated data format received");
  }

  return json.data;
}

export default async function DaftarBerita({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const query = typeof resolvedParams.q === 'string' ? resolvedParams.q : '';
  const page = typeof resolvedParams.page === 'string' ? Number(resolvedParams.page) : 1;
  const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : '';
  
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8000';

  const paginatedResult = await getNews(category, page);
  let paginatedNews = paginatedResult.data || [];
  const totalPages = paginatedResult.last_page || 1;

  if (query) {
    const lowerQuery = query.toLowerCase();
    paginatedNews = paginatedNews.filter((item: NewsItem) => 
      item.title.toLowerCase().includes(lowerQuery)
    );
  }

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (category) params.set('category', category);
    params.set('page', pageNumber.toString());
    return `/berita?${params.toString()}`;
  };

  const getPageTitle = () => {
    if (!category) return "Kumpulan Berita & Artikel";
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    return `Berita ${categoryName}`;
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <section className="bg-brand-blue pt-40 pb-24 px-6 text-center text-white relative overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] z-0"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-brand-yellow font-bold tracking-widest uppercase text-sm mb-4 block">
            Pusat Informasi
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight drop-shadow-md">
            {getPageTitle()}
          </h1>
          <div className="w-24 h-1.5 bg-brand-yellow mx-auto mb-6 rounded-full shadow-sm"></div>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            {category 
              ? `Kumpulan informasi dan artikel seputar ${category} di Madrasah Mu'allimin.` 
              : "Ikuti perkembangan terbaru, prestasi, dan kegiatan seputar Madrasah Mu'allimin."}
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 w-full">
        <div className="max-w-7xl mx-auto">
          
          <div className="relative -mt-10 z-20 mb-16 max-w-3xl mx-auto px-4 sm:px-0">
            <div className="bg-white px-6 py-4 md:px-8 md:py-5 rounded-3xl shadow-2xl shadow-blue-900/10 border border-gray-100 flex flex-col items-center">
              <div className="w-full">
                <SearchBar />
              </div>
              <div className="mt-3 flex items-center gap-3 text-brand-blue font-extrabold tracking-widest uppercase text-xs md:text-sm opacity-90">
                <span className="w-8 h-0.5 bg-brand-yellow rounded-full"></span>
                #BergerakBerdampak
                <span className="w-8 h-0.5 bg-brand-yellow rounded-full"></span>
              </div>
            </div>
          </div>

          {paginatedNews.length === 0 && !query && (
             <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
               <div className="w-20 h-20 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-6">
                 <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 2v4h4M8 13h8M8 17h8M8 9h2" /></svg>
               </div>
               <h3 className="text-2xl font-bold text-brand-blue mb-3">Belum Ada Berita</h3>
               <p className="text-gray-500 text-lg">Saat ini belum ada artikel untuk kategori ini.</p>
             </div>
          )}

          {paginatedNews.length === 0 && query && (
            <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-brand-blue mb-3">Pencarian Tidak Ditemukan</h3>
              <p className="text-gray-500 mb-8 text-lg">Kami tidak menemukan berita dengan kata kunci &quot;<span className="font-semibold text-brand-blue">{query}</span>&quot;.</p>
              <Link href={category ? `/berita?category=${category}` : "/berita"} className="inline-block bg-brand-yellow text-brand-blue px-8 py-3.5 rounded-full font-bold hover:bg-yellow-400 transition-all shadow-md hover:-translate-y-1">
                Reset Pencarian
              </Link>
            </div>
          )}

          {paginatedNews.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedNews.map((item: NewsItem) => (
                <Link href={`/berita/${item.slug}`} key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col cursor-pointer relative transform hover:-translate-y-1">
                  
                  <div className={`absolute top-4 right-4 z-20 text-xs font-extrabold uppercase px-4 py-1.5 rounded-full shadow-md ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </div>

                  <div className="relative w-full h-60 bg-brand-blue flex items-center justify-center overflow-hidden">
                    <span className="absolute z-0 text-brand-yellow font-bold opacity-40 text-2xl px-4 text-center tracking-widest uppercase">Mu&apos;allimin</span>
                    {item.image && (
                      <Image 
                        src={`${storageUrl}/${item.image}`} 
                        alt={decodeHTMLEntities(item.title)} 
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 z-10"
                      />
                    )}
                  </div>

                  <div className="p-6 flex flex-col grow">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                      {item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Baru saja'}
                    </span>
                    <h3 className="text-xl font-bold text-brand-blue mb-4 line-clamp-2 leading-snug group-hover:text-blue-700 transition-colors">
                      {decodeHTMLEntities(item.title)}
                    </h3>
                    <div className="mt-auto pt-5 border-t border-gray-50 flex items-center justify-between">
                      <span className="text-sm font-bold text-brand-blue group-hover:text-brand-yellow transition-colors flex items-center gap-2">
                        Baca Selengkapnya
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-20">
              
              {page > 1 ? (
                <Link href={createPageURL(page - 1)} className="px-8 py-3.5 border-2 border-brand-blue text-brand-blue rounded-full font-bold hover:bg-brand-blue hover:text-white transition-all shadow-sm">
                  &larr; Sebelumnya
                </Link>
              ) : (
                <span className="px-8 py-3.5 border-2 border-gray-100 text-gray-300 rounded-full font-bold cursor-not-allowed">
                  &larr; Sebelumnya
                </span>
              )}

              <span className="font-semibold text-gray-500 bg-white px-8 py-3.5 rounded-full shadow-sm border border-gray-100">
                Halaman <span className="text-brand-blue font-bold">{page}</span> dari {totalPages}
              </span>

              {page < totalPages ? (
                <Link href={createPageURL(page + 1)} className="px-8 py-3.5 border-2 border-brand-blue text-brand-blue rounded-full font-bold hover:bg-brand-blue hover:text-white transition-all shadow-sm">
                  Selanjutnya &rarr;
                </Link>
              ) : (
                <span className="px-8 py-3.5 border-2 border-gray-100 text-gray-300 rounded-full font-bold cursor-not-allowed">
                  Selanjutnya &rarr;
                </span>
              )}

            </div>
          )}

        </div>
      </section>
    </main>
  );
}