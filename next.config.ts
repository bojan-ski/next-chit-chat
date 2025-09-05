import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lxmmdwlixskylacuajih.supabase.co",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  eslint: {
    // Don’t block production builds because of ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Don’t block production builds because of type errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
