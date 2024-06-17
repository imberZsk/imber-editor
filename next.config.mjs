/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api-myplus/:path*',
        destination: `https://myplus-api.meizu.cn/:path*`
      }
    ]
  }
}

export default nextConfig
