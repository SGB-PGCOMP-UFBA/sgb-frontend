import type { ReactNode } from 'react'
import type { IconType } from 'react-icons'
import { Card, CardContent } from '@/components/ui/card'
import { ChartCardSkeleton } from './chart-card-skeleton'

export interface ChartCardProps {
  title: string
  subtitle?: string
  icon: IconType
  isLoading?: boolean
  className?: string
  children: ReactNode
}

function ChartCard(props: ChartCardProps) {
  const { title, subtitle, icon: Icon, isLoading = false, className, children } = props

  return (
    <Card className={className}>
      <CardContent className='flex h-full flex-col p-5'>
        <div className='mb-4 flex items-start justify-between gap-3'>
          <div className='min-w-0'>
            <h3 className='text-lg font-semibold leading-tight text-foreground'>{title}</h3>
            {subtitle && <p className='mt-1 text-sm text-muted-foreground'>{subtitle}</p>}
          </div>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground'>
            <Icon className='h-5 w-5' aria-hidden />
          </span>
        </div>
        <div className='flex-1'>{isLoading ? <ChartCardSkeleton /> : children}</div>
      </CardContent>
    </Card>
  )
}

export { ChartCard }
