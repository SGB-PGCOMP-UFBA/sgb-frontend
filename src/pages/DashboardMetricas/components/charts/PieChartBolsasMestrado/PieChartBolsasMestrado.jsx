import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../../../../api'
import { PieChartBolsasMestradoView } from './PieChartBolsasMestradoView'

const LITERAL_MESTRADO = 'MESTRADO'

const initialState = {
  CAPES: {
    count: 0
  },
  CNPQ: {
    count: 0
  },
  FAPESB: {
    count: 0
  }
}

function PieChartBolsasMestrado(props) {
  const [data, setData] = useState(initialState)
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    const response = await api.scholarship.countOnGoingScholarshipsGroupingByAgencyForCourse(LITERAL_MESTRADO)

    if (response.status === 200) {
      const responseData = Object.keys(response.data).length > 0 ?
        response.data[LITERAL_MESTRADO] : initialState

      setData(responseData)
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }
  }

  useEffect(() => {
    getData().finally(() => setIsLoading(false))
  }, [])

  return (
    <PieChartBolsasMestradoView sx={props.sx} isLoading={isLoading} data={data} />
  )
}

PieChartBolsasMestrado.prototypes = {
  sx: PropTypes.node,
}

export { PieChartBolsasMestrado }
