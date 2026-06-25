import Link from "next/link";
import { notFound } from "next/navigation";

export interface DigitalCollectionDetail {
  id: number;
  title: string;
  slug: string;
  author: string;
  type: string;
  description: string | null;
  cover_image: string | null;
  file_path: string;
  views_count: number;
  created_at: string;
}

async function getCollectionDetail(slug: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  
  try {
    const res = await fetch(`${apiUrl}/api/digital-collections/${slug}`, { 
      next: { revalidate: 60 } 
    });
    
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`HTTP Error Detail Repositori: ${res.status}`);
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function DetailRepositori({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage';

  const collection: DigitalCollectionDetail | null = await getCollectionDetail(slug);

  if (!collection) {
    notFound();
  }

  const pdfUrl = `${storageUrl}/${collection.file_path}`;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6 w-full">
        
        <Link 
          href="/repositori" 
          className="inline-flex items-center text-brand-green font-bold mb-8 hover:text-green-700 transition-colors"
        >
          &larr; Kembali ke Daftar Repositori
        </Link>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
          
          <div className="w-full lg:w-1/3 bg-gray-50 p-8 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col">
            <span className="inline-block bg-brand-yellow text-brand-green text-xs font-bold px-4 py-1.5 rounded-full mb-6 w-fit">
              {collection.type}
            </span>
            <h1 className="text-3xl font-extrabold text-brand-green mb-4 leading-tight">
              {collection.title}
            </h1>
            <p className="text-gray-500 font-medium mb-6">
              Karya Oleh: <span className="text-gray-800 font-bold">{collection.author}</span>
            </p>
            
            <div className="prose prose-sm max-w-none text-gray-600 mb-8 grow">
              {collection.description ? (
                <p className="whitespace-pre-wrap">{collection.description}</p>
              ) : (
                <p className="italic text-gray-400">Tidak ada deskripsi detail untuk dokumen ini.</p>
              )}
            </div>

            <div className="mt-auto border-t border-gray-200 pt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Dipublikasikan</span>
                <span className="font-semibold text-gray-800">
                  {new Date(collection.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total Dilihat</span>
                <span className="font-semibold text-gray-800">{collection.views_count} Kali</span>
              </div>
              <a 
                href={pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full mt-4 bg-brand-green text-white text-center py-3 rounded-xl font-bold hover:bg-green-700 transition-colors block"
              >
                Unduh PDF
              </a>
            </div>
          </div>

          <div className="w-full lg:w-2/3 h-[600px] lg:h-auto min-h-[800px] bg-gray-200 relative">
            <iframe 
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              className="absolute inset-0 w-full h-full border-0"
              title={collection.title}
            />
          </div>

        </div>
      </div>
    </main>
  );
}