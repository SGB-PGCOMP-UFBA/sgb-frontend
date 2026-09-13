import { MdWork } from 'react-icons/md'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import type { CountByAgencyAndStatus } from '../../../../../api/scholarship'

const LITERAL_ON_GOING = 'ON_GOING'

export interface CardBolsasCnpqViewProps {
  className?: string
  data: CountByAgencyAndStatus[string]
  isLoading: boolean
}

function CardBolsasCnpqView(props: CardBolsasCnpqViewProps) {
  const { data, className } = props

  const total_count = Object.values(data).reduce((acc, currentValue) => {
    const valor = parseInt(String(currentValue.count))
    return acc + (isNaN(valor) ? 0 : valor)
  }, 0)

  return (
    <Card className={className}>
      <CardContent className='flex h-full w-full flex-col justify-between overflow-hidden p-6'>
        <div className='mb-4 flex flex-row items-start justify-between gap-6'>
          <div className='mb-4 flex flex-col'>
            <h3 className='mb-10 text-2xl font-bold text-foreground'>CNPQ</h3>
            <p className='text-3xl'>{data[LITERAL_ON_GOING]?.count || 0}</p>
            <p className='text-base'>bolsas alocadas</p>
          </div>
          <Avatar className='h-14 w-14 shrink-0'>
            <AvatarFallback className='bg-green-400 text-white'>
              <MdWork className='h-8 w-8' />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className='flex flex-row items-center justify-end'>
          <span className='text-xs font-bold text-foreground'>
            {total_count}&nbsp;
          </span>
          <span className='text-xs text-foreground'>bolsas desde o início</span>
        </div>
      </CardContent>
    </Card>
  )
}

export { CardBolsasCnpqView }
