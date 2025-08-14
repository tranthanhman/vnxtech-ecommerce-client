import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: (process.env.IMAGE_PROTOCOL as 'http' | 'https') || 'http',
        hostname: process.env.IMAGE_HOST || 'localhost',
        port: process.env.IMAGE_PORT || '8090',
        pathname: process.env.IMAGE_PATHNAME || '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/images/**',
      }
    ],
  },
};

export default nextConfig;
