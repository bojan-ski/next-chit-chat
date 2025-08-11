import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://lxmmdwlixskylacuajih.supabase.co",
      },
    ],
  },
};

export default nextConfig;
