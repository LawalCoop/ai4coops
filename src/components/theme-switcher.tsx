'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { twMerge } from 'tailwind-merge'
import * as React from 'react'
import { Button } from '@/components/ui/button'

interface ThemeSwitcherProps {
  className?: string
}
export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        size="icon"
        className={twMerge('relative', className)}
        disabled
      >
        <div className="h-6 w-6 w500:h-4 w500:w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      size="icon"
      className={twMerge('relative', className)}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className="dark:text-darkText hidden h-6 w-6 w500:h-4 w500:w-4 dark:inline" />
      <Moon className="text-text inline h-6 w-6 w500:h-4 w500:w-4 dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
