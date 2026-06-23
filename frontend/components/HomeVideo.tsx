import Link from "next/link";
import Image from "next/image";

export interface VideoItem {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  thumbnail: string;
  video_path: string;
  created_at: string;
}

export default function HomeVideo({ videos, storageUrl }: { videos: VideoItem[], storageUrl: string }) {
  if (!videos || videos.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-white w-full relative z-20">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-1 bg-brand-yellow rounded-full"></span>
              <h4 className="text-brand-green font-bold tracking-widest uppercase text-sm">Galeri Visual</h4>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Video Publikasi Terbaru
            </h2>
          </div>
          <Link href="/video" className="hidden md:flex items-center gap-2 text-brand-green font-bold hover:text-brand-yellow transition-colors group">
            Lihat Semua Video
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video) => (
            <Link href={`/video/${video.slug}`} key={video.id} className="bg-gray-50 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col cursor-pointer relative transform hover:-translate-y-1">
              
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
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  {new Date(video.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <h3 className="text-xl font-bold text-brand-green line-clamp-2 leading-snug group-hover:text-green-700 transition-colors">
                  {video.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center md:hidden">
          <Link href="/video" className="inline-flex items-center gap-2 bg-brand-green text-white px-8 py-3 rounded-full font-bold shadow-sm hover:bg-green-800 transition-colors">
            Lihat Semua Video
          </Link>
        </div>

      </div>
    </section>
  );
}