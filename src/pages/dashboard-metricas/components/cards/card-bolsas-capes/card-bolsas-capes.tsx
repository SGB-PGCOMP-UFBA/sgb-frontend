import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '@/services'
import type { CountByAgencyAndStatus } from '@/services/scholarship'
import { formatApiError } from '@/helpers/api-error.helper'
import { CardBolsasCapesView } from './card-bolsas-capes.view'
import { CardSkeletonOnLoad } from '@/pages/dashboard-metricas/components/cards/card-skeleton-on-load'

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
