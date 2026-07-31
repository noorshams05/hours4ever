/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/cart/:path*',
        destination: 'https://hours4ever.myshopify.com/cart/:path*', // Replace with your exact .myshopify.com store domain
        permanent: false,
      },
    ]
  },
}

export default nextConfig
