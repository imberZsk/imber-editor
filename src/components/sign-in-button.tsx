import { signIn } from 'auth'
import { Button } from '@/components/ui/button'

export default function SignInButton({
  children,
  className,
  size,
}: {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'lg'
}) {
  return (
    <form
      action={async () => {
        'use server'
        await signIn()
      }}
    >
      <Button className={className} size={size}>
        {children}
      </Button>
    </form>
  )
}
