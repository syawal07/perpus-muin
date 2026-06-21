const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "adminmuin.muallimin.sch.id",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "muallimin.sch.id",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
