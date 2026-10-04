import { useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '@/services'
import { RelatorioQuadrienalView } from './relatorio-quadrienal.view'
import { formattedNow } from '@/helpers/formatters.helper'
import { extractApiMessage, formatApiError } from '@/helpers/api-error.helper'
import type { AgencyScholarshipReport } from '@/services/scholarship'
import type { QuadrennialReportFormat } from '@/services/report'
import {
  buildReportSummaryText,
  sumReportTotals,
  type ReportPeriod,
} from './utils/relatorio-quadrienal-summary'

const COPIED_FEEDBACK_MS = 5000

function RelatorioQuadrienal() {
  const [data, setData] = useState<AgencyScholarshipReport[]>()
  const [reportPeriod, setReportPeriod] = useState<ReportPeriod | null>(null)
  const [isSummaryTextVisible, setIsSummaryTextVisible] = useState(false)
  const [isSummaryTextCopied, setIsSummaryTextCopied] = useState(false)
  const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(5)
  const [isLoading, setIsLoading] = useState(true)
  const [minEndDate, setMinEndDate] = useState<Date | null>(null)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const handleStartDateChange = (newDate: Date | null) => {
    setStartDate(newDate)
    setMinEndDate(newDate)
  }

  const generateReport = async (period: ReportPeriod) => {
    setIsLoading(true)
    try {
      const response =
        await api.scholarship.countScholarshipsAsReportBetweenDates(
          period.startDate?.toISOString(),
          period.endDate?.toISOString()
        )

      if (response.status === 200) {
        setData(response.data)
        setReportPeriod(period)
      } else {
        toast.error(formatApiError(response.status, response.data))
      }
    } catch (error) {
      toast.error(
        `Erro ao gerar o relatório: ${
          extractApiMessage(error) ?? 'tente novamente.'
        }`
      )
    } finally {
      setIsLoading(false)
    }
  }

  const generateScholarshipsReportByPeriod = () =>
    generateReport({ startDate, endDate })

  const handleResetDates = () => {
    setStartDate(null)
    setEndDate(null)
    setMinEndDate(null)
    generateReport({ startDate: null, endDate: null })
  }

  useEffect(() => {
    generateReport({ startDate: null, endDate: null })
  }, [])

  const totals = useMemo(() => (data ? sumReportTotals(data) : null), [data])

  const summaryText = useMemo(
    () =>
      reportPeriod && data ? buildReportSummaryText(reportPeriod, data) : null,
    [reportPeriod, data]
  )

  const handleToggleSummaryText = () => {
    setIsSummaryTextVisible(visible => !visible)
  }

  const handleCopySummaryText = async () => {
    if (!summaryText) return

    try {
      await navigator.clipboard.writeText(summaryText)
      setIsSummaryTextCopied(true)
      clearTimeout(copiedTimeoutRef.current)
      copiedTimeoutRef.current = setTimeout(
        () => setIsSummaryTextCopied(false),
        COPIED_FEEDBACK_MS
      )
    } catch {
      toast.error('Não foi possível copiar o texto.')
    }
  }

  useEffect(() => () => clearTimeout(copiedTimeoutRef.current), [])

  const handleReportDownload = async (format: QuadrennialReportFormat) => {
    if (!reportPeriod) {
      toast.error('Gere o relatório antes de exportar.')
      return
    }

    try {
      const response = await api.report.quadrennialReport(format, {
        startDate: reportPeriod.startDate?.toLocaleDateString('pt-BR'),
        endDate: reportPeriod.endDate?.toLocaleDateString('pt-BR'),
        data: data ?? [],
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
        toast.error(formatApiError(response.status, response.data))
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      toast.error(`Erro ao baixar o relatório: ${message}`)
    }
  }

  return (
    <RelatorioQuadrienalView
      data={data}
      totals={totals}
      summaryText={summaryText}
      isSummaryTextVisible={isSummaryTextVisible}
      isSummaryTextCopied={isSummaryTextCopied}
      handleToggleSummaryText={handleToggleSummaryText}
      handleCopySummaryText={handleCopySummaryText}
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
