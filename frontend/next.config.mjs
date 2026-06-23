/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "adminperpus.muallimin.sch.id",
      },
      {
        protocol: "https",
        hostname: "perpustakaan.muallimin.sch.id",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
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
