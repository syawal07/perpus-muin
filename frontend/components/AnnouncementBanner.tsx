"use client";

import Link from "next/link";

interface AnnouncementProps {
  text: string;
  link?: string | null;
}

export default function AnnouncementBanner({ text, link }: AnnouncementProps) {
  const content = (
    <div className="bg-brand-yellow text-brand-blue py-2 px-4 overflow-hidden relative group">
      <div className="flex whitespace-nowrap animate-marquee group-hover:pause-animation italic font-bold text-sm md:text-base">
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
      </div>
    </div>
  );

  if (link) {
    return (
      <Link href={link} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
        {content}
      </Link>
    );
  }

  return content;
}