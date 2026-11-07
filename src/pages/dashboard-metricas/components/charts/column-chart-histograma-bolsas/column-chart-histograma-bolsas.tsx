import { useCallback } from 'react'
import { api } from '@/services'
import type { CountByCourseAndYear } from '@/services/scholarship'
import { useApiData } from '@/hooks/use-api-data'
import type { AgencyName } from '@/types'
import { toHistogramData } from '@/pages/dashboard-metricas/components/charts/chart-data.util'
import { ColumnChartHistogramaBolsasView } from './column-chart-histograma-bolsas.view'

const EMPTY_COUNT: CountByCourseAndYear = {}

export interface ColumnChartHistogramaBolsasProps {
  agencyName?: AgencyName
  className?: string
}

function ColumnChartHistogramaBolsas(props: ColumnChartHistogramaBolsasProps) {
  const { agencyName, className } = props

  const request = useCallback(
    () =>
      agencyName
        ? api.scholarship.countScholarshipsGroupingByCourseAndYearFilteringByAgencyName(agencyName)
        : api.scholarship.countScholarshipsGroupingByCourseAndYear(),
    [agencyName]
  )
  const { data, isLoading } = useApiData(request, EMPTY_COUNT)

  return (
    <ColumnChartHistogramaBolsasView
      className={className}
      isLoading={isLoading}
      agencyName={agencyName}
      rows={toHistogramData(data)}
    />
  )
}

export { ColumnChartHistogramaBolsas }
