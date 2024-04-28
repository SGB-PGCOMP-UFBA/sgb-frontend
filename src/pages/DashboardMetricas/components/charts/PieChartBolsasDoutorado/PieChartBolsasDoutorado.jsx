import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../../../../api'
import { PieChartBolsasDoutoradoView } from './PieChartBolsasDoutoradoView'

const LITERAL_DOUTORADO = 'DOUTORADO'

function PieChartBolsasDoutorado(props) {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    const response = await api.scholarship.countOnGoingScholarshipsGroupingByAgencyForCourse(LITERAL_DOUTORADO)

    if (response.status === 200) {
      setData(response.data[LITERAL_DOUTORADO])
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }
  }

  useEffect(() => {
    getData().finally(() => setIsLoading(false))
  }, [])

  return (
    <PieChartBolsasDoutoradoView sx={props.sx} isLoading={isLoading} data={data} />
  )
}

PieChartBolsasDoutorado.prototypes = {
  sx: PropTypes.node,
}

export { PieChartBolsasDoutorado }
