import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AreaDoEstudanteView } from './AreaDoEstudanteView'
import { api } from '../../api'
import { getUserFromLocalStorage, updateUserFromLocalStorage, removeUserFromLocalStorage } from '../../helpers/auth-user'
import { formatApiError } from '../../helpers/api-error'
import { parseDate } from '../../helpers/formatters'
import type { InclusaoMatriculaFormValues } from './components/DialogInclusaoMatricula'
import type { InclusaoBolsaSubmitValues } from './components/DialogInclusaoBolsa'
import type { EdicaoMatriculaSubmitValues } from './components/DialogEdicaoMatricula'
import type { EdicaoBolsaSubmitValues } from './components/DialogEdicaoBolsa'
import type {
  AdvisorFilterOption,
  EnrollmentProgram,
  IdentifiedFilterOption,
  StudentDetailedWithFullRelations
} from '../../types'

function extractApiMessage(error: unknown): string | undefined {
  if (!axios.isAxiosError(error)) {
    return undefined
  }

  const data: unknown = error.response?.data

  if (data && typeof data === 'object' && 'message' in data && typeof data.message === 'string') {
    return data.message
  }

  return undefined
}

function AreaDoEstudante() {
  const [student, setStudent] = useState<StudentDetailedWithFullRelations | null>(null)
  const [agencies, setAgencies] = useState<IdentifiedFilterOption[]>([])
  const [allocations, setAllocations] = useState<IdentifiedFilterOption[]>([])
  const [advisors, setAdvisors] = useState<AdvisorFilterOption[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const getAdvisors = async () => {
    try {
      const response = await api.advisor.getAdvisorFilterList()

      if (response.status === 200) {
        setAdvisors(response.data)
      }
    } catch {
      toast.error('Ocorreu um erro na consulta de orientadores.')
    }
  }

  const getAgencies = async () => {
    try {
      const response = await api.agency.getAgencyFilterList()

      if (response.status === 200) {
        setAgencies(response.data)
      }
    } catch {
      toast.error('Ocorreu um erro na consulta de agências.')
    }
  }

  const getAllocations = async () => {
    try {
      const response = await api.allocation.getAllocationFilterList()

      if (response.status === 200) {
        setAllocations(response.data)
      }
    } catch {
      toast.error('Ocorreu um erro na consulta de alocações.')
    }
  }

  const getStudent = async () => {
    const user = getUserFromLocalStorage()

    if (!user) {
      return
    }

    try {
      const response = await api.student.getStudentsByEmail(user.email)

      if (response.status === 200) {
        setStudent(response.data)
        updateUserFromLocalStorage({ link_to_lattes: response.data.link_to_lattes })
      }
    } catch {
      toast.error('Ocorreu um erro na consulta de dados do estudante.')
      removeUserFromLocalStorage()
    }
  }

  const handleCreateNewEnrollment = async (data: InclusaoMatriculaFormValues) => {
    if (!student) {
      return
    }

    try {
      const payload = {
        ...data,
        student_email: student.email,
        enrollment_date: parseDate(data.enrollment_date),
        defense_prediction_date: parseDate(data.defense_prediction_date)
      }

      const response = await api.enrollment.createEnrollment(
        payload
      )

      if ([200, 201].includes(response.status)) {
        toast.success('Matrícula criada com sucesso.')
        await getStudent()
      }
    }
    catch {
      toast.error('Ocorreu um erro na criação da matrícula.')
    }
  }

  const handleCreateNewScholarship = async (data: InclusaoBolsaSubmitValues) => {
    if (!student) {
      return
    }

    try {
      const payload = {
        ...data,
        student_email: student.email,
        scholarship_starts_at: parseDate(data.scholarship_starts_at),
        scholarship_ends_at: parseDate(data.scholarship_ends_at),
        salary: Number(data.salary.replace(/[^\d,]/g, '').replace(',', '.'))
      }

      const response = await api.scholarship.createScholarship(
        payload
      )

      if ([200, 201].includes(response.status)) {
        toast.success('Bolsa criada com sucesso.')
        await getStudent()
      }
    }
    catch (error) {
      const message = extractApiMessage(error)
      toast.error(message ? message : 'Ocorreu um erro na criação da bolsa.')
    }
  }

  const handleDeleteEnrollment = async (enrollmentId: number) => {
    const response = await api.enrollment.deleteEnrollment(enrollmentId)

    if (response.status === 204) {
      toast.success('Matrícula excluída com sucesso.')
      await getStudent()
    } else {
      toast.error(formatApiError(response.status, response.data))
    }
  }

  const handleDeleteScholarship = async (scholarshipId: number) => {
    const response = await api.scholarship.deleteScholarship(scholarshipId)

    if (response.status === 204) {
      toast.success('Bolsa excluída com sucesso.')
      await getStudent()
    } else {
      toast.error(formatApiError(response.status, response.data))
    }
  }

  const handleUpdateEnrollment = async (data: EdicaoMatriculaSubmitValues) => {
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
      toast.error(`Erro ao atualizar a matrícula: ${extractApiMessage(error)}`)
    }

    await getStudent()
  }

  const handleUpdateScholarship = async (data: EdicaoBolsaSubmitValues): Promise<false | void> => {
    try {
      const updateScholarship = api.scholarship.updateScholarship(data.scholarship_id, {
        enrollment_id: data.enrollment_id,
        student_email: data.student_email,
        status: data.status,
        agency_id: data.agency_id,
        allocation_id: data.allocation_id,
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
      const message = extractApiMessage(error)
      toast.error(message ? message : 'Ocorreu um erro na atualização da bolsa.')
      return false;
    }

    await getStudent()
  }

  const getMaxEndDate = (referenceDate: Date | null, enrollmentProgram: EnrollmentProgram): Date => {
    const endYearSum = enrollmentProgram === 'MESTRADO' ? 2 : 4
    const maxEndDate = new Date(referenceDate ?? 0)
    return new Date(maxEndDate.setFullYear(
      maxEndDate.getFullYear() + endYearSum,
      maxEndDate.getMonth(),
      maxEndDate.getDate() - 1
    ))
  }

  useEffect(() => {
    const fetchData = async () => {
      await getAdvisors()
      await getAgencies()
      await getAllocations()
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
      allocations={allocations}
      onCreateNewEnrollment={handleCreateNewEnrollment}
      onCreateNewScholarship={handleCreateNewScholarship}
      onUpdateEnrollment={handleUpdateEnrollment}
      onUpdateScholarship={handleUpdateScholarship}
      onDeleteEnrollment={handleDeleteEnrollment}
      onDeleteScholarship={handleDeleteScholarship}
      getMaxEndDate={getMaxEndDate}
    />
  )
}

export { AreaDoEstudante }
