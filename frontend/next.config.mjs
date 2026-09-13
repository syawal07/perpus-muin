/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "adminperpus.muallimin.sch.id",
        pathname: "/storage/**", // Penambahan gembok ekstra khusus ke folder gambar
      },
      {
        protocol: "https",
        hostname: "perpustakaan.muallimin.sch.id",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
