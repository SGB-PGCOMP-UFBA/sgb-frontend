import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../../../../api'
import { PieChartBolsasMestradoView } from './PieChartBolsasMestradoView'

const LITERAL_MESTRADO = 'MESTRADO'

function PieChartBolsasMestrado(props) {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    const response = await api.scholarship.countOnGoingScholarshipsGroupingByAgencyForCourse(LITERAL_MESTRADO)

    if (response.status === 200) {
      setData(response.data[LITERAL_MESTRADO])
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
