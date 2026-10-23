import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '@/services'
import { formatApiError } from '@/helpers/api-error.helper'
import { GerenciamentoBolsasView } from './gerenciamento-bolsas.view'
import { formattedNow } from '@/helpers/formatters.helper'
import {
  readScholarshipListFilters,
  toScholarshipListParams,
  type ScholarshipListFilters,
} from '@/helpers/scholarship.helper'
import { SCHOLARSHIP_STATUS_FILTER_OPTIONS } from '@/constants/status.constant'
import type {
  AdvisorFilterOption,
  FieldChangeEvent,
  FilterOption,
  IdentifiedFilterOption,
  Page,
  ScholarshipDetailedWithRelations,
  ScholarshipFilters,
} from '@/types'

export type ScholarshipPageFilters = ScholarshipListFilters

export type ScholarshipFilterChangeEvent = FieldChangeEvent
export interface ScholarshipFilterOptions {
  scholarshipStatusFilterList: FilterOption[]
  agencyNameFilterList: IdentifiedFilterOption[]
  advisorNameFilterList: AdvisorFilterOption[]
  programNameFilterList: FilterOption[]
  allocationNameFilterList: IdentifiedFilterOption[]
}

const initialStateForAllFilter: FilterOption = {
  key: 'ALL',
  value: 'Todos(as)',
}

const initialFilterOptions: ScholarshipFilterOptions = {
  scholarshipStatusFilterList: [
    initialStateForAllFilter,
    ...SCHOLARSHIP_STATUS_FILTER_OPTIONS,
  ],
  agencyNameFilterList: [initialStateForAllFilter as IdentifiedFilterOption],
  advisorNameFilterList: [initialStateForAllFilter as AdvisorFilterOption],
  programNameFilterList: [initialStateForAllFilter],
  allocationNameFilterList: [
    initialStateForAllFilter as IdentifiedFilterOption,
  ],
}

interface GetScholarshipsParams {
  size: number
  page: number
  filters: ScholarshipPageFilters
}

function GerenciamentoBolsas() {
  const [data, setData] = useState<
    Partial<Page<ScholarshipDetailedWithRelations>>
  >({})
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(5)
  const [filterOptions, setFilterOptions] =
    useState<ScholarshipFilterOptions>(initialFilterOptions)
  // Os filtros moram na URL: qualquer link /bolsas?... ja abre filtrado.
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = useMemo(
    () => readScholarshipListFilters(searchParams),
    [searchParams]
  )
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogForFiltersOpen, setIsDialogForFiltersOpen] = useState(false)

  const handleDialogForFiltersClose = () => {
    setIsDialogForFiltersOpen(false)
  }

  const handleDialogForFiltersOpen = () => {
    setIsDialogForFiltersOpen(true)
  }

  const handleFiltersValueChange = (e: ScholarshipFilterChangeEvent) => {
    setSearchParams(
      toScholarshipListParams({ ...filters, [e.target.name]: e.target.value }),
      { replace: true }
    )
  }

  const handleFiltersReset = () => {
    setSearchParams({}, { replace: true })
  }

  const getScholarships = async ({
    size,
    page,
    filters,
  }: GetScholarshipsParams) => {
    const trimmedFilters: ScholarshipFilters = Object.fromEntries(
      Object.entries(filters).map(
        ([key, value]) =>
          [key, typeof value === 'string' ? value.trim() : value] as const
      )
    )
    const response = await api.scholarship.getScholarships(
      page,
      size,
      trimmedFilters
    )

    if (response.status === 200) {
      setData(response.data)
    } else {
      toast.error(formatApiError(response.status, response.data))
    }
  }

  const copyScholarshipStudentsEmails = async () => {
    const trimmedFilters: ScholarshipFilters = Object.fromEntries(
      Object.entries(filters).map(
        ([key, value]) =>
          [key, typeof value === 'string' ? value.trim() : value] as const
      )
    )
    const response =
      await api.scholarship.copyFilteredScholarshipsStudentsEmails(
        trimmedFilters
      )

    if (response.status === 200) {
      await navigator.clipboard.writeText(response.data)
      alert('Lista de e-mails copiada com sucesso!')
    } else {
      toast.error(formatApiError(response.status, response.data))
    }
  }

  const handleReportDownload = async () => {
    try {
      const response = await api.report.downloadPdfReport()

      if (response.status === 200) {
        // Cria um Blob a partir dos dados da resposta
        const blob = new Blob([response.data], { type: 'application/pdf' })
        const url = window.URL.createObjectURL(blob)

        // Define o nome do arquivo
        const filename = 'relatorio_sgb_' + formattedNow() + '.pdf'

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
      toast.error(
        `Erro ao baixar o relatório: ${
          error instanceof Error ? error.message : String(error)
        }`
      )
    }
  }

  const getFilterOptions = async () => {
    try {
      const agencyRequest = api.agency.getAgencyFilterList()
      const advisorRequest = api.user.getAdvisorFilterList()
      const programRequest = api.enrollment.getEnrollmentProgramFilterList()
      const allocationRequest = api.allocation.getAllocationFilterList()

      const response = await Promise.all([
        agencyRequest,
        programRequest,
        advisorRequest,
        allocationRequest,
      ])

      if (response.length > 0) {
        const agencyList = response[0].data
        const programList = response[1].data
        const advisorList = response[2].data
        const allocationList = response[3].data

        setFilterOptions({
          scholarshipStatusFilterList:
            initialFilterOptions.scholarshipStatusFilterList,
          agencyNameFilterList:
            initialFilterOptions.agencyNameFilterList.concat(agencyList),
          programNameFilterList:
            initialFilterOptions.programNameFilterList.concat(programList),
          advisorNameFilterList:
            initialFilterOptions.advisorNameFilterList.concat(advisorList),
          allocationNameFilterList:
            initialFilterOptions.allocationNameFilterList.concat(
              allocationList
            ),
        })
      }
    } catch (error) {
      toast.error(`Não foi possível carregar as opções de filtragem.`)
    }
  }

  const deleteScholarship = async (scholarshipId: number) => {
    const response = await api.scholarship.deleteScholarship(scholarshipId)

    if (response.status === 204) {
      toast.success('Bolsa excluída com sucesso.')
    } else {
      toast.error(formatApiError(response.status, response.data))
    }

    await getScholarships({ size, page, filters })
  }

  useEffect(() => {
    getScholarships({ size, page, filters }).finally(() => setIsLoading(false))
  }, [size, page, filters])

  useEffect(() => {
    getFilterOptions()
  }, [])

  return (
    <GerenciamentoBolsasView
      data={data}
      page={page}
      setPage={setPage}
      size={size}
      setSize={setSize}
      filters={filters}
      setFilters={handleFiltersValueChange}
      handleResetFilters={handleFiltersReset}
      filterOptions={filterOptions}
      isLoading={isLoading}
      onDeleteScholarship={deleteScholarship}
      isDialogForFiltersOpen={isDialogForFiltersOpen}
      handleReportDownload={handleReportDownload}
      handleDialogForFiltersOpen={handleDialogForFiltersOpen}
      handleDialogForFiltersClose={handleDialogForFiltersClose}
      copyScholarshipStudentsEmails={copyScholarshipStudentsEmails}
    />
  )
}

export { GerenciamentoBolsas }
