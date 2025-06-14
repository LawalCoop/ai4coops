import * as React from 'react'
import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-base border-2 text-gray-900 dark:text-gray-100 font-base selection:bg-main selection:text-black border-border dark:border-darkBorder bg-white dark:bg-gray-800 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          'box-border', // ensures padding and borders are included in width
          'transition-all duration-200 ease-in-out', // smooth transition for width and other properties
          'focus:ring-2 focus:ring-offset-2 focus:ring-blue-500', // focus styling (consistent)
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
