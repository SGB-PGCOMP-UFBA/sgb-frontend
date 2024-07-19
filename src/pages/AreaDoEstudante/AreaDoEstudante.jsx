import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AreaDoEstudanteView } from './AreaDoEstudanteView'
import { api } from '../../api'
import { getUserFromLocalStorage, updateUserFromLocalStorage } from '../../helpers/auth-user'

function AreaDoEstudante() {
  const user = getUserFromLocalStorage()
  const [student, setStudent] = useState({})
  const [agencies, setAgencies] = useState([])
  const [advisors, setAdvisors] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getAdvisors = async () => {
      try {
        const response = await api.advisor.getAdvisorFilterList()

        if (response.status === 200) {
          setAdvisors(response.data.slice(1))
        }
      } catch (error) {
        toast.error('Ocorreu um erro na consulta de orientadores.')
      }
    }

    const getAgencies = async () => {
      try {
        const response = await api.agency.getAgencyFilterList()

        if (response.status === 200) {
          setAgencies(response.data)
        }
      } catch (error) {
        toast.error('Ocorreu um erro na consulta de agências.')
      }
    }

    const getStudent = async () => {
      try {
        const response = await api.student.getStudentsByEmail(user.email)

        if (response.status === 200) {
          setStudent(response.data)
          updateUserFromLocalStorage({ link_to_lattes: response.data.link_to_lattes })
        }
      } catch (error) {
        toast.error('Ocorreu um erro na consulta de dados do estudante.')
      }
    }

    const fetchData = async () => {
      await getAdvisors()
      await getAgencies()
      await getStudent()
      setIsLoading(false)
    }

    fetchData()
  }, [user.email])

  return (
    <AreaDoEstudanteView
      isLoading={isLoading}
      student={student}
      advisors={advisors}
      agencies={agencies}
    />
  )
}

export { AreaDoEstudante }
