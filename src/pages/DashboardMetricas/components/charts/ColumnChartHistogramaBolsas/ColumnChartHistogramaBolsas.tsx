import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import type { AxiosResponse } from 'axios'
import type { SxProps, Theme } from '@mui/material'
import { api } from '../../../../../api'
import type { CountByCourseAndYear } from '../../../../../api/scholarship'
import { formatApiError } from '../../../../../helpers/api-error'
import type { AgencyName } from '../../../../../types'
import { ColumnChartHistogramaBolsasView } from './ColumnChartHistogramaBolsasView'

export interface ColumnChartHistogramaBolsasProps {
  sx?: SxProps<Theme>
  agencyName?: AgencyName
}

function ColumnChartHistogramaBolsas(props: ColumnChartHistogramaBolsasProps) {
  const { agencyName } = props
  const [data, setData] = useState<CountByCourseAndYear>({})
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    let response: AxiosResponse<CountByCourseAndYear>
    if (agencyName) response = await api.scholarship.countScholarshipsGroupingByCourseAndYearFilteringByAgencyName(agencyName)
    else response = await api.scholarship.countScholarshipsGroupingByCourseAndYear()

    if (response.status === 200) {
      setData(response.data)
    } else {
      toast.error(formatApiError(response.status, response.data))
    }
  }

  useEffect(() => {
    getData().finally(() => setIsLoading(false))
  }, [])

  return (
    <ColumnChartHistogramaBolsasView sx={props.sx} isLoading={isLoading} data={data} agencyName={agencyName}/>
  )
}

export { ColumnChartHistogramaBolsas }
