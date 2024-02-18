import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../api'
import { DashboardMetricasView } from './DashboardMetricasView'

function DashboardMetricas() {
  const [isLoading, setIsLoading] = useState(true)
  const [alunosDataChart, setAlunosDataChart] = useState(null)
  const [bolsasDataChart, setBolsasDataChart] = useState({})
  const [cnpqDataCard, setCnpqDataCard] = useState({})
  const [fapesbDataCard, setFapesbDataCard] = useState({})
  const [capesDataCard, setCapesDataCard] = useState({})

  const getAnalytics = async () => {
    const response = await api.analytics.getAnalytics()

    if (response.status === 200) {
      const {
        studentsHavingScholarship,
        scholarshipGroupedByAgencyAndCourse,
        scholarshipGroupedByAgencyAndYear
      } = response.data

      setAlunosDataChart(studentsHavingScholarship)
      setBolsasDataChart(scholarshipGroupedByAgencyAndCourse)
      setCnpqDataCard(scholarshipGroupedByAgencyAndYear.CNPQ)
      setFapesbDataCard(scholarshipGroupedByAgencyAndYear.FAPESB)
      setCapesDataCard(scholarshipGroupedByAgencyAndYear.CAPES)
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
        alunosDataChart={alunosDataChart}
        bolsasDataChart={bolsasDataChart}
        cnpqDataCard={cnpqDataCard}
        fapesbDataCard={fapesbDataCard}
        capesDataCard={capesDataCard}
        isLoading={isLoading}
      />
    </div>
  )
}

export { DashboardMetricas }
