import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../../../../api'
import { TableTotalBolsasPorAgenciaView } from './TableTotalBolsasPorAgenciaView'

function TableTotalBolsasPorAgencia(props) {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    const response = await api.agency.getAgencys()

    if (response.status === 200) {
      const data = response.data.filter(item => item.name !== "OUTRAS")
      setData(data)
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }
  }

  useEffect(() => {
    getData().finally(() => setIsLoading(false))
  }, [])

  return (
    !isLoading && <TableTotalBolsasPorAgenciaView data={data} sx={props.sx} />
  )
}

TableTotalBolsasPorAgencia.propTypes = {
  sx: PropTypes.node,
}

export { TableTotalBolsasPorAgencia }
