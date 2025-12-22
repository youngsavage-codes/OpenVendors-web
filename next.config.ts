import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'], // ✅ add all external domains you need
  },
};

export default nextConfig;
