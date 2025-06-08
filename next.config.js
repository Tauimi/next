/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript и ESLint настройки для продакшена
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  experimental: {
    // App directory is now stable in Next.js 14
  },
  images: {
    domains: [
      'localhost', 
      'images.unsplash.com', 
      'via.placeholder.com',
      'technomart.vercel.app'
    ],
    formats: ['image/webp', 'image/avif'],
  },
  // Оптимизация для Vercel
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  // SEO оптимизация
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig 