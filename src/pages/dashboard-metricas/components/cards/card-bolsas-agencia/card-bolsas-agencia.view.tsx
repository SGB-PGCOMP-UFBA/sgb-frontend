import { MdWork } from 'react-icons/md'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { AgencyName } from '@/types'

export type AgencyCardName = Exclude<AgencyName, 'OUTRAS'>

/** Mesmos tons de `--chart-1..3`, para o card casar com a fatia da agência nas pizzas. */
const AGENCY_ICON_CLASS: Record<AgencyCardName, string> = {
  CAPES: 'bg-blue-500',
  CNPQ: 'bg-green-500',
  FAPESB: 'bg-yellow-500',
}

export interface CardBolsasAgenciaViewProps {
  agency: AgencyCardName
  onGoing: number
  sinceBeginning: number
  className?: string
}

function CardBolsasAgenciaView(props: CardBolsasAgenciaViewProps) {
  const { agency, onGoing, sinceBeginning, className } = props

  return (
    <Card className={className}>
      <CardContent className='flex h-full flex-col gap-4 p-5'>
        <div className='flex items-center justify-between gap-3'>
          <h3 className='text-lg font-semibold text-foreground'>{agency}</h3>
          <span
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white',
              AGENCY_ICON_CLASS[agency]
            )}
          >
            <MdWork className='h-5 w-5' aria-hidden />
          </span>
        </div>
        <div>
          <p className='text-4xl font-bold tabular-nums text-foreground'>{onGoing}</p>
          <p className='text-sm text-muted-foreground'>bolsas alocadas</p>
        </div>
        <p className='mt-auto border-t pt-3 text-sm text-muted-foreground'>
          <span className='font-semibold tabular-nums text-foreground'>{sinceBeginning}</span>{' '}
          bolsas desde o início
        </p>
      </CardContent>
    </Card>
  )
}

export { CardBolsasAgenciaView }
