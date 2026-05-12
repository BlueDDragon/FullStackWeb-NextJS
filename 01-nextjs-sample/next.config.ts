import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'styangpa.blob.core.windows.net',
      },
    ]
  },
};

export default nextConfig;
