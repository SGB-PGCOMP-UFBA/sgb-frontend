import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import type { SxProps, Theme } from '@mui/material'
import { api } from '../../../../../api'
import type { CountByAgencyAndCourse } from '../../../../../api/scholarship'
import { formatApiError } from '../../../../../helpers/api-error'
import type { ScholarshipStatus } from '../../../../../types'
import { PieChartBolsasMestradoView } from './PieChartBolsasMestradoView'

const LITERAL_MESTRADO = 'MESTRADO'

const initialState: CountByAgencyAndCourse[string] = {
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

export interface PieChartBolsasMestradoProps {
  sx?: SxProps<Theme>
  scholarshipStatus?: ScholarshipStatus
}

function PieChartBolsasMestrado(props: PieChartBolsasMestradoProps) {
  const [data, setData] = useState<CountByAgencyAndCourse[string]>(initialState)
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
      Object.values(responseData).forEach((value) => total += parseInt(String(value.count)))
      setDataTotal(total)
    } else {
      toast.error(formatApiError(response.status, response.data))
    }
  }

  useEffect(() => {
    getData().finally(() => setIsLoading(false))
  }, [])

  return (
    <PieChartBolsasMestradoView sx={props.sx} isLoading={isLoading} data={data} total={dataTotal} scholarshipStatus={props.scholarshipStatus}/>
  )
}

export { PieChartBolsasMestrado }
