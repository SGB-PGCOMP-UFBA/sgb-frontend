import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import type { SxProps, Theme } from '@mui/material'
import { api } from '../../../../../api'
import type { CountByAgencyAndStatus } from '../../../../../api/scholarship'
import { formatApiError } from '../../../../../helpers/api-error'
import { CardBolsasCnpqView } from './CardBolsasCnpqView'
import { CardSkeletonOnLoad } from '../CardSkeletonOnLoad'

const LITERAL_CNPQ = 'CNPQ'

const initialState: CountByAgencyAndStatus[string] = {
  ON_GOING: {
    count: 0
  }
}

export interface CardBolsasCnpqProps {
  sx?: SxProps<Theme>
}

function CardBolsasCnpq(props: CardBolsasCnpqProps) {
  const [data, setData] = useState<CountByAgencyAndStatus[string]>(initialState)
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    const response = await api.scholarship.countScholarshipsGroupingByStatusForAgency(LITERAL_CNPQ)

    if (response.status === 200) {
      setData(response.data[LITERAL_CNPQ] || initialState)
    } else {
      toast.error(formatApiError(response.status, response.data))
    }
  }

  useEffect(() => {
    getData().finally(() => setIsLoading(false))
  }, [])

  return (
    isLoading ? <CardSkeletonOnLoad /> : <CardBolsasCnpqView sx={props.sx} isLoading={isLoading} data={data} />
  )
}

export { CardBolsasCnpq }
