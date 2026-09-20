import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '@/services'
import { formatApiError } from '@/helpers/api-error.helper'
import type { AgencyDetailed } from '@/types'
import { TableTotalBolsasPorAgenciaView } from './table-total-bolsas-por-agencia.view'

export interface TableTotalBolsasPorAgenciaProps {
  className?: string
}

function TableTotalBolsasPorAgencia(props: TableTotalBolsasPorAgenciaProps) {
  const [data, setData] = useState<AgencyDetailed[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    const response = await api.agency.getAgencys()

    if (response.status === 200) {
      const data = response.data.filter(item => item.name !== 'OUTRAS')
      setData(data)
    } else {
      toast.error(formatApiError(response.status, response.data))
    }
  }

  useEffect(() => {
    getData().finally(() => setIsLoading(false))
  }, [])

  return (
    !isLoading && (
      <TableTotalBolsasPorAgenciaView data={data} className={props.className} />
    )
  )
}

export { TableTotalBolsasPorAgencia }
