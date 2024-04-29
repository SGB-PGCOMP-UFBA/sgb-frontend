import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../../../../api'
import { CardBolsasCapesView } from './CardBolsasCapesView'
import { CardSkeletonOnLoad } from '../CardSkeletonOnLoad'

const LITERAL_CAPES = 'CAPES'

function CardBolsasCapes(props) {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    const response = await api.scholarship.countScholarshipsGroupingByStatusForAgency(LITERAL_CAPES)

    if (response.status === 200) {
      setData(response.data[LITERAL_CAPES])
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }
  }

  useEffect(() => {
    getData().finally(() => setIsLoading(false))
  }, [])

  return (
    isLoading ? <CardSkeletonOnLoad /> : <CardBolsasCapesView sx={props.sx} isLoading={isLoading} data={data} />
  )
}

CardBolsasCapes.prototypes = {
  sx: PropTypes.node,
}

export { CardBolsasCapes }
