import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export interface CardSkeletonOnLoadProps {
  className?: string
}

function CardSkeletonOnLoad(props: CardSkeletonOnLoadProps) {
  return (
    <Card className={props.className}>
      <CardContent className="flex h-full w-full flex-col justify-between p-6">
        <div className="flex flex-row items-start justify-between gap-6">
          <div className="mb-6 flex w-full flex-col gap-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          <Skeleton className="h-14 w-14 shrink-0 rounded-full" />
        </div>
        <div className="mt-4 flex w-full flex-row items-center">
          <Skeleton className="h-4 w-full" />
        </div>
      </CardContent>
    </Card>
  )
}

export { CardSkeletonOnLoad }
