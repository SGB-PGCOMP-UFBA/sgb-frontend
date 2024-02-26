import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../api'
import { GerenciamentoBolsasView } from './GerenciamentoBolsasView'

function GerenciamentoBolsas() {
  const [scholarships, setScholarships] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getScholarships = async () => {
    const response = await api.scholarship.getScholarships()

    if (response.status === 200) {
      setScholarships(response.data)
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }
  }

  useEffect(() => {
    getScholarships().finally(() => setIsLoading(false))
  }, [])

  return (
    <div>
      <GerenciamentoBolsasView isLoading={isLoading} data={scholarships} />
    </div>
  )
}

export { GerenciamentoBolsas }
