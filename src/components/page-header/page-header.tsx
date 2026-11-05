import type { IconType } from 'react-icons'
import { cn } from '@/lib/utils'

export interface PageHeaderProps {
  title: string
  description: string
  icon: IconType
  iconBackgroundClassName?: string
  iconClassName?: string
  actions?: React.ReactNode
  /** Conteudo extra logo abaixo da descricao, como um resumo. */
  details?: React.ReactNode
  className?: string
}

function PageHeader({
  title,
  description,
  icon: Icon,
  iconBackgroundClassName,
  iconClassName,
  actions,
  details,
  className
}: PageHeaderProps) {
  return (
    <div className={cn('mb-8 flex flex-wrap items-center justify-between gap-4', className)}>
      <div className="flex items-center gap-x-4">
        <div className={cn('rounded-md p-2 leading-none text-white', iconBackgroundClassName)}>
          <Icon className={cn('h-8 w-8', iconClassName)} />
        </div>
        <div>
          <h2 className="poppins text-xl font-semibold text-gray-900">{title}</h2>
          <p className="poppins font-medium text-gray-500">{description}</p>
          {details}
        </div>
      </div>
      {actions}
    </div>
  )
}

export { PageHeader }
