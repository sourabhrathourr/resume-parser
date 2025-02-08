import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb'
    },
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
