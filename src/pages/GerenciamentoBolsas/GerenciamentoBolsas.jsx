import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../api'
import { GerenciamentoBolsasView } from './GerenciamentoBolsasView'

function GerenciamentoBolsas() {
  const [scholarships, setScholarships] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getScholarships = async () => {
    const filters = { scholarshipStatus: 'ON_GOING'}

    const response = await api.scholarship.getScholarships(1, 10, filters)

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
  }, [])

  return (
    <GerenciamentoBolsasView
      isLoading={isLoading}
      data={scholarships}
      onDelete={deleteScholarship}
    />
  )
}

export { GerenciamentoBolsas }
