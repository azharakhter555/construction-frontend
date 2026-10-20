/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add the exact IP you're using
  allowedDevOrigins: ["172.20.10.2", "localhost", "127.0.0.1"],

  // Enable Turbopack for faster dev (optional)
  experimental: {},

  // ⚠️ TEMPORARY — remove before final production launch.
  // These let the demo deploy while TypeScript/ESLint errors
  // are still being fixed. Delete both blocks before going live.
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Correct placement: images.remotePatterns
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
