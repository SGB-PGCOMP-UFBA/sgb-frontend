import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import type { AxiosResponse } from 'axios'
import { api } from '../../../../../api'
import type { CountByCourseAndYear } from '../../../../../api/scholarship'
import { formatApiError } from '../../../../../helpers/api-error'
import type { AgencyName } from '../../../../../types'
import { ColumnChartHistogramaBolsasView } from './ColumnChartHistogramaBolsasView'

export interface ColumnChartHistogramaBolsasProps {
  className?: string
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ColumnChartHistogramaBolsasView className={props.className} isLoading={isLoading} data={data} agencyName={agencyName}/>
  )
}

export { ColumnChartHistogramaBolsas }
