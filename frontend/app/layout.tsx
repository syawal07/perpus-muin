import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"; 
import "./globals.css";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { SettingItem } from "@/types";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"], 
  display: "swap",
});

export const metadata: Metadata = {
  title: "Perpustakaan Digital Mu'allimin",
  description: "Pusat Layanan Literasi, Interaksi, dan Ekosistem Pengetahuan Digital",
};

async function getSettings(): Promise<SettingItem | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  const res = await fetch(`${apiUrl}/api/settings`, { next: { revalidate: 60 } });
  
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`HTTP Error Settings: ${res.status}`);
  }
  
  const json = await res.json();
  
  if (!json) {
    throw new Error("Invalid settings data received");
  }
  
  const data = json.data || json;
  return Array.isArray(data) ? data[0] : data;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="id">
      <body className={`${plusJakarta.className} text-gray-800 antialiased flex flex-col min-h-screen bg-gray-50`}>
        <Navbar settings={settings} />
        <main className="grow">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}