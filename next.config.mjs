/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api-myplus/:path*',
        destination: `https://myplus-api.meizu.cn/:path*`
      }
    ]
  },
  output: 'standalone'
}

export default nextConfig
