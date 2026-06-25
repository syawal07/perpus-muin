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

interface HomeRepositoriProps {
  collections: DigitalCollection[];
  storageUrl: string;
}

export default function HomeRepositori({ collections, storageUrl }: HomeRepositoriProps) {
  if (!collections || collections.length === 0) return null;

  return (
    <section className="py-20 px-6 bg-white relative z-20">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <span className="text-brand-green font-bold tracking-widest uppercase text-sm mb-2 block">
              Karya & Dokumen
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              Repositori Digital Terkini
            </h2>
          </div>
          <Link
            href="/repositori"
            className="hidden md:inline-flex items-center gap-2 text-brand-green font-bold hover:text-brand-yellow transition-colors"
          >
            Lihat Semua Koleksi
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

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
                    <svg className="w-24 h-24 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-brand-yellow text-brand-green text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  {item.type}
                </div>
              </div>
              
              <div className="p-8 flex flex-col grow">
                <h3 className="text-xl font-bold text-brand-green mb-3 line-clamp-2 leading-snug group-hover:text-green-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm font-medium mb-6 grow">
                  Oleh: {item.author}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-400 font-bold border-t border-gray-50 pt-4">
                  <span>{new Date(item.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span className="flex items-center gap-1.5 text-brand-yellow">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {item.views_count}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link
            href="/repositori"
            className="inline-flex items-center gap-2 text-brand-green font-bold hover:text-brand-yellow transition-colors"
          >
            Lihat Semua Koleksi
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}