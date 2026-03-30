import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "anthropic-dangerous-direct-browser-access", value: "true" },
        ],
      },
    ];
  },
};

export default nextConfig;