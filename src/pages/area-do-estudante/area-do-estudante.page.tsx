import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AreaDoEstudanteView } from './area-do-estudante.view'
import { api } from '@/services'
import { extractApiMessage } from '@/helpers/api-error.helper'
import { formDateToApi } from '@/helpers/formatters.helper'
import { toCreateScholarshipPayload } from '@/helpers/student-records.helper'
import type { StudentScholarship } from '@/helpers/student-records.helper'
import { useStudentArea } from '@/hooks/use-student-area'
import type { InclusaoBolsaSubmitValues } from '@/components/dialog-inclusao-bolsa'
import type { InclusaoMatriculaFormValues } from './components/dialog-inclusao-matricula'
import type { EnrollmentDetailedWithFullRelations } from '@/types'

const ENROLLMENT_PATH = '/area-do-estudante/matriculas'
const SCHOLARSHIP_PATH = '/area-do-estudante/bolsas'

function AreaDoEstudante() {
  const navigate = useNavigate()
  const { isLoading, student, advisors, agencies, allocations, reloadStudent } =
    useStudentArea()

  const handleCreateNewEnrollment = async (
    data: InclusaoMatriculaFormValues
  ) => {
    if (!student) return

    try {
      await api.enrollment.createEnrollment({
        ...data,
        student_email: student.email,
        enrollment_date: formDateToApi(data.enrollment_date),
        defense_prediction_date: formDateToApi(data.defense_prediction_date),
      })
      toast.success('Matrícula criada com sucesso.')
      await reloadStudent()
    } catch {
      toast.error('Ocorreu um erro na criação da matrícula.')
    }
  }

  const handleCreateNewScholarship = async (
    data: InclusaoBolsaSubmitValues
  ) => {
    if (!student) return

    try {
      await api.scholarship.createScholarship(
        toCreateScholarshipPayload(data, student.email)
      )
      toast.success('Bolsa criada com sucesso.')
      await reloadStudent()
    } catch (error) {
      const message = extractApiMessage(error)
      toast.error(message ? message : 'Ocorreu um erro na criação da bolsa.')
    }
  }

  const handleDeleteEnrollment = async (enrollmentId: number) => {
    try {
      await api.enrollment.deleteEnrollment(enrollmentId)
      toast.success('Matrícula excluída com sucesso.')
    } catch (error) {
      toast.error(`Erro ao excluir a matrícula: ${extractApiMessage(error)}`)
    }

    await reloadStudent()
  }

  const handleDeleteScholarship = async (scholarshipId: number) => {
    try {
      await api.scholarship.deleteScholarship(scholarshipId)
      toast.success('Bolsa excluída com sucesso.')
    } catch (error) {
      toast.error(`Erro ao excluir a bolsa: ${extractApiMessage(error)}`)
    }

    await reloadStudent()
  }

  const viewEnrollment = useCallback(
    (enrollment: EnrollmentDetailedWithFullRelations) =>
      navigate(`${ENROLLMENT_PATH}/${enrollment.id}`),
    [navigate]
  )

  /** A edição acontece só na página da matrícula, que já abre no formulário. */
  const editEnrollment = useCallback(
    (enrollment: EnrollmentDetailedWithFullRelations) =>
      navigate(`${ENROLLMENT_PATH}/${enrollment.id}`, {
        state: { startEditing: true },
      }),
    [navigate]
  )

  const viewScholarship = useCallback(
    (scholarship: StudentScholarship) =>
      navigate(`${SCHOLARSHIP_PATH}/${scholarship.id}`),
    [navigate]
  )

  /** A edição acontece só na página da bolsa, que já abre no formulário. */
  const editScholarship = useCallback(
    (scholarship: StudentScholarship) =>
      navigate(`${SCHOLARSHIP_PATH}/${scholarship.id}`, {
        state: { startEditing: true },
      }),
    [navigate]
  )

  return (
    <AreaDoEstudanteView
      isLoading={isLoading}
      student={student}
      advisors={advisors}
      agencies={agencies}
      allocations={allocations}
      onCreateNewEnrollment={handleCreateNewEnrollment}
      onCreateNewScholarship={handleCreateNewScholarship}
      onViewEnrollment={viewEnrollment}
      onEditEnrollment={editEnrollment}
      onDeleteEnrollment={handleDeleteEnrollment}
      onViewScholarship={viewScholarship}
      onEditScholarship={editScholarship}
      onDeleteScholarship={handleDeleteScholarship}
    />
  )
}

export { AreaDoEstudante }
