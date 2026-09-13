import Image from "next/image";
import Link from "next/link";
import { NewsItem, AgendaItem } from "@/types";
import StatsSection from "@/components/StatsSection";
import HomeAgenda from "@/components/HomeAgenda";
import HomeNews from "@/components/HomeNews";
import HomeVideo from "@/components/HomeVideo";
import HomeRepositori from "@/components/HomeRepositori";
import StaffSection from "@/components/StaffSection";
import SearchBar from "@/components/SearchBar"; 
export const dynamic = 'force-dynamic';


async function getData(endpoint: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  try {
    const res = await fetch(`${apiUrl}/api${endpoint}`, { next: { revalidate: 60 } });
    
    if (!res.ok) {
      console.warn(`[API Warning] Endpoint ${endpoint} membalas dengan status: ${res.status}`);
      return null;
    }
    
    const json = await res.json();
    return json.data || json; 
  } catch (error) {
    console.error(`[API Fetch Failed] Gagal menghubungi ${endpoint}:`, error);
    return null;
  }
}

export default async function Home() {
  const rawNews = await getData('/posts') || [];
  const news: NewsItem[] = Array.isArray(rawNews) ? rawNews : (rawNews.data || []);
  
  const agendas: AgendaItem[] = await getData('/agendas') || [];
  
  const rawVideos = await getData('/videos?limit=3') || [];
  const videos = Array.isArray(rawVideos) ? rawVideos : (rawVideos.data || []);

  const rawCollections = await getData('/digital-collections?limit=3') || [];
  const collections = Array.isArray(rawCollections) ? rawCollections : (rawCollections.data || []);

  const allStaffs = await getData('/staffs') || [];
  const homeStaffs = Array.isArray(allStaffs) ? allStaffs.slice(0, 8) : []; 

  const homePage = await getData('/pages/beranda') || {};
  const settings = await getData('/settings') || {};
  const currentSetting = Array.isArray(settings) ? settings[0] : settings;
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8000';

  return (
    <main className="min-h-screen bg-white flex flex-col">
     <section className="relative w-full min-h-[90vh] flex items-center pt-24 overflow-hidden bg-brand-green">
        <div className="absolute inset-0 z-0">
          <Image 
            src={homePage?.image ? `${storageUrl}/${homePage.image}` : "https://muallimin.sch.id/wp-content/uploads/2023/07/DJI_0435-scaled.jpg"} 
            alt="Background Hero" 
            fill 
            className="object-cover"
            priority
            unoptimized={true}
          />
          <div className="absolute inset-0 bg-brand-green/40 bg-linear-to-r from-brand-green/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 h-full items-center">
          <div className="lg:col-span-8 flex flex-col items-start pb-10 pt-10 z-20">
            <span className="text-brand-yellow font-bold tracking-widest uppercase text-sm md:text-base mb-4 drop-shadow-md">
              Selamat Datang di
            </span>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg tracking-wide">
              {homePage?.hero_title || currentSetting?.site_name || "PERPUSTAKAAN DIGITAL MU'ALLIMIN"}
            </h1>
            <p className="text-lg md:text-2xl text-gray-100 mb-8 max-w-3xl leading-relaxed font-light drop-shadow-md">
              {homePage?.hero_subtitle || "Pusat layanan literasi, inovasi, dan ekosistem pengetahuan digital adaptif bagi pemustaka."}
            </p>
            
            <div className="w-full">
              <SearchBar opacUrl={currentSetting?.opac_url} />
            </div>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
              <a 
                href={currentSetting?.opac_url || "https://www.libsys-online.xyz/muallimin/opac/"}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-brand-yellow text-brand-green px-6 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-400 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                Katalog OPAC
              </a>
              
              <a 
                href="https://sites.google.com/muallimin.sch.id/perpustakaandigital/"
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md text-white border border-white/40 px-6 py-4 rounded-2xl font-bold text-lg hover:bg-white/30 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                Perpus Digital
              </a>

              <Link 
                href="/repositori" 
                className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md text-white border border-white/40 px-6 py-4 rounded-2xl font-bold text-lg hover:bg-white/30 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                Karya Guru
              </Link>
            </div>
          </div>

      <div className="lg:col-span-4 hidden lg:flex justify-end relative h-full w-full items-end pb-0 z-10">
             <div className="relative w-full max-w-lg xl:max-w-xl h-auto drop-shadow-[0_20px_20px_rgba(0,0,0,0.6)]">
                <Image 
                  src={homePage?.hero_logo ? `${storageUrl}/${homePage.hero_logo}` : "https://muallimin.sch.id/wp-content/uploads/2021/01/logo-muallimin-2021-1.png"}
                  alt="Model Hero"
                  width={600}
                  height={600}
                  className="object-contain object-bottom"
                  priority
                  unoptimized={true}
                />
             </div>
          </div>
        </div>
      </section>

      <StatsSection data={homePage} />

      <HomeAgenda agendas={agendas} />

      <HomeVideo videos={videos} storageUrl={storageUrl} />

      <HomeRepositori collections={collections} storageUrl={storageUrl} />

      <HomeNews news={news} storageUrl={storageUrl} />

      <StaffSection staffs={homeStaffs} />
      
      {allStaffs && allStaffs.length > 8 && (
        <section className="bg-gray-50 pb-20 flex justify-center -mt-15 relative z-10">
          <Link 
            href="/pustakawan" 
            className="inline-flex items-center gap-2 bg-white border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white px-8 py-3 rounded-full font-bold transition-all shadow-sm hover:shadow-md"
          >
            Lihat Semua Pustakawan & Staf
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </section>
      )}

    </main>
  );
}