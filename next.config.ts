import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["pg.tototrapsilo.id"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "demo.tototrapsilo.id",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pg.tototrapsilo.id",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
