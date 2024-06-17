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
  // env: {
  //   NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  //   NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET
  //   // 添加其他需要的环境变量
  // }
}

export default nextConfig
