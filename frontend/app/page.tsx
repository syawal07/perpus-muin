import Image from "next/image";
import Link from "next/link";
import { NewsItem, AgendaItem, DirectorItem } from "@/types";
import StatsSection from "@/components/StatsSection";
import HomeAgenda from "@/components/HomeAgenda";
import HomeNews from "@/components/HomeNews";
import HomeDirectors from "@/components/HomeDirectors";
import StaffSection from "@/components/StaffSection"; 

async function getData(endpoint: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  const res = await fetch(`${apiUrl}/api${endpoint}`, { next: { revalidate: 60 } });
  
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`HTTP Error fetch ${endpoint}: ${res.status}`);
  }
  
  const json = await res.json();
  
  if (!json) {
    throw new Error(`Invalid data format received from ${endpoint}`);
  }
  
  return json.data || json; 
}

export default async function Home() {
  const rawNews = await getData('/posts') || [];
  const news: NewsItem[] = Array.isArray(rawNews) ? rawNews : (rawNews.data || []);
  
  const agendas: AgendaItem[] = await getData('/agendas') || [];
  const directors: DirectorItem[] = await getData('/directors') || [];
  
  const allStaffs = await getData('/staffs') || [];
  const homeStaffs = allStaffs.slice(0, 8); 

  const homePage = await getData('/pages/beranda') || {};
  const settings = await getData('/settings') || {};
  const currentSetting = Array.isArray(settings) ? settings[0] : settings;
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8000';

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <section className="relative w-full min-h-[90vh] flex items-end pt-24 overflow-hidden bg-brand-blue">
        <div className="absolute inset-0 z-0">
          <Image 
            src={homePage?.image ? `${storageUrl}/${homePage.image}` : "https://muallimin.sch.id/wp-content/uploads/2023/07/DJI_0435-scaled.jpg"} 
            alt="Background Hero" 
            fill 
            className="object-cover"
            priority
            unoptimized={true}
          />
          <div className="absolute inset-0 bg-brand-blue/20 bg-linear-to-r from-brand-blue/50 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-360 mx-auto px-8 lg:px-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 h-full items-end">
          <div className="lg:col-span-7 flex flex-col items-start pb-20 lg:pb-32 pt-10 z-20">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg tracking-wide">
              {homePage?.hero_title || currentSetting?.site_name || "MADRASAH MU'ALLIMIN MUHAMMADIYAH YOGYAKARTA"}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed font-light drop-shadow-md">
              {homePage?.hero_subtitle || "Menyiapkan kader ulama, pendidik, dan pemimpin bangsa yang berkemajuan."}
            </p>
            <Link 
              href="/profil?category=visi-misi" 
              className="bg-brand-yellow text-brand-blue px-8 py-3.5 rounded-full font-bold text-lg hover:bg-yellow-400 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              Profil Madrasah 
            </Link>
          </div>

          <div className="lg:col-span-5 hidden md:flex justify-end lg:justify-center xl:justify-end relative h-full w-full lg:pr-8 z-10">
             <div className="relative w-full max-w-112.5 lg:max-w-150 xl:max-w-175 h-100 lg:h-137.5 xl:h-162.5 drop-shadow-[0_20px_20px_rgba(0,0,0,0.6)]">
                <Image 
                  src={homePage?.hero_logo ? `${storageUrl}/${homePage.hero_logo}` : "https://muallimin.sch.id/wp-content/uploads/2021/01/logo-muallimin-2021-1.png"}
                  alt="Model Hero"
                  fill
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

      <HomeNews news={news} storageUrl={storageUrl} />

      <HomeDirectors directors={directors} storageUrl={storageUrl} />

      <StaffSection staffs={homeStaffs} />
      
      {allStaffs.length > 8 && (
        <section className="bg-gray-50 pb-20 flex justify-center -mt-15 relative z-10">
          <Link 
            href="/guru-tendik" 
            className="inline-flex items-center gap-2 bg-white border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-8 py-3 rounded-full font-bold transition-all shadow-sm hover:shadow-md"
          >
            Lihat Semua Guru & Tendik
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </section>
      )}

    </main>
  );
}