import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        neon: 'bg-brand-neon/20 text-brand-neon border border-brand-neon/30',
        success: 'bg-semantic-success/20 text-semantic-success border border-semantic-success/30',
        warning: 'bg-semantic-warning/20 text-semantic-warning border border-semantic-warning/30',
        error: 'bg-semantic-error/20 text-semantic-error border border-semantic-error/30',
        info: 'bg-semantic-info/20 text-semantic-info border border-semantic-info/30',
        outline: 'border border-brand-neonDim/30 text-gray-300',
      },
    },
    defaultVariants: {
      variant: 'neon',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
