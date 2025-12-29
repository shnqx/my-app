import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'orderapp-app-static.burgerkingrus.ru',
      },
    ],
  },
};

export default nextConfig;
