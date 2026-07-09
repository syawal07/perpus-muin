import Link from "next/link";
import { notFound } from "next/navigation";

export interface VideoItem {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  thumbnail: string;
  video_path: string;
  created_at: string;
}

async function getVideoDetail(slug: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  
  try {
    const res = await fetch(`${apiUrl}/api/videos/${slug}`, { 
      next: { revalidate: 60 } 
    });
    
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`HTTP Error Detail Video: ${res.status}`);
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function DetailVideo({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage';

  const video: VideoItem | null = await getVideoDetail(slug);

  if (!video) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 w-full">
        
        <Link 
          href="/video" 
          className="inline-flex items-center text-brand-green font-bold mb-8 hover:text-green-700 transition-colors"
        >
          &larr; Kembali ke Daftar Video
        </Link>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          
          <div className="w-full bg-black aspect-video relative flex items-center justify-center">
            <video 
              controls 
              controlsList="nodownload"
              poster={`${storageUrl}/${video.thumbnail}`}
              preload="metadata"
              playsInline
              className="w-full h-full object-contain"
            >
              <source src={`${storageUrl}/${video.video_path}`} type="video/mp4" />
              <source src={`${storageUrl}/${video.video_path}`} type="video/webm" />
            </video>
          </div>

          <div className="p-8 md:p-12">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 block">
              Dipublikasikan pada: {new Date(video.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-green mb-6 leading-tight">
              {video.title}
            </h1>
            
            <div className="prose prose-lg max-w-none text-gray-600">
              {video.description ? (
                <p className="whitespace-pre-wrap leading-relaxed">{video.description}</p>
              ) : (
                <p className="italic text-gray-400">Tidak ada deskripsi untuk video ini.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}