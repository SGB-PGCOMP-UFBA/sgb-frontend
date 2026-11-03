import { TriangleAlert } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { getDurationWarning } from '@/helpers/scholarship-duration.helper'
import { cn } from '@/lib/utils'

type DayInput = string | Date | null | undefined

export interface AvisoDuracaoBolsaProps {
  startsAt: DayInput
  endsAt: DayInput
  program: string | null | undefined
  /** `icon`: so o icone, com a mensagem no tooltip (para tabelas). */
  variant?: 'message' | 'icon'
  className?: string
}

/** Aviso, sem bloquear nada, de bolsa que passa da duracao do curso. */
function AvisoDuracaoBolsa({
  startsAt,
  endsAt,
  program,
  variant = 'message',
  className,
}: AvisoDuracaoBolsaProps) {
  const warning = getDurationWarning(startsAt, endsAt, program)
  if (!warning) return null

  if (variant === 'icon') {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type='button'
            aria-label={warning.message}
            className={cn('inline-flex text-amber-600', className)}
          >
            <TriangleAlert className='size-4' aria-hidden />
          </button>
        </TooltipTrigger>
        <TooltipContent className='max-w-xs'>{warning.message}</TooltipContent>
      </Tooltip>
    )
  }

  return (
    <p
      role='status'
      className={cn('flex items-start gap-1.5 text-xs text-amber-700', className)}
    >
      <TriangleAlert className='mt-0.5 size-3.5 shrink-0' aria-hidden />
      <span>{warning.message}</span>
    </p>
  )
}

export { AvisoDuracaoBolsa }
