import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../../../../api'
import { CardBolsasCnpqView } from './CardBolsasCnpqView'
import { CardSkeletonOnLoad } from '../CardSkeletonOnLoad'

const LITERAL_CNPQ = 'CNPQ'

function CardBolsasCnpq(props) {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    const response = await api.scholarship.countScholarshipsGroupingByStatusForAgency(LITERAL_CNPQ)

    if (response.status === 200) {
      setData(response.data[LITERAL_CNPQ])
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }
  }

  useEffect(() => {
    getData().finally(() => setIsLoading(false))
  }, [])

  return (
    isLoading ? <CardSkeletonOnLoad /> : <CardBolsasCnpqView sx={props.sx} isLoading={isLoading} data={data} />
  )
}

CardBolsasCnpq.prototypes = {
  sx: PropTypes.node,
}

export { CardBolsasCnpq }
