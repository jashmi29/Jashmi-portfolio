/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.image2url.com',
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
