import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../api'
import { GerenciamentoOrientandosView } from './GerenciamentoOrientandosView'
import { getUserFromLocalStorage } from '../../helpers/auth-user'

function GerenciamentoOrientandos() {
  const user = getUserFromLocalStorage()
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await api.student.getStudentsByAdvisorId(user.id)

        if (response.status === 200) {
          setStudents(response.data)
        } else {
          toast.error(`[${response.status}]: ${response.data.error}`)
        }
      } catch (error) {
        toast.error('Ocorreu um erro ao consultar sua lista de orientandos.')
      } finally {
        setIsLoading(false)
      }
    };

    getStudents()
  }, [user.id])

  return <GerenciamentoOrientandosView isLoading={isLoading} data={students} />
}

export { GerenciamentoOrientandos }
