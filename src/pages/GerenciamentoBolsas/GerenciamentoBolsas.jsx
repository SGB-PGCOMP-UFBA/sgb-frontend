import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../api'
import { GerenciamentoBolsasView } from './GerenciamentoBolsasView'

const initialFilters = {
  scholarshipStatus: null,
  agencyName: null,
  advisorName: null,
  programName: null
}

function GerenciamentoBolsas() {
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [filters, setFilters] = useState(initialFilters)
  const [isLoading, setIsLoading] = useState(true)
  const [scholarships, setScholarships] = useState([])
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

  const getScholarships = async () => {
    const response = await api.scholarship.getScholarships(page, size, filters)

    if (response.status === 200) {
      setScholarships(response.data.items)
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }
  }

  const deleteScholarship = async (scholarshipId) => {
    const response = await api.scholarship.deleteScholarship(scholarshipId)

    if (response.status === 204) {
      toast.success('Bolsa excluída com sucesso.')
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }

    await getScholarships()
  }

  useEffect(() => {
    getScholarships().finally(() => setIsLoading(false))
  })

  return (
    <GerenciamentoBolsasView
      page={page}
      setPage={setPage}
      size={size}
      setSize={setSize}
      filters={filters}
      setFilters={handleFiltersValueChange}
      isLoading={isLoading}
      scholarships={scholarships}
      onDeleteScholarship={deleteScholarship}
      isDialogForFiltersOpen={isDialogForFiltersOpen}
      handleDialogForFiltersOpen={handleDialogForFiltersOpen}
      handleDialogForFiltersClose={handleDialogForFiltersClose}
    />
  )
}

export { GerenciamentoBolsas }
