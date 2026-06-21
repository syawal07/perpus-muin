import Image from "next/image";
import Link from "next/link";
import { DirectorItem } from "@/types";

export default function HomeDirectors({ directors, storageUrl }: { directors: DirectorItem[], storageUrl: string }) {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto text-center w-full">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-brand-blue mb-3">Direktur dari Masa ke Masa</h2>
        <div className="w-24 h-1.5 bg-brand-yellow mx-auto"></div>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Menelusuri jejak kepemimpinan tokoh-tokoh hebat yang telah mendedikasikan hidupnya untuk Madrasah Mu&apos;allimin.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {directors.length > 0 ? (
          directors.slice(0, 4).map((dir) => (
            <div key={dir.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all">
              <div className="relative w-full h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
                {dir.image ? (
                  <Image 
                    src={`${storageUrl}/${dir.image}`} 
                    alt={dir.name} 
                    fill 
                    loading="lazy"
                    quality={60}
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-brand-blue opacity-30">
                    <span className="font-medium text-sm">Tanpa Foto</span>
                  </div>
                )}
              </div>
              <div className="p-5 text-center">
                <h3 className="text-base font-bold text-brand-blue mb-1 leading-tight">{dir.name}</h3>
                <p className="text-xs font-semibold text-brand-yellow">
                  {dir.start_year} - {dir.end_year || 'Sekarang'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">Belum ada data direktur.</p>
        )}
      </div>

      <div className="mt-10">
        <Link href="/profil?category=sejarah" className="inline-block border-2 border-brand-blue text-brand-blue px-8 py-3 rounded-full font-bold hover:bg-brand-blue hover:text-white transition-colors">
          Lihat Profil & Sejarah Lengkap
        </Link>
      </div>
    </section>
  );
}