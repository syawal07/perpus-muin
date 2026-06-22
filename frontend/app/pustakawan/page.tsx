import Link from "next/link";
import StaffSection from "@/components/StaffSection";

async function getStaffData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  const res = await fetch(`${apiUrl}/api/staffs`, { next: { revalidate: 60 } });
  
  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`);
  }
  
  const json = await res.json();
  
  if (!json || !json.data) {
    throw new Error("Invalid data format received");
  }
  
  return json.data;
}

export default async function PustakawanPage() {
  const staffs = await getStaffData();

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-brand-green pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-yellow/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <nav className="flex mb-4 text-white/60 text-sm font-medium gap-2">
            <Link href="/" className="hover:text-brand-yellow transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-brand-yellow">Pustakawan & Staf</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Daftar Pustakawan & Staf Perpustakaan</h1>
          <p className="text-white/80 mt-4 max-w-2xl text-lg">
            Profil lengkap seluruh pustakawan, tenaga ahli, dan staf pengelola yang berdedikasi melayani pemustaka di Perpustakaan Mu&apos;allimin Muhammadiyah Yogyakarta.
          </p>
        </div>
      </div>

      {/* Komponen StaffSection ini otomatis akan menggunakan filter dan tampilan baru yang sudah kita update sebelumnya */}
      <StaffSection staffs={staffs} showFilters={true} title="" />
    </main>
  );
}