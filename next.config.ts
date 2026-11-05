import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel's free tier allows only 5,000 image transformations/month;
  // WebP previews are pre-built by scripts/generate-previews.mjs instead.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
