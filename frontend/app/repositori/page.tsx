import Image from "next/image";
import Link from "next/link";

export interface DigitalCollection {
  id: number;
  title: string;
  slug: string;
  author: string;
  type: string;
  cover_image: string | null;
  views_count: number;
  created_at: string;
}

async function getCollections(page: number = 1) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  
  const res = await fetch(`${apiUrl}/api/digital-collections?page=${page}&limit=9`, { 
    next: { revalidate: 60 } 
  });
  
  if (!res.ok) {
    throw new Error(`HTTP Error Repositori: ${res.status}`);
  }

  const json = await res.json();
  return json.data;
}

export default async function RepositoriDigital({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const page = typeof resolvedParams.page === 'string' ? Number(resolvedParams.page) : 1;
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage';

  const paginatedResult = await getCollections(page);
  const collections: DigitalCollection[] = paginatedResult.data || [];
  const totalPages = paginatedResult.last_page || 1;

  const createPageURL = (pageNumber: number) => {
    return `/repositori?page=${pageNumber}`;
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <section className="bg-brand-green pt-40 pb-24 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] z-0"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-brand-yellow font-bold tracking-widest uppercase text-sm mb-4 block">
            Repositori Institusi
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Koleksi Digital
          </h1>
          <div className="w-24 h-1.5 bg-brand-yellow mx-auto mb-6 rounded-full shadow-sm"></div>
          <p className="text-lg md:text-xl text-gray-100 font-light max-w-2xl mx-auto">
            Eksplorasi karya tulis, modul pembelajaran, dan arsip publikasi internal sekolah.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 max-w-7xl mx-auto w-full mt-12 relative z-20">
        {collections.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-green-50 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
            </div>
            <h3 className="text-2xl font-bold text-brand-green mb-3">Belum Ada Koleksi</h3>
            <p className="text-gray-500 text-lg">Saat ini belum ada dokumen yang diunggah ke repositori.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((item) => (
              <Link href={`/repositori/${item.slug}`} key={item.id} className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden group transform hover:-translate-y-1">
                <div className="relative w-full h-64 bg-brand-green/5">
                  {item.cover_image ? (
                    <Image 
                      src={`${storageUrl}/${item.cover_image}`} 
                      alt={item.title} 
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-brand-green/30">
                      <svg className="w-24 h-24 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                      <span className="font-semibold text-sm">Dokumen Digital</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-brand-yellow text-brand-green text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    {item.type}
                  </div>
                </div>
                <div className="p-8 flex flex-col grow">
                  <h3 className="text-xl font-bold text-brand-green mb-3 line-clamp-2 leading-snug group-hover:text-green-700 transition-colors">{item.title}</h3>
                  <p className="text-gray-500 text-sm font-medium mb-6 flex-grow">Oleh: {item.author}</p>
                  <div className="flex justify-between items-center text-xs text-gray-400 font-bold border-t border-gray-50 pt-4">
                    <span>{new Date(item.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span className="flex items-center gap-1.5 text-brand-yellow">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      {item.views_count}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16">
            {page > 1 ? (
              <Link href={createPageURL(page - 1)} className="px-6 py-2.5 border-2 border-brand-green text-brand-green rounded-full font-bold hover:bg-brand-green hover:text-white transition-all shadow-sm">
                &larr; Sebelumnya
              </Link>
            ) : (
              <span className="px-6 py-2.5 border-2 border-gray-200 text-gray-400 rounded-full font-bold cursor-not-allowed">
                &larr; Sebelumnya
              </span>
            )}

            <span className="font-semibold text-gray-500">
              Hal {page} / {totalPages}
            </span>

            {page < totalPages ? (
              <Link href={createPageURL(page + 1)} className="px-6 py-2.5 border-2 border-brand-green text-brand-green rounded-full font-bold hover:bg-brand-green hover:text-white transition-all shadow-sm">
                Selanjutnya &rarr;
              </Link>
            ) : (
              <span className="px-6 py-2.5 border-2 border-gray-200 text-gray-400 rounded-full font-bold cursor-not-allowed">
                Selanjutnya &rarr;
              </span>
            )}
          </div>
        )}
      </section>
    </main>
  );
}