import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../../../../api'
import { PieChartBolsasDoutoradoView } from './PieChartBolsasDoutoradoView'

const LITERAL_DOUTORADO = 'DOUTORADO'

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

function PieChartBolsasDoutorado(props) {
  const [data, setData] = useState(initialState)
  const [dataTotal, setDataTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    const response = await api.scholarship.countOnGoingScholarshipsGroupingByAgencyForCourse(LITERAL_DOUTORADO)

    if (response.status === 200) {
      const responseData = Object.keys(response.data).length > 0 ?
        response.data[LITERAL_DOUTORADO] : initialState

      setData(responseData)
      let total = 0;
      Object.values(responseData).forEach((value) => total += parseInt(value.count))
      setDataTotal(total)
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }
  }

  useEffect(() => {
    getData().finally(() => setIsLoading(false))
  }, [])

  return (
    <PieChartBolsasDoutoradoView sx={props.sx} isLoading={isLoading} data={data} total={dataTotal}/>
  )
}

PieChartBolsasDoutorado.prototypes = {
  sx: PropTypes.node,
}

export { PieChartBolsasDoutorado }
