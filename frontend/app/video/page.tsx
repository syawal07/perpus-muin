import Image from "next/image";
import Link from "next/link";

export interface VideoItem {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  thumbnail: string;
  video_path: string;
  created_at: string;
}

async function getVideos(page: number = 1) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  const limit = 6;
  
  const res = await fetch(`${apiUrl}/api/videos?page=${page}&limit=${limit}`, { 
    next: { revalidate: 60 } 
  });
  
  if (!res.ok) {
    throw new Error(`HTTP Error Daftar Video: ${res.status}`);
  }

  const json = await res.json();
  return json.data;
}

export default async function DaftarVideo({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const page = typeof resolvedParams.page === 'string' ? Number(resolvedParams.page) : 1;
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage';

  const paginatedResult = await getVideos(page);
  const videos: VideoItem[] = paginatedResult.data || [];
  const totalPages = paginatedResult.last_page || 1;

  const createPageURL = (pageNumber: number) => {
    return `/video?page=${pageNumber}`;
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <section className="bg-brand-green pt-40 pb-24 px-6 text-center text-white relative overflow-hidden flex flex-col items-center justify-center min-h-[40vh]">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] z-0"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-brand-yellow font-bold tracking-widest uppercase text-sm mb-4 block">
            Galeri Visual
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight drop-shadow-md">
            Video Publikasi
          </h1>
          <div className="w-24 h-1.5 bg-brand-yellow mx-auto mb-6 rounded-full shadow-sm"></div>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto font-light leading-relaxed">
            Saksikan berbagai cuplikan kegiatan, dokumenter, dan panduan literasi visual dari Perpustakaan Mu&apos;allimin.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 w-full mt-12 relative z-20">
        <div className="max-w-7xl mx-auto">
          
          {videos.length === 0 ? (
             <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
               <div className="w-20 h-20 bg-green-50 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                 <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
               </div>
               <h3 className="text-2xl font-bold text-brand-green mb-3">Belum Ada Video</h3>
               <p className="text-gray-500 text-lg">Saat ini belum ada video publikasi yang diunggah.</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => (
                <Link href={`/video/${video.slug}`} key={video.id} className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col cursor-pointer relative transform hover:-translate-y-1">
                  
                  <div className="relative w-full h-56 bg-brand-green flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-20 flex items-center justify-center">
                       <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center text-brand-green shadow-lg transform group-hover:scale-110 transition-transform">
                          <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                       </div>
                    </div>

                    {video.thumbnail && (
                      <Image 
                        src={`${storageUrl}/${video.thumbnail}`} 
                        alt={video.title} 
                        fill
                        unoptimized={true}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 z-10"
                      />
                    )}
                  </div>

                  <div className="p-6 flex flex-col grow">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                      {new Date(video.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <h3 className="text-xl font-bold text-brand-green mb-3 line-clamp-2 leading-snug group-hover:text-green-700 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-gray-500 line-clamp-2 text-sm mb-4">
                      {video.description || "Saksikan tayangan lengkapnya pada halaman detail video."}
                    </p>
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

        </div>
      </section>
    </main>
  );
}