import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // 忽略 maker-tiptap-editor 和 tiptap-templates 目录
    config.resolve.alias = {
      ...config.resolve.alias,
      'maker-tiptap-editor': false,
      'tiptap-templates': false
    }

    // 使用 IgnorePlugin 忽略这些目录
    config.plugins.push(
      new (require('webpack').IgnorePlugin)({
        resourceRegExp: /^(maker-tiptap-editor|tiptap-templates)/
      })
    )

    return config
  }
}

export default nextConfig
