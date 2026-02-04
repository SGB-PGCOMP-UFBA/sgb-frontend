import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../api'
import { RelatorioQuadrienalView } from './RelatorioQuadrienalView'
import { formattedNow } from '../../helpers/formatters'

function RelatorioQuadrienal() {
  const [data, setData] = useState()
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(5)
  const [isLoading, setIsLoading] = useState(false)
  const [minEndDate, setMinEndDate] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const handleStartDateChange = newDate => {
    setStartDate(newDate)
    setMinEndDate(newDate)
  }

  const handleResetDates = () => {
    setStartDate(null)
    setEndDate(null)
    setMinEndDate(null)
  }

  const generateScholarshipsReportByPeriod = async () => {
    setIsLoading(true)
    const stringStartDate = new Date(startDate).toISOString()
    const stringEndDate = new Date(endDate).toISOString()
    const response =
      await api.scholarship.countScholarshipsAsReportBetweenDates(
        stringStartDate,
        stringEndDate
      )

    if (response.status === 200) {
      setData(response.data)
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }
    setIsLoading(false)
  }

  const handleReportDownload = async format => {
    if (!startDate || !endDate) {
      toast.error('Por favor, selecione as datas antes de exportar.')
      return
    }

    try {
      const response = await api.report.quadrennialReport(format, {
        startDate: startDate.toLocaleDateString('pt-BR'),
        endDate: endDate.toLocaleDateString('pt-BR'),
        data: data,
      })

      if (response.status === 201) {
        // Cria um Blob a partir dos dados da resposta
        const url = window.URL.createObjectURL(new Blob([response.data]))

        // Define o nome do arquivo
        const filename =
          'Relatorio_sgb_quadrienal_' + formattedNow() + `.${format}`

        // Cria um link para download
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename)

        // Simula o clique no link
        document.body.appendChild(link)
        link.click()

        // Remove o link do DOM
        document.body.removeChild(link)

        // Libera o objeto URL
        window.URL.revokeObjectURL(url)
      } else {
        toast.error(`[${response.status}]: ${response.data.error}`)
      }
    } catch (error) {
      toast.error(`Erro ao baixar o relatório: ${error.message}`)
    }
  }

  return (
    <RelatorioQuadrienalView
      data={data}
      page={page}
      setPage={setPage}
      size={size}
      setSize={setSize}
      isLoading={isLoading}
      handleReportDownload={handleReportDownload}
      startDate={startDate}
      endDate={endDate}
      setEndDate={setEndDate}
      minEndDate={minEndDate}
      handleStartDateChange={handleStartDateChange}
      handleResetDates={handleResetDates}
      generateScholarshipsReportByPeriod={generateScholarshipsReportByPeriod}
    />
  )
}

export { RelatorioQuadrienal }
