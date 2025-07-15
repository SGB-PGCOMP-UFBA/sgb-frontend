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
  const [dataTotal, setDataTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    const scholarshipStatus = props.scholarshipStatus ?? null
    const response = await api.scholarship.countScholarshipsGroupingByAgencyForCourse(LITERAL_MESTRADO, scholarshipStatus)

    if (response.status === 200) {
      const responseData = Object.keys(response.data).length > 0 ?
        response.data[LITERAL_MESTRADO] : initialState

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
    <PieChartBolsasMestradoView sx={props.sx} isLoading={isLoading} data={data} total={dataTotal} scholarshipStatus={props.scholarshipStatus}/>
  )
}

PieChartBolsasMestrado.propTypes = {
  sx: PropTypes.node,
  scholarshipStatus: PropTypes.string,
}

export { PieChartBolsasMestrado }
