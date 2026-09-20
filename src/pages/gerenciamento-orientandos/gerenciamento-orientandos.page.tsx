import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '@/services'
import { GerenciamentoOrientandosView } from './gerenciamento-orientandos.view'
import { getUserFromLocalStorage } from '@/helpers/auth-user.helper'
import { formatApiError } from '@/helpers/api-error.helper'
import type { StudentDetailedWithFullRelations } from '@/types'

function GerenciamentoOrientandos() {
  const user = getUserFromLocalStorage()
  const [students, setStudents] = useState<StudentDetailedWithFullRelations[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getStudents = async () => {
      try {
        if (!user) {
          return
        }

        const response = await api.student.getStudentsByAdvisorId(user.id)

        if (response.status === 200) {
          setStudents(response.data)
        } else {
          toast.error(formatApiError(response.status, response.data))
        }
      } catch {
        toast.error('Ocorreu um erro ao consultar sua lista de orientandos.')
      } finally {
        setIsLoading(false)
      }
    }

    getStudents()
  }, [user])

  return <GerenciamentoOrientandosView isLoading={isLoading} data={students} />
}

export { GerenciamentoOrientandos }
