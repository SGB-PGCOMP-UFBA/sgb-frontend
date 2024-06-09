import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../api'
import { GerenciamentoBolsasView } from './GerenciamentoBolsasView'
import { formattedNow } from '../../helpers/formatters'

const initialStateForAllFilter = {
  key: 'ALL',
  value: 'Todos(as)'
}

const initialFilterOptions = {
  scholarshipStatusFilterList: [initialStateForAllFilter],
  agencyNameFilterList: [initialStateForAllFilter],
  advisorNameFilterList: [initialStateForAllFilter],
  programNameFilterList: [initialStateForAllFilter]
}

const initialFilters = {
  scholarshipStatus: 'ALL',
  agencyName: 'ALL',
  advisorName: 'ALL',
  programName: 'ALL'
}

function GerenciamentoBolsas() {
  const [data, setData] = useState({})
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
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

  const handleFiltersReset = (e) => {
    setFilters(initialFilters)
  }

  const getScholarships = async ({size, page, filters}) => {
    const response = await api.scholarship.getScholarships(page, size, filters)

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
        const filename = 'relatorio_sab_' + formattedNow() + '.pdf'

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
    const agencyRequest = api.agency.getAgencyFilterList()
    const advisorRequest = api.advisor.getAdvisorFilterList()
    const programRequest = api.enrollment.getEnrollmentProgramFilterList()
    const scholarshipStatusRequest = api.scholarship.getScholarshipStatusFilterList()

    const response = await Promise.all([
      scholarshipStatusRequest,
      agencyRequest,
      programRequest,
      advisorRequest
    ])

    if (response.length > 0) {
      const scholarshipsList = response[0].data
      const agencyList = response[1].data
      const programList = response[2].data
      const advisorList = response[3].data

      setFilterOptions({
        scholarshipStatusFilterList: initialFilterOptions.scholarshipStatusFilterList.concat(scholarshipsList),
        agencyNameFilterList: initialFilterOptions.agencyNameFilterList.concat(agencyList),
        programNameFilterList: initialFilterOptions.programNameFilterList.concat(programList),
        advisorNameFilterList: initialFilterOptions.advisorNameFilterList.concat(advisorList)
      })
    } else {
      toast.error(`Não foi possível carregar as opções de filtragem.`)
    }
  }

  const deleteScholarship = async (scholarshipId) => {
    const response = await api.scholarship.deleteScholarship(scholarshipId)

    if (response.status === 204) {
      toast.success('Bolsa excluída com sucesso.')
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }

    await getScholarships({size, page, filters})
  }

  useEffect(() => {
    getScholarships({size, page, filters}).finally(() => setIsLoading(false))
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
    />
  )
}

export { GerenciamentoBolsas }
