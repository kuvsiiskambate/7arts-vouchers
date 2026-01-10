import * as React from 'react'
import { cn } from '@/lib/utils/cn'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number // 0-100
  max?: number
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'neon' | 'success' | 'warning' | 'error'
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, showLabel = false, size = 'md', variant = 'neon', ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    const heightClass = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    }[size]

    const colorClass = {
      neon: 'bg-brand-neon',
      success: 'bg-semantic-success',
      warning: 'bg-semantic-warning',
      error: 'bg-semantic-error',
    }[variant]

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {showLabel && (
          <div className="flex justify-between mb-1 text-sm">
            <span className="text-gray-400">Progress</span>
            <span className="font-semibold text-brand-neon">{percentage.toFixed(0)}%</span>
          </div>
        )}
        <div className={cn('w-full bg-brand-surface rounded-full overflow-hidden', heightClass)}>
          <div
            className={cn('h-full transition-all duration-500 ease-out', colorClass)}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }
)
Progress.displayName = 'Progress'

export { Progress }
