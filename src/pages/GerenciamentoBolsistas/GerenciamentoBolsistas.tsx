import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import type { SelectChangeEvent } from '@mui/material'
import { api } from '../../api'
import { formatApiError } from '../../helpers/api-error'
import { GerenciamentoBolsistasView } from './GerenciamentoBolsistasView'
import { formattedNow, parseDate } from '../../helpers/formatters'
import type { EdicaoBolsistaSubmitValues } from './components/DialogEdicaoBolsista'
import type {
  AdvisorFilterOption,
  FilterOption,
  IdentifiedFilterOption,
  Page,
  ScholarshipDetailedWithRelations,
  ScholarshipFilters
} from '../../types'

function extractApiMessage(error: unknown): string | undefined {
  if (!axios.isAxiosError(error)) {
    return undefined
  }

  const data: unknown = error.response?.data

  if (data && typeof data === 'object' && 'message' in data && typeof data.message === 'string') {
    return data.message
  }

  return undefined
}

/**
 * Os filtros da tela estao sempre preenchidos — o coringa aceito pelo backend
 * e a string 'ALL', nunca a ausencia do campo —, dai o `Required` sobre o
 * contrato da API, onde todos os campos sao opcionais.
 */
export type ScholarshipPageFilters = Required<ScholarshipFilters>

/**
 * Evento entregue pelos controles de filtro: o `TextField` e o `Select` do MUI
 * na propria tela e o `<select>` nativo do `SelectInput` no dialogo de filtros.
 * Todos expoem `target.name` e `target.value`.
 */
export type ScholarshipFilterChangeEvent =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  | SelectChangeEvent<string>

/**
 * Listas que alimentam os <Select> de filtro. Cada uma comeca com o sentinel
 * "Todos(as)" e e completada pelos mappers `forFilter` do backend, que sao os
 * unicos a trazer `id` (agencia/alocacao) e `email` (orientador).
 */
export interface ScholarshipFilterOptions {
  scholarshipStatusFilterList: FilterOption[]
  agencyNameFilterList: IdentifiedFilterOption[]
  advisorNameFilterList: AdvisorFilterOption[]
  programNameFilterList: FilterOption[]
  allocationNameFilterList: IdentifiedFilterOption[]
}

const initialStateForAllFilter: FilterOption = {
  key: 'ALL',
  value: 'Todos(as)'
}

const initialFilterOptions: ScholarshipFilterOptions = {
  scholarshipStatusFilterList: [initialStateForAllFilter],
  agencyNameFilterList: [initialStateForAllFilter as IdentifiedFilterOption],
  advisorNameFilterList: [initialStateForAllFilter as AdvisorFilterOption],
  programNameFilterList: [initialStateForAllFilter],
  allocationNameFilterList: [initialStateForAllFilter as IdentifiedFilterOption],
}

const initialFilters: ScholarshipPageFilters = {
  scholarshipStatus: 'ON_GOING',
  agencyName: 'CAPES',
  advisorName: 'ALL',
  programName: 'MESTRADO',
  allocationName: 'ALL',
  orderBy: 'DAT_TERMINO_ASC',
  studentName: '',
}

const resetedFilters: ScholarshipPageFilters = {
  scholarshipStatus: 'ALL',
  agencyName: 'ALL',
  advisorName: 'ALL',
  programName: 'ALL',
  allocationName: 'ALL',
  orderBy: 'DAT_TERMINO_DESC',
  studentName: '',
}

interface GetScholarshipsParams {
  size: number
  page: number
  filters: ScholarshipPageFilters
}

function GerenciamentoBolsistas() {
  const [data, setData] = useState<Partial<Page<ScholarshipDetailedWithRelations>>>({})
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(5)
  const [filterOptions, setFilterOptions] = useState<ScholarshipFilterOptions>(initialFilterOptions)
  const [filters, setFilters] = useState<ScholarshipPageFilters>(initialFilters)
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogForFiltersOpen, setIsDialogForFiltersOpen] = useState(false)

  const handleDialogForFiltersClose = () => {
    setIsDialogForFiltersOpen(false)
  }

  const handleDialogForFiltersOpen = () => {
    setIsDialogForFiltersOpen(true)
  }

  const handleFiltersValueChange = (e: ScholarshipFilterChangeEvent) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleFiltersReset = () => {
    setFilters(resetedFilters)
  }

  const getScholarships = async ({ size, page, filters }: GetScholarshipsParams) => {
    const trimmedFilters: ScholarshipFilters = Object.fromEntries(
      Object.entries(filters).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value] as const)
    )
    const response = await api.scholarship.getScholarships(page, size, trimmedFilters)

    if (response.status === 200) {
      setData(response.data)
    } else {
      toast.error(formatApiError(response.status, response.data))
    }
  }

  const copyScholarshipStudentsEmails = async () => {
    const trimmedFilters: ScholarshipFilters = Object.fromEntries(
      Object.entries(filters).map(([key, value]) => [
        key,
        typeof value === 'string' ? value.trim() : value,
      ] as const)
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
      const response = await api.report.downloadPdfReport();

      if (response.status === 200) {
        // Cria um Blob a partir dos dados da resposta
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        // Define o nome do arquivo
        const filename = 'relatorio_sgb_' + formattedNow() + '.pdf'

        // Cria um link para download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);

        // Simula o clique no link
        document.body.appendChild(link);
        link.click();

        // Remove o link do DOM
        document.body.removeChild(link);

        // Libera o objeto URL
        window.URL.revokeObjectURL(url);
      } else {
        toast.error(formatApiError(response.status, response.data));
      }
    } catch (error) {
      toast.error(`Erro ao baixar o relatório: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  const getFilterOptions = async () => {
    try {
      const agencyRequest = api.agency.getAgencyFilterList()
      const advisorRequest = api.advisor.getAdvisorFilterList()
      const programRequest = api.enrollment.getEnrollmentProgramFilterList()
      const scholarshipStatusRequest = api.scholarship.getScholarshipStatusFilterList()
      const allocationRequest = api.allocation.getAllocationFilterList()

      const response = await Promise.all([
        scholarshipStatusRequest,
        agencyRequest,
        programRequest,
        advisorRequest,
        allocationRequest,
      ])

      if (response.length > 0) {
        const scholarshipsList = response[0].data
        const agencyList = response[1].data
        const programList = response[2].data
        const advisorList = response[3].data
        const allocationList = response[4].data

        setFilterOptions({
          scholarshipStatusFilterList: initialFilterOptions.scholarshipStatusFilterList.concat(scholarshipsList),
          agencyNameFilterList: initialFilterOptions.agencyNameFilterList.concat(agencyList),
          programNameFilterList: initialFilterOptions.programNameFilterList.concat(programList),
          advisorNameFilterList: initialFilterOptions.advisorNameFilterList.concat(advisorList),
          allocationNameFilterList: initialFilterOptions.allocationNameFilterList.concat(allocationList),
        })
      }
    } catch (error) {
      toast.error(`Não foi possível carregar as opções de filtragem.`)
    }
  }

  const updateScholarship = async (data: EdicaoBolsistaSubmitValues): Promise<false | void> => {
    try {
      const updateStudent = api.student.updateStudent({
        current_email: data.student_email,
        name: data.student_name,
        tax_id: data.student_tax_id.replace(/[^\d,]/g, ''),
        phone_number: data.student_phone_number.replace(/[^\d,]/g, ''),
        link_to_lattes: data.student_link_to_lattes
      })

      const updateEnrollment = api.enrollment.updateEnrollment(data.enrollment_id, {
        advisor_email: data.advisor_email,
        student_email: data.student_email,
        enrollment_program: data.enrollment_program,
        enrollment_date: parseDate(data.enrollment_date),
        defense_prediction_date: parseDate(data.defense_prediction_date)
      })

      const updateScholarship = api.scholarship.updateScholarship(data.scholarship_id, {
        enrollment_id: data.enrollment_id,
        student_email: data.student_email,
        status: data.status,
        agency_id: data.agency_id,
        scholarship_starts_at: parseDate(data.scholarship_starts_at),
        scholarship_ends_at: parseDate(data.scholarship_ends_at),
        extension_ends_at: data.extension_ends_at !== null ? parseDate(data.extension_ends_at) : null,
        salary: Number(data.salary.replace(/[^\d,]/g, '').replace(',', '.')),
        allocation_id: data.allocation_id,
      })

      const response = await Promise.all([
        updateStudent,
        updateEnrollment,
        updateScholarship
      ])

      if (response.length > 0) {
        toast.success('As informações da bolsa foram atualizadas com sucesso.')
      }
    } catch (error) {
      toast.error(`Erro ao atualizar a bolsa: ${extractApiMessage(error)}`)
      return false;
    }

    await getScholarships({ size, page, filters })
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
    <GerenciamentoBolsistasView
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
      onEditScholarship={updateScholarship}
      onDeleteScholarship={deleteScholarship}
      isDialogForFiltersOpen={isDialogForFiltersOpen}
      handleReportDownload={handleReportDownload}
      handleDialogForFiltersOpen={handleDialogForFiltersOpen}
      handleDialogForFiltersClose={handleDialogForFiltersClose}
      copyScholarshipStudentsEmails={copyScholarshipStudentsEmails}
    />
  )
}

export { GerenciamentoBolsistas }
