import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "119.59.102.217",
      },
    ],
  },
  // output: "export",
  // basePath: "/gamestore",
  // assetPrefix: "/gamestore",
  // trailingSlash: true,
};

export default nextConfig;
