import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../../../../api'
import { CardBolsasFapesbView } from './CardBolsasFapesbView'
import { CardSkeletonOnLoad } from '../CardSkeletonOnLoad'

const LITERAL_FAPESB = 'FAPESB'

const initialState = {
  ON_GOING: {
    count: 0
  }
}

function CardBolsasFapesb(props) {
  const [data, setData] = useState(initialState)
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    const response = await api.scholarship.countScholarshipsGroupingByStatusForAgency(LITERAL_FAPESB)

    if (response.status === 200) {
      setData(response.data[LITERAL_FAPESB] || initialState)
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }
  }

  useEffect(() => {
    getData().finally(() => setIsLoading(false))
  }, [])

  return (
    isLoading ? <CardSkeletonOnLoad /> : <CardBolsasFapesbView sx={props.sx} isLoading={isLoading} data={data} />
  )
}

CardBolsasFapesb.prototypes = {
  sx: PropTypes.node,
}

export { CardBolsasFapesb }
