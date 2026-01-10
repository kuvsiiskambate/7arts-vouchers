import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-neon disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        neon: 'bg-brand-neon hover:bg-brand-neonHover text-brand-dark neon-glow hover:neon-glow-strong hover:-translate-y-0.5',
        ghost: 'border border-brand-neon/50 text-brand-neon hover:bg-brand-neon/10',
        outline: 'border border-brand-neonDim/30 text-white hover:bg-brand-surface',
        danger: 'bg-semantic-error hover:bg-semantic-error/90 text-white',
        success: 'bg-semantic-success hover:bg-semantic-success/90 text-white',
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-6 text-sm',
        lg: 'h-13 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'neon',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
