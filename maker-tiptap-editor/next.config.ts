import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 添加 lucide-react 进行转译，确保与 Next.js 的兼容性
  transpilePackages: ["lucide-react"],

  // 默认情况下，Next.js 会在每个响应中添加一个 X-Powered-By 响应头，内容为 Next.js。
  poweredByHeader: false,
};

export default nextConfig;
