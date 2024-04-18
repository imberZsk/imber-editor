import { cn } from '@/lib/utils'

export default function Wrapper({
  children,
  className,
}: Readonly<{
  children: React.ReactNode
  className?: string
}>) {
  const initClassName = `border rounded p-1 shadow
  bg-background dark:bg-background-dark dark:border-gray-800 dark:shadow-lg 
  inline-flex space-x-1`

  return <div className={cn(initClassName, className)}>{children}</div>
}
