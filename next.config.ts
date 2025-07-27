import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL(
        "https://erehmzxnqzzkagriuctx.supabase.co/storage/v1/object/public/paying-guest/**"
      ),
    ],
  },
};

export default nextConfig;
