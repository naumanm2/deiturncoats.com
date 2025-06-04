import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/press",
        destination: "https://deiturncoats.framer.website/",
        permanent: true,
      },
      {
        source: "/en/press",
        destination: "https://deiturncoats.framer.website/",
        permanent: true,
      },
      {
        source: "/fi/press",
        destination: "https://deiturncoats.framer.website/",
        permanent: true,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  webpack: (config) => {
    // Add rule for SVG files
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  reactStrictMode: true,
};

export default nextConfig;
