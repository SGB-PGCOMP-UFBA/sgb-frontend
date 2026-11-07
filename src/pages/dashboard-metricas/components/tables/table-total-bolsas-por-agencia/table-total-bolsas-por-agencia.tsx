import { useMemo } from 'react'
import { api } from '@/services'
import { useApiData } from '@/hooks/use-api-data'
import type { AgencyDetailed } from '@/types'
import { TableTotalBolsasPorAgenciaView } from './table-total-bolsas-por-agencia.view'

const EMPTY_AGENCIES: AgencyDetailed[] = []

export interface TableTotalBolsasPorAgenciaProps {
  className?: string
}

function TableTotalBolsasPorAgencia(props: TableTotalBolsasPorAgenciaProps) {
  const { data, isLoading } = useApiData(api.agency.getAgencys, EMPTY_AGENCIES)
  const agencies = useMemo(() => data.filter(item => item.name !== 'OUTRAS'), [data])

  return (
    <TableTotalBolsasPorAgenciaView
      className={props.className}
      data={agencies}
      isLoading={isLoading}
    />
  )
}

export { TableTotalBolsasPorAgencia }
