import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../../../../api'
import { ColumnChartHistogramaBolsasView } from './ColumnChartHistogramaBolsasView'

function ColumnChartHistogramaBolsas(props) {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    const response = await api.scholarship.countScholarshipsGroupingByCourseAndYear()

    if (response.status === 200) {
      setData(response.data)
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }
  }

  useEffect(() => {
    getData().finally(() => setIsLoading(false))
  }, [])

  return (
    <ColumnChartHistogramaBolsasView sx={props.sx} isLoading={isLoading} data={data} />
  )
}

ColumnChartHistogramaBolsas.prototypes = {
  sx: PropTypes.node
}

export { ColumnChartHistogramaBolsas }
