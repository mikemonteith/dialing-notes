/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [{
        source: '/sitemap/:path*',
        destination: 'https://example.com/:path',
      }]
    }
  }
}

module.exports = nextConfig
