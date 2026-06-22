export interface NewsItem {
  id: number;
  title: string;
  category: string;
  slug: string;
  author_name: string | null; // Ditambahkan sesuai backend
  content: string;
  image: string | null;
  published_at: string;
  views?: number;
  likes?: number;
}

export interface AgendaItem {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  image: string | null; 
  start_date: string;
  end_date: string;
  location: string | null;
}

export interface PageItem {
  id: number;
  title: string;
  slug: string;
  content: string | null;
  image: string | null;
  hero_logo: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  stat_1_title: string | null;
  stat_1_value: string | null;
  stat_2_title: string | null;
  stat_2_value: string | null;
  stat_3_title: string | null;
  stat_3_value: string | null;
  stat_4_title: string | null;
  stat_4_value: string | null;
  stats_link: string | null;
}

export interface SettingItem {
  id: number;
  site_name: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  navbar_logo: string | null;   
  footer_logo: string | null;   
  instagram: string | null;
  youtube: string | null;
  opac_url: string | null;            // Ditambahkan untuk link OPAC
  operational_hours: string | null;   // Ditambahkan untuk Jam Layanan
  is_announcement_active: boolean;
  announcement_text: string | null;
  announcement_link: string | null;
}

export interface ProfileItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  content: string | null;
  image: string;
  file_pdf: string | null;
  updated_at: string;
}