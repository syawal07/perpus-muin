import Image from "next/image";
import Link from "next/link";
import { SettingItem } from "@/types";

interface FooterProps {
  settings: SettingItem | SettingItem[] | null;
}

export default function Footer({ settings }: FooterProps) {
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8000';
  
  const currentSetting = Array.isArray(settings) ? settings[0] : settings;

  return (
    <footer className="bg-brand-green text-white pt-16 pb-8 border-t-4 border-brand-yellow">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div>
            {currentSetting?.footer_logo ? (
              <div className="mb-6 relative w-20 h-20 bg-white rounded-2xl p-2 shadow-lg">
                <Image 
                  src={`${storageUrl}/${currentSetting.footer_logo}`} 
                  alt="Logo Footer" 
                  fill 
                  className="object-contain p-2"
                  sizes="80px"
                />
              </div>
            ) : (
              <div className="w-16 h-16 bg-white text-brand-green font-bold flex items-center justify-center rounded-2xl mb-6 shadow-lg">
                LOGO
              </div>
            )}
            <h3 className="text-2xl font-bold mb-3 text-brand-yellow">
              {currentSetting?.site_name || "Perpustakaan Digital Mu'allimin"}
            </h3>
            <p className="text-gray-200 leading-relaxed text-sm">
              Pusat layanan literasi, inovasi, dan ekosistem pengetahuan digital adaptif bagi seluruh pemustaka dan civitas akademika.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-6 h-1 bg-brand-yellow rounded-full"></span> Tautan Cepat
            </h3>
            <ul className="space-y-3 text-gray-200">
              <li>
                <Link href="/profil?category=sejarah" className="hover:text-brand-yellow hover:translate-x-1 transition-all inline-block">
                  Profil & Sejarah
                </Link>
              </li>
              <li>
                <Link href="/berita" className="hover:text-brand-yellow hover:translate-x-1 transition-all inline-block">
                  Koleksi Literasi
                </Link>
              </li>
              <li>
                <Link href="/agenda" className="hover:text-brand-yellow hover:translate-x-1 transition-all inline-block">
                  Agenda Kegiatan
                </Link>
              </li>
              <li>
                <a href={currentSetting?.opac_url || "https://www.libsys-online.xyz/muallimin/opac/"} target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow hover:translate-x-1 transition-all inline-block">
                  Pencarian OPAC
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-6 h-1 bg-brand-yellow rounded-full"></span> Hubungi Kami
            </h3>
            <div className="space-y-4 text-gray-200 text-sm">
              <p className="flex items-start gap-3">
                <svg className="w-5 h-5 shrink-0 text-brand-yellow mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {currentSetting?.address || "Jl. Letjen S. Parman No. 68, Wirobrajan, Yogyakarta"}
              </p>
              <p className="flex items-center gap-3">
                <svg className="w-5 h-5 shrink-0 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                {currentSetting?.email || "perpustakaan@muallimin.sch.id"}
              </p>
              <p className="flex items-center gap-3">
                <svg className="w-5 h-5 shrink-0 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                {currentSetting?.phone || "(0274) 373322"}
              </p>
              {currentSetting?.operational_hours && (
                <p className="flex items-start gap-3 mt-4 pt-4 border-t border-green-800/50">
                  <svg className="w-5 h-5 shrink-0 text-brand-yellow mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Jam Layanan:<br/>{currentSetting.operational_hours}
                </p>
              )}
            </div>

            {(currentSetting?.instagram || currentSetting?.youtube) && (
              <div className="flex gap-4 mt-6">
                {currentSetting.instagram && (
                  <a href={currentSetting.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center hover:bg-brand-yellow hover:text-brand-green transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                )}
                {currentSetting.youtube && (
                  <a href={currentSetting.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center hover:bg-brand-yellow hover:text-brand-green transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                  </a>
                )}
              </div>
            )}
          </div>

        </div>

        <div className="border-t border-green-800/50 pt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} {currentSetting?.site_name || "Perpustakaan Digital Mu'allimin Yogyakarta"}.
        </div>
      </div>
    </footer>
  );
}