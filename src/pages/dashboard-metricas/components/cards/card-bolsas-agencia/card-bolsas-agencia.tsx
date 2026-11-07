import { useCallback } from 'react'
import { api } from '@/services'
import type { CountByAgencyAndStatus } from '@/services/scholarship'
import { useApiData } from '@/hooks/use-api-data'
import { CardSkeletonOnLoad } from '@/pages/dashboard-metricas/components/cards/card-skeleton-on-load'
import { toCount } from '@/pages/dashboard-metricas/components/charts/chart-data.util'
import { CardBolsasAgenciaView, type AgencyCardName } from './card-bolsas-agencia.view'

const EMPTY_COUNT: CountByAgencyAndStatus = {}

export interface CardBolsasAgenciaProps {
  agency: AgencyCardName
  className?: string
}

function CardBolsasAgencia(props: CardBolsasAgenciaProps) {
  const { agency, className } = props

  const request = useCallback(
    () => api.scholarship.countScholarshipsGroupingByStatusForAgency(agency),
    [agency]
  )
  const { data, isLoading } = useApiData(request, EMPTY_COUNT)

  if (isLoading) return <CardSkeletonOnLoad className={className} />

  const byStatus = data[agency] ?? {}
  const sinceBeginning = Object.values(byStatus).reduce(
    (total, { count }) => total + toCount(count),
    0
  )

  return (
    <CardBolsasAgenciaView
      className={className}
      agency={agency}
      onGoing={toCount(byStatus.ON_GOING?.count)}
      sinceBeginning={sinceBeginning}
    />
  )
}

export { CardBolsasAgencia }
