import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../api'
import { DashboardMetricasView } from './DashboardMetricasView'

const initialCardData = {
  count: 0,
  growthOverLastYear: 0,
  lastYearAmount: 0,
  currentYearAmount: 0
}

function DashboardMetricas() {
  const [isLoading, setIsLoading] = useState(true)
  const [totalDataCard, setTotalDataCard] = useState(0)
  const [cnpqDataCard, setCnpqDataCard] = useState(initialCardData)
  const [fapesbDataCard, setFapesbDataCard] = useState(initialCardData)
  const [capesDataCard, setCapesDataCard] = useState(initialCardData)

  const getAnalytics = async () => {
    const response = await api.analytics.getAnalytics()

    if (response.status === 200) {
      setTotalDataCard(response.data.total)
      if (response.data.cnpq) setCnpqDataCard(response.data.cnpq)
      if (response.data.fapesb) setFapesbDataCard(response.data.fapesb)
      if (response.data.capes) setCapesDataCard(response.data.capes)
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }
  }

  useEffect(() => {
    getAnalytics().finally(() => setIsLoading(false))
  }, [])

  return (
    <div>
      <DashboardMetricasView
        totalDataCard={totalDataCard}
        cnpqDataCard={cnpqDataCard}
        fapesbDataCard={fapesbDataCard}
        capesDataCard={capesDataCard}
        isLoading={isLoading}
      />
    </div>
  )
}

export { DashboardMetricas }
