import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import type { SxProps, Theme } from '@mui/material'
import { api } from '../../../../../api'
import { formatApiError } from '../../../../../helpers/api-error'
import type { AgencyDetailed } from '../../../../../types'
import { TableTotalBolsasPorAgenciaView } from './TableTotalBolsasPorAgenciaView'

export interface TableTotalBolsasPorAgenciaProps {
  sx?: SxProps<Theme>
}

function TableTotalBolsasPorAgencia(props: TableTotalBolsasPorAgenciaProps) {
  const [data, setData] = useState<AgencyDetailed[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    const response = await api.agency.getAgencys()

    if (response.status === 200) {
      const data = response.data.filter(item => item.name !== "OUTRAS")
      setData(data)
    } else {
      toast.error(formatApiError(response.status, response.data))
    }
  }

  useEffect(() => {
    getData().finally(() => setIsLoading(false))
  }, [])

  return (
    !isLoading && <TableTotalBolsasPorAgenciaView data={data} sx={props.sx} />
  )
}

export { TableTotalBolsasPorAgencia }
