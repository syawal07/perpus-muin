import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { NewsItem } from "@/types";
import ArticleInteractions from "@/components/ArticleInteractions";

function decodeHTMLEntities(text: string) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "-")
    .replace(/&quot;/g, '"');
}

function stripHtmlAndTruncate(html: string, length: number = 150) {
  const strippedString = html.replace(/(<([^>]+)>)/gi, "");
  if (strippedString.length <= length) return strippedString;
  return strippedString.substring(0, length) + '...';
}

async function getArticle(slug: string): Promise<NewsItem | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  const res = await fetch(`${apiUrl}/api/posts/${slug}`, { next: { revalidate: 60 } });
  
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`HTTP Error Detail Berita: ${res.status}`);
  }

  const json = await res.json();
  
  if (!json || !json.data) {
    throw new Error("Invalid data format received inside post slug");
  }

  return json.data || json;
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await getArticle(resolvedParams.slug);
  
  if (!article) return {};

  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8000';
  const cleanTitle = decodeHTMLEntities(article.title);
  const cleanDescription = article.content ? stripHtmlAndTruncate(article.content) : `Berita terbaru kategori ${article.category} dari Madrasah Mu'allimin.`;
  const imageUrl = article.image ? `${storageUrl}/${article.image}` : '';

  return {
    title: `${cleanTitle} | Mu'allimin Yogyakarta`,
    description: cleanDescription,
    openGraph: {
      title: cleanTitle,
      description: cleanDescription,
      type: 'article',
      url: `/berita/${article.slug}`,
      siteName: "Mu'allimin Yogyakarta",
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: cleanTitle }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: cleanTitle,
      description: cleanDescription,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function DetailBerita({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const article = await getArticle(resolvedParams.slug);
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8000';

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      
      <section className="bg-brand-blue pt-40 pb-32 px-6 text-center text-white relative overflow-hidden flex flex-col items-center">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] z-0"></div>
        
        <div className="max-w-5xl mx-auto relative z-10 w-full">
          <div className="flex justify-center md:justify-start mb-8">
             <Link href="/berita" className="inline-flex items-center gap-2 text-white/80 hover:text-brand-yellow font-medium transition-colors text-sm uppercase tracking-widest border border-white/20 px-4 py-2 rounded-full hover:border-brand-yellow">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Kembali ke Berita
             </Link>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3 mb-6 flex-wrap">
            <div className="bg-brand-yellow text-brand-blue px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest shadow-sm">
              {article.category}
            </div>
            <div className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest">
              {article.published_at 
                ? new Date(article.published_at).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                : 'Terbaru'
              }
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.2] mb-6 drop-shadow-md text-center md:text-left">
            {decodeHTMLEntities(article.title)}
          </h1>
          
          <div className="flex items-center justify-center md:justify-start gap-2 text-white/70 text-sm font-medium">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
             {article.views || 0} Kali Dibaca
          </div>
        </div>
      </section>

      <article className="px-6 max-w-5xl mx-auto -mt-20 relative z-20">
        
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 p-6 md:p-14 border border-gray-100">
          
          {article.image && (
            <div className="relative w-full h-64 md:h-137.5 mb-14 rounded-3xl overflow-hidden shadow-inner">
              <Image 
                src={`${storageUrl}/${article.image}`} 
                alt={decodeHTMLEntities(article.title)} 
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div 
            className="prose prose-lg md:prose-xl max-w-none text-gray-800 
            [&_p]:mb-6! [&_p]:mt-0! [&_p]:leading-relaxed! [&_p]:text-justify!
            prose-headings:text-brand-blue prose-headings:font-bold prose-headings:text-left
            prose-strong:text-brand-blue prose-img:rounded-3xl prose-img:mx-auto
            prose-blockquote:border-l-brand-yellow prose-blockquote:bg-gray-50 prose-blockquote:py-3 
            prose-blockquote:px-8 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:text-left"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          <footer className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-400 text-sm italic font-medium">
              &copy; {new Date().getFullYear()} Madrasah Mu&apos;allimin
            </div>
            
            <ArticleInteractions 
              slug={article.slug} 
              initialLikes={article.likes || 0} 
              title={decodeHTMLEntities(article.title)} 
            />
          </footer>
        </div>
      </article>
    </main>
  );
}