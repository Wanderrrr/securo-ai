/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone', // Dodane dla Vercel
    images: {
      domains: ['localhost'],
    },
    experimental: {
      optimizeCss: true,
    },
  }
  
module.exports = nextConfig
