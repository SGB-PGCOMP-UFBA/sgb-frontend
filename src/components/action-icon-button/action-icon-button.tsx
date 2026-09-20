import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export interface ActionIconButtonProps {
  label: string
  disabledReason?: string
  icon: LucideIcon
  onClick: () => void
  iconClassName?: string
  className?: string
}

function ActionIconButton({
  label,
  disabledReason,
  icon: Icon,
  onClick,
  iconClassName,
  className
}: ActionIconButtonProps) {
  const isDisabled = Boolean(disabledReason)

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={label}
          aria-disabled={isDisabled || undefined}
          onClick={isDisabled ? undefined : onClick}
          className={cn(
            isDisabled && 'cursor-not-allowed opacity-50 hover:bg-transparent',
            className
          )}
        >
          <Icon className={cn('!size-6', iconClassName)} />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs text-center">
        {disabledReason ?? label}
      </TooltipContent>
    </Tooltip>
  )
}

export { ActionIconButton }
