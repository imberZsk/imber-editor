'use client'

import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'

export function TipTapTheme() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // 避免水合不匹配
  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = theme === 'dark'

  const handleToggle = useCallback(() => {
    // 防止快速连击
    if (isTransitioning) return

    setIsTransitioning(true)
    setTheme(isDark ? 'light' : 'dark')

    // 重置防抖状态
    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }, [isDark, setTheme, isTransitioning])

  if (!mounted) {
    return null
  }

  return (
    <button
      className={`absolute right-10 top-10 box-content flex h-[20px] w-[40px] cursor-pointer rounded-[60px] p-[4px] transition-colors duration-300 ${
        isDark
          ? 'justify-end bg-gray-700 shadow-inner'
          : 'justify-start bg-blue-200 shadow-inner'
      } ${isTransitioning ? 'pointer-events-none' : ''}`}
      onClick={handleToggle}
      disabled={isTransitioning}
      aria-label={`切换到${isDark ? '浅色' : '深色'}模式`}
      role="switch"
      aria-checked={isDark}
    >
      <motion.div
        className={`flex h-[20px] w-[20px] items-center justify-center rounded-full text-2xl transition-colors duration-300 ${
          isDark
            ? 'bg-gray-800 text-yellow-200 shadow-lg'
            : 'bg-yellow-400 text-orange-600 shadow-lg'
        }`}
        // 自动处理布局变化
        layout
        transition={{
          // 指定动画类型为弹簧动画
          type: 'spring',
          // 设置动画的视觉感知持续时间为 0.2 秒
          visualDuration: 0.2,
          // 控制弹簧的弹跳强度
          bounce: 0.2
        }}
        // 确保这个元素不会阻挡点击事件
        style={{ pointerEvents: 'none' }}
      >
        {isDark ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
      </motion.div>
    </button>
  )
}
