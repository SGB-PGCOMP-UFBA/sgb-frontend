import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../api'
import { GerenciamentoOrientandosView } from './GerenciamentoOrientandosView'
import { getUserFromLocalStorage } from '../../utils/auth-user'

function GerenciamentoOrientandos() {
  const user = getUserFromLocalStorage()
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getStudents = async () => {
    const response = await api.student.getStudentsByAdvisorId(user.id)

    if (response.status === 200) {
      setStudents(response.data)
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }
  }

  useEffect(() => {
    getStudents().finally(() => setIsLoading(false))
  }, [])

  return <GerenciamentoOrientandosView isLoading={isLoading} data={students} />
}

export { GerenciamentoOrientandos }
