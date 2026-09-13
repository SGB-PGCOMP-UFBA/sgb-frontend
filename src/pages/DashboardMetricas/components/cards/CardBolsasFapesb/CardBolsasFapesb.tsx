import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../../../../api'
import type { CountByAgencyAndStatus } from '../../../../../api/scholarship'
import { formatApiError } from '../../../../../helpers/api-error'
import { CardBolsasFapesbView } from './CardBolsasFapesbView'
import { CardSkeletonOnLoad } from '../CardSkeletonOnLoad'

const LITERAL_FAPESB = 'FAPESB'

const initialState: CountByAgencyAndStatus[string] = {
  ON_GOING: {
    count: 0
  }
}

export interface CardBolsasFapesbProps {
  className?: string
}

function CardBolsasFapesb(props: CardBolsasFapesbProps) {
  const [data, setData] = useState<CountByAgencyAndStatus[string]>(initialState)
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    const response = await api.scholarship.countScholarshipsGroupingByStatusForAgency(LITERAL_FAPESB)

    if (response.status === 200) {
      setData(response.data[LITERAL_FAPESB] || initialState)
    } else {
      toast.error(formatApiError(response.status, response.data))
    }
  }

  useEffect(() => {
    getData().finally(() => setIsLoading(false))
  }, [])

  return (
    isLoading ? <CardSkeletonOnLoad /> : <CardBolsasFapesbView className={props.className} isLoading={isLoading} data={data} />
  )
}

export { CardBolsasFapesb }
