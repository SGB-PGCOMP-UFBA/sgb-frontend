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

  const [enrollmentTabIndex, setEnrollmentTabIndex] = React.useState(0)

  const handleChangeEnrollmentTab = (event, newValue) => {
    setEnrollmentTabIndex(newValue)
  }

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
        setEnrollmentTabIndex(student.enrollments.length)
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
      toast.error('Ocorreu um erro na criação da bolsa.')
    }
  }

  const handleDeleteEnrollment = async (enrollmentId) => {
    const response = await api.enrollment.deleteEnrollment(enrollmentId)

    if (response.status === 204) {
      setEnrollmentTabIndex(student.enrollments.length - 2)
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
      enrollmentTabIndex={enrollmentTabIndex}
      handleChangeEnrollmentTab={handleChangeEnrollmentTab}
      onChangeEnrollmentTab={handleChangeEnrollmentTab}
      onCreateNewEnrollment={handleCreateNewEnrollment}
      onCreateNewScholarship={handleCreateNewScholarship}
      onDeleteEnrollment={handleDeleteEnrollment}
      onDeleteScholarship={handleDeleteScholarship}
    />
  )
}

export { AreaDoEstudante }
