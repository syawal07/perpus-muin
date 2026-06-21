"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageItem } from "@/types";

function AnimatedNumber({ value }: { value: string | null }) {
  const [count, setCount] = useState("0");

  useEffect(() => {
    if (!value) return;

    const match = value.match(/^(\D*)(\d+)(\D*)$/);
    if (!match) {
      requestAnimationFrame(() => {
        setCount(value);
      });
      return;
    }

    const prefix = match[1] || "";
    const target = parseInt(match[2], 10);
    const suffix = match[3] || "";

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const animate = () => {
      start += increment;
      if (start < target) {
        setCount(prefix + Math.floor(start) + suffix);
        requestAnimationFrame(animate);
      } else {
        setCount(prefix + target + suffix);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <span>{count}</span>;
}

export default function StatsSection({ data }: { data: PageItem | null }) {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto bg-white relative z-20 -mt-10 rounded-2xl shadow-sm border border-gray-50">
      <div className="mb-10 inline-block">
        <h2 className="text-3xl font-bold text-brand-blue relative pb-2">
          Mu&apos;allimin dalam angka
          <span className="absolute bottom-0 left-0 w-full h-1.5 bg-brand-yellow"></span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-brand-blue rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-lg hover:-translate-y-2 transition-transform duration-300">
          <p className="text-5xl font-extrabold text-brand-yellow mb-4">
            <AnimatedNumber value={data?.stat_1_value || "1918"} />
          </p>
          <h3 className="text-white font-bold text-lg">
            {data?.stat_1_title || "Mendidik Sejak"}
          </h3>
        </div>

        <div className="bg-brand-blue rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-lg hover:-translate-y-2 transition-transform duration-300">
          <p className="text-5xl font-extrabold text-brand-yellow mb-4">
            <AnimatedNumber value={data?.stat_2_value || "1918"} />
          </p>
          <h3 className="text-white font-bold text-lg">
            {data?.stat_2_title || "Tahun Berdiri"}
          </h3>
        </div>

        <div className="bg-brand-blue rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-lg hover:-translate-y-2 transition-transform duration-300">
          <p className="text-5xl font-extrabold text-brand-yellow mb-4">
            <AnimatedNumber value={data?.stat_3_value || "1500+"} />
          </p>
          <h3 className="text-white font-bold text-lg">
            {data?.stat_3_title || "Jumlah Pelajar"}
          </h3>
        </div>

        <div className="bg-brand-blue rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-lg hover:-translate-y-2 transition-transform duration-300">
          <p className="text-5xl font-extrabold text-brand-yellow mb-4">
            <AnimatedNumber value={data?.stat_4_value || "1500+"} />
          </p>
          <h3 className="text-white font-bold text-lg">
            {data?.stat_4_title || "Komunitas Siswa"}
          </h3>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          href={data?.stats_link || "/profil"}
          className="bg-brand-blue text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-800 transition-colors shadow-md hover:shadow-lg"
        >
          Baca Selengkapnya
        </Link>
      </div>
    </section>
  );
}