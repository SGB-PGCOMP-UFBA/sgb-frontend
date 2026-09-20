import type { IconType } from 'react-icons'
import { cn } from '@/lib/utils'

export interface PageHeaderProps {
  title: string
  description: string
  icon: IconType
  iconBackgroundClassName?: string
  iconClassName?: string
  actions?: React.ReactNode
  className?: string
}

function PageHeader({
  title,
  description,
  icon: Icon,
  iconBackgroundClassName,
  iconClassName,
  actions,
  className
}: PageHeaderProps) {
  return (
    <div className={cn('mb-8 flex justify-between', className)}>
      <div className="flex items-center gap-x-4">
        <div className={cn('rounded-md p-2 leading-none text-white', iconBackgroundClassName)}>
          <Icon className={cn('h-8 w-8', iconClassName)} />
        </div>
        <div>
          <h2 className="poppins text-xl font-semibold text-gray-900">{title}</h2>
          <p className="poppins font-medium text-gray-500">{description}</p>
        </div>
      </div>
      {actions}
    </div>
  )
}

export { PageHeader }
