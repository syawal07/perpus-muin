import Image from "next/image";
import Link from "next/link";
import { NewsItem, AgendaItem } from "@/types";
import StatsSection from "@/components/StatsSection";
import HomeAgenda from "@/components/HomeAgenda";
import HomeNews from "@/components/HomeNews";
import HomeVideo from "@/components/HomeVideo";
import StaffSection from "@/components/StaffSection";
import SearchBar from "@/components/SearchBar"; 

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
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Link 
                href="/profil?category=panduan-opac" 
                className="bg-brand-yellow text-brand-green px-8 py-3.5 rounded-full font-bold text-lg hover:bg-yellow-400 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                Panduan Pencarian
              </Link>
              <Link 
                href="/profil?category=sejarah" 
                className="bg-white/20 backdrop-blur-sm text-white border border-white/40 px-8 py-3.5 rounded-full font-bold text-lg hover:bg-white/30 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                Profil Perpustakaan
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:flex justify-end relative h-full w-full items-end pb-0 z-10">
             <div className="relative w-full max-w-sm h-auto drop-shadow-[0_20px_20px_rgba(0,0,0,0.6)]">
                <Image 
                  src={homePage?.hero_logo ? `${storageUrl}/${homePage.hero_logo}` : "https://muallimin.sch.id/wp-content/uploads/2021/01/logo-muallimin-2021-1.png"}
                  alt="Model Hero"
                  width={400}
                  height={400}
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

      <HomeNews news={news} storageUrl={storageUrl} />

      <StaffSection staffs={homeStaffs} />
      
      {allStaffs && allStaffs.length > 8 && (
        <section className="bg-gray-50 pb-20 flex justify-center -mt-15 relative z-10">
          <Link 
            href="/guru-tendik" 
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