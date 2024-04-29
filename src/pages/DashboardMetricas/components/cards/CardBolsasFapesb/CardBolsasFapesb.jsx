import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../../../../api'
import { CardBolsasFapesbView } from './CardBolsasFapesbView'
import Loading from '../../../../../components/Loading'

const LITERAL_FAPESB = 'FAPESB'

function CardBolsasFapesb(props) {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    const response = await api.scholarship.countScholarshipsGroupingByStatusForAgency(LITERAL_FAPESB)

    if (response.status === 200) {
      setData(response.data[LITERAL_FAPESB])
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }
  }

  useEffect(() => {
    getData().finally(() => setIsLoading(false))
  }, [])

  return (
    isLoading ? <Loading /> : <CardBolsasFapesbView sx={props.sx} isLoading={isLoading} data={data} />
  )
}

CardBolsasFapesb.prototypes = {
  sx: PropTypes.node,
}

export { CardBolsasFapesb }
