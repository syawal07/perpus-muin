import Image from "next/image";
import { DirectorItem, ProfileItem } from "@/types";

async function getProfileByCategory(category: string): Promise<ProfileItem | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  const res = await fetch(`${apiUrl}/api/profiles?category=${category}`, { next: { revalidate: 60 } });
  
  if (!res.ok) {
    throw new Error(`HTTP Error Profil Category: ${res.status}`);
  }
  
  const json = await res.json();
  
  if (!json || !json.data) {
    throw new Error("Invalid data format received inside profiles api");
  }
  
  return json.data && json.data.length > 0 ? json.data[0] : null;
}

async function getDirectors(): Promise<DirectorItem[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  const res = await fetch(`${apiUrl}/api/directors`, { next: { revalidate: 60 } });
  
  if (!res.ok) {
    throw new Error(`HTTP Error Directors: ${res.status}`);
  }
  
  const json = await res.json();
  
  if (!json || !json.data) {
    throw new Error("Invalid data format received inside directors api");
  }
  
  return json.data || json;
}

export default async function ProfilMadrasah({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : 'sejarah';
  
  const profileData = await getProfileByCategory(category);
  const directors = category === 'sejarah' ? await getDirectors() : [];
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8000';
  
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-brand-blue py-24 px-6 text-center text-white relative overflow-hidden flex flex-col items-center justify-center min-h-[60vh]">
        {profileData?.image ? (
          <div className="absolute inset-0 z-0">
            <Image 
              src={`${storageUrl}/${profileData.image}`} 
              alt={profileData.title || 'Background Profil'} 
              fill 
              className="object-cover opacity-30 mix-blend-overlay"
              priority
            />
            <div className="absolute inset-0 bg-brand-blue/80 mix-blend-multiply"></div>
          </div>
        ) : (
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] z-0"></div>
        )}
        
        <div className="max-w-4xl mx-auto relative z-10 pt-10">
          <span className="text-brand-yellow font-bold tracking-widest uppercase text-sm mb-4 block">
            Profil Mu&apos;allimin
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight capitalize">
            {profileData?.title || category.replace('-', ' ')}
          </h1>
          <div className="w-24 h-1.5 bg-brand-yellow mx-auto mb-6 rounded-full"></div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-4xl mx-auto min-h-[40vh]">
        {profileData ? (
          <>
            {profileData.content && (
              <div 
                className="prose prose-lg md:prose-xl max-w-none text-gray-800 
                [&_p]:mb-6! [&_p]:mt-0! [&_p]:leading-relaxed! [&_p]:text-justify!
                prose-headings:text-brand-blue prose-headings:font-bold prose-headings:text-left
                prose-strong:text-brand-blue prose-img:rounded-3xl prose-img:mx-auto"
                dangerouslySetInnerHTML={{ __html: profileData.content }}
              />
            )}
            
            {profileData.file_pdf && (
              <div className="mt-16 flex justify-center">
                <a 
                  href={`${storageUrl}/${profileData.file_pdf}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-brand-blue text-white px-8 py-4 rounded-full font-bold hover:bg-blue-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Unduh Dokumen PDF
                </a>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-3xl border border-gray-100 shadow-sm">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">Konten Belum Tersedia</h3>
            <p className="text-gray-500">Admin belum mengunggah data untuk kategori ini.</p>
          </div>
        )}
      </section>

      {category === 'sejarah' && (
        <section className="bg-gray-50 py-24 px-6 border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">Direktur dari Masa ke Masa</h2>
              <div className="w-24 h-1.5 bg-brand-yellow mx-auto mb-6 rounded-full"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Penghormatan kepada para pimpinan yang telah menakhodai perjalanan Madrasah Mu&apos;allimin Muhammadiyah dari generasi ke generasi.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {directors && directors.length > 0 ? (
                directors.map((director: DirectorItem) => (
                  <div key={director.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
                      {director.image ? (
                        <Image 
                          src={`${storageUrl}/${director.image}`} 
                          alt={director.name}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-blue-50 text-brand-blue">
                          <span className="opacity-50 font-medium text-sm">Belum ada foto</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-brand-blue mb-1 leading-snug">{director.name}</h3>
                      <p className="text-sm font-bold text-brand-yellow">
                        {director.start_year} - {director.end_year ? director.end_year : 'Sekarang'}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-10 bg-white rounded-2xl border border-gray-100">
                  Belum ada data direktur yang terdaftar.
                </div>
              )}
            </div>
          </div>
        </section>
      )}

    </main>
  );
}