import { Skeleton } from '@/components/ui/skeleton'

function ChartCardSkeleton() {
  return (
    <div role='status' aria-label='Carregando gráfico'>
      <Skeleton className='h-[280px] w-full' />
    </div>
  )
}

export { ChartCardSkeleton }
