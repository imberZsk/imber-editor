import { cn } from '@/lib/utils'

interface MenuButtonProps {
  onClick?: () => void
  isActive: boolean
  children: React.ReactNode
  tooltip?: string
}

export const MenuButton = ({
  onClick,
  isActive,
  children,
  tooltip
}: MenuButtonProps) => {
  if (!onClick) {
    return (
      <div
        className={cn(
          'flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200',
          'active:scale-95',
          isActive
            ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-black shadow-inner'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        )}
      >
        {children}
      </div>
    )
  }
  return (
    <button
      onClick={onClick}
      type="button"
      title={tooltip}
      className={cn(
        'flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200',
        'active:scale-95',
        isActive
          ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-black shadow-inner'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
      )}
    >
      {children}
    </button>
  )
}
