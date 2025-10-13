/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['hba.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hba.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      // You can add more domains here as needed
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
}

export default nextConfig