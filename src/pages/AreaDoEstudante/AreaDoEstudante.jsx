import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AreaDoEstudanteView } from './AreaDoEstudanteView'
import { api } from '../../api'
import { getUserFromLocalStorage, updateUserFromLocalStorage, removeUserFromLocalStorage } from '../../helpers/auth-user'
import { parseDate } from '../../helpers/formatters'

function AreaDoEstudante() {
  const [student, setStudent] = useState({})
  const [agencies, setAgencies] = useState([])
  const [advisors, setAdvisors] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getAdvisors = async () => {
    try {
      const response = await api.advisor.getAdvisorFilterList()

      if (response.status === 200) {
        setAdvisors(response.data)
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
    const user = getUserFromLocalStorage()

    try {
      const response = await api.student.getStudentsByEmail(user.email)

      if (response.status === 200) {
        setStudent(response.data)
        updateUserFromLocalStorage({ link_to_lattes: response.data.link_to_lattes })
      }
    } catch (error) {
      toast.error('Ocorreu um erro na consulta de dados do estudante.')
      removeUserFromLocalStorage()
    }
  }

  const handleCreateNewEnrollment = async (data) => {
    try {
      const response = await api.enrollment.createEnrollment({
        ...data,
        student_email: student.email,
        enrollment_date: parseDate(data.enrollment_date),
        defense_prediction_date: parseDate(data.defense_prediction_date)
      })

      if ([200, 201].includes(response.status)) {
        toast.success('Matrícula criada com sucesso.')
        await getStudent()
      }
    }
    catch (error) {
      toast.error('Ocorreu um erro na criação da matrícula.')
    }
  }

  const handleCreateNewScholarship = async (data) => {
    try {
      const response = await api.scholarship.createScholarship({
        ...data,
        student_email: student.email,
        scholarship_starts_at: parseDate(data.scholarship_starts_at),
        scholarship_ends_at: parseDate(data.scholarship_ends_at),
        salary: Number(data.salary.replace(/[^\d,]/g, '').replace(',', '.'))
      })

      if ([200, 201].includes(response.status)) {
        toast.success('Bolsa criada com sucesso.')
        await getStudent()
      }
    }
    catch (error) {
      toast.error(error.response.data.message ? error.response.data.message : 'Ocorreu um erro na criação da bolsa.')
    }
  }

  const handleDeleteEnrollment = async (enrollmentId) => {
    const response = await api.enrollment.deleteEnrollment(enrollmentId)

    if (response.status === 204) {
      toast.success('Matrícula excluída com sucesso.')
      await getStudent()
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }
  }

  const handleDeleteScholarship = async (scholarshipId) => {
    const response = await api.scholarship.deleteScholarship(scholarshipId)

    if (response.status === 204) {
      toast.success('Bolsa excluída com sucesso.')
      await getStudent()
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }
  }

  const handleUpdateEnrollment = async (data) => {
    try {
      const updateEnrollment = api.enrollment.updateEnrollment(data.enrollment_id, {
        advisor_email: data.advisor_email,
        student_email: data.student_email,
        enrollment_program: data.enrollment_program,
        enrollment_number: data.enrollment_number,
        enrollment_date: parseDate(data.enrollment_date),
        defense_prediction_date: parseDate(data.defense_prediction_date)
      })
      const response = await Promise.all([ updateEnrollment ])

      if (response.length > 0) {
        toast.success('As informações da matrícula foram atualizadas com sucesso.')
      }
    } catch (error) {
      toast.error(`Erro ao atualizar a matrícula: ${error.response.data.message}`)
    }

    await getStudent()
  }

  const handleUpdateScholarship = async (data) => {
    try {
      const updateScholarship = api.scholarship.updateScholarship(data.scholarship_id, {
        enrollment_id: data.enrollment_id,
        student_email: data.student_email,
        status: data.status,
        agency_id: data.agency_id,
        scholarship_starts_at: parseDate(data.scholarship_starts_at),
        scholarship_ends_at: parseDate(data.scholarship_ends_at),
        extension_ends_at: data.extension_ends_at !== null ? parseDate(data.extension_ends_at) : null,
        salary: Number(data.salary.replace(/[^\d,]/g, '').replace(',', '.'))
      })

      const response = await Promise.all([ updateScholarship ])

      if (response.length > 0) {
        toast.success('As informações da bolsa foram atualizadas com sucesso.')
      }
    } catch (error) {
      toast.error(`Erro ao atualizar a bolsa: ${error.response.data.message}`)
    }

    await getStudent()
  }

  useEffect(() => {
    const fetchData = async () => {
      await getAdvisors()
      await getAgencies()
      await getStudent()
      setIsLoading(false)
    }
    fetchData()
  }, [])

  return (
    <AreaDoEstudanteView
      isLoading={isLoading}
      student={student}
      advisors={advisors}
      agencies={agencies}
      onCreateNewEnrollment={handleCreateNewEnrollment}
      onCreateNewScholarship={handleCreateNewScholarship}
      onUpdateEnrollment={handleUpdateEnrollment}
      onUpdateScholarship={handleUpdateScholarship}
      onDeleteEnrollment={handleDeleteEnrollment}
      onDeleteScholarship={handleDeleteScholarship}
    />
  )
}

export { AreaDoEstudante }
