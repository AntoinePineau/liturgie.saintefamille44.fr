/** @type {import('next').NextConfig} */
const nextConfig = {
  // Suppression de output: 'export' pour permettre les API routes
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;