import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '@/api'
import type { CountByAgencyAndStatus } from '@/api/scholarship'
import { formatApiError } from '@/helpers/api-error'
import { CardBolsasCapesView } from './CardBolsasCapesView'
import { CardSkeletonOnLoad } from '@/pages/DashboardMetricas/components/cards/CardSkeletonOnLoad'

const LITERAL_CAPES = 'CAPES'

const initialState: CountByAgencyAndStatus[string] = {
  ON_GOING: {
    count: 0
  }
}

export interface CardBolsasCapesProps {
  className?: string
}

function CardBolsasCapes(props: CardBolsasCapesProps) {
  const [data, setData] = useState<CountByAgencyAndStatus[string]>(initialState)
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    const response = await api.scholarship.countScholarshipsGroupingByStatusForAgency(LITERAL_CAPES)

    if (response.status === 200) {
      setData(response.data[LITERAL_CAPES] || initialState)
    } else {
      toast.error(formatApiError(response.status, response.data))
    }
  }

  useEffect(() => {
    getData().finally(() => setIsLoading(false))
  }, [])

  return (
    isLoading ? <CardSkeletonOnLoad /> : <CardBolsasCapesView className={props.className} isLoading={isLoading} data={data} />
  )
}

export { CardBolsasCapes }
