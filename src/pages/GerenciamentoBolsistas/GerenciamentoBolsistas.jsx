import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../api'
import { GerenciamentoBolsistasView } from './GerenciamentoBolsistasView'
import { formattedNow, parseDate } from '../../helpers/formatters'

const initialStateForAllFilter = {
  key: 'ALL',
  value: 'Todos(as)'
}

const initialFilterOptions = {
  scholarshipStatusFilterList: [initialStateForAllFilter],
  agencyNameFilterList: [initialStateForAllFilter],
  advisorNameFilterList: [initialStateForAllFilter],
  programNameFilterList: [initialStateForAllFilter],
  allocationNameFilterList: [initialStateForAllFilter],
}

const initialFilters = {
  scholarshipStatus: 'ON_GOING',
  agencyName: 'CAPES',
  advisorName: 'ALL',
  programName: 'MESTRADO',
  allocationName: 'ALL',
  orderBy: 'DAT_TERMINO_ASC',
  studentName: '',
}

const resetedFilters = {
  scholarshipStatus: 'ALL',
  agencyName: 'ALL',
  advisorName: 'ALL',
  programName: 'ALL',
  allocationName: 'ALL',
  orderBy: 'DAT_TERMINO_DESC',
  studentName: '',
}

function GerenciamentoBolsistas() {
  const [data, setData] = useState({})
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(5)
  const [filterOptions, setFilterOptions] = useState(initialFilterOptions)
  const [filters, setFilters] = useState(initialFilters)
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogForFiltersOpen, setIsDialogForFiltersOpen] = useState(false)

  const handleDialogForFiltersClose = () => {
    setIsDialogForFiltersOpen(false)
  }

  const handleDialogForFiltersOpen = () => {
    setIsDialogForFiltersOpen(true)
  }

  const handleFiltersValueChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleFiltersReset = () => {
    setFilters(resetedFilters)
  }

  const getScholarships = async ({ size, page, filters }) => {
    const trimmedFilters = Object.fromEntries(
      Object.entries(filters).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value])
    )
    const response = await api.scholarship.getScholarships(page, size, trimmedFilters)

    if (response.status === 200) {
      setData(response.data)
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
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
        toast.error(`[${response.status}]: ${response.data.error}`);
      }
    } catch (error) {
      toast.error(`Erro ao baixar o relatório: ${error.message}`);
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

  const updateScholarship = async (data) => {
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
      toast.error(`Erro ao atualizar a bolsa: ${error.response.data.message}`)
    }

    await getScholarships({ size, page, filters })
  }

  const deleteScholarship = async (scholarshipId) => {
    const response = await api.scholarship.deleteScholarship(scholarshipId)

    if (response.status === 204) {
      toast.success('Bolsa excluída com sucesso.')
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
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
    />
  )
}

export { GerenciamentoBolsistas }
