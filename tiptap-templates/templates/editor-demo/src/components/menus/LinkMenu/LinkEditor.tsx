import { useCallback, useState, useMemo } from 'react'
import { Link, X, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LinkEditorProps {
  onSetLink: (url: string, openInNewTab?: boolean) => void
  onClose: () => void
  initialUrl?: string
}

export const LinkEditor = ({
  onSetLink,
  onClose,
  initialUrl = ''
}: LinkEditorProps) => {
  const [url, setUrl] = useState(initialUrl)
  const [openInNewTab, setOpenInNewTab] = useState(false)

  // URL 验证
  const isValidUrl = useMemo(() => {
    if (!url) return false
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`)
      return true
    } catch {
      return /^(\S+):(\/\/)?\S+$/.test(url)
    }
  }, [url])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (isValidUrl) {
        // 自动添加 https:// 如果没有协议
        const finalUrl = url.startsWith('http') ? url : `https://${url}`
        onSetLink(finalUrl, openInNewTab)
        onClose()
      }
    },
    [url, isValidUrl, openInNewTab, onSetLink, onClose]
  )

  return (
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl min-w-[300px] max-w-[90vw]">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-center gap-2">
          <Link size={16} className="text-gray-500" />
          <input
            type="text"
            className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="输入链接地址 (例如: google.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            autoFocus
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="openInNewTab"
            checked={openInNewTab}
            onChange={(e) => setOpenInNewTab(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="openInNewTab"
            className="text-sm text-gray-700 dark:text-gray-300"
          >
            在新标签页中打开
          </label>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            type="submit"
            disabled={!isValidUrl}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors',
              isValidUrl
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            )}
          >
            <Check size={14} />
            设置链接
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
          >
            <X size={14} />
            取消
          </button>
        </div>
      </form>
    </div>
  )
}
