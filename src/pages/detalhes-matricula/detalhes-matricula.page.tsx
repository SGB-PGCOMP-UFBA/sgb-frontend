import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '@/services'
import { extractApiMessage } from '@/helpers/api-error.helper'
import { readRouteId, readStartEditing } from '@/helpers/detail-route.helper'
import { formDateToApi } from '@/helpers/formatters.helper'
import {
  findStudentEnrollment,
  hasOngoingScholarship,
  ONGOING_SCHOLARSHIP_BLOCKED,
  toCreateScholarshipPayload,
} from '@/helpers/student-records.helper'
import { useStudentArea } from '@/hooks/use-student-area'
import type { InclusaoBolsaSubmitValues } from '@/components/dialog-inclusao-bolsa'
import type { FormularioMatriculaValues } from './components/formulario-matricula'
import { DetalhesMatriculaView } from './detalhes-matricula.view'

const STUDENT_AREA_PATH = '/area-do-estudante'

function DetalhesMatricula() {
  const navigate = useNavigate()
  const location = useLocation()
  const id = readRouteId(useParams().id)
  const { isLoading, student, advisors, agencies, allocations, reloadStudent } =
    useStudentArea()

  const enrollment =
    student && id !== null ? findStudentEnrollment(student, id) : null

  const updateEnrollment = async (values: FormularioMatriculaValues) => {
    if (!student || !enrollment) return false

    try {
      await api.enrollment.updateEnrollment(enrollment.id, {
        student_email: student.email,
        advisor_email: values.advisor_email,
        enrollment_program: values.enrollment_program,
        enrollment_number: values.enrollment_number,
        enrollment_date: formDateToApi(values.enrollment_date),
        defense_prediction_date: formDateToApi(values.defense_prediction_date),
      })
      toast.success('As informações da matrícula foram atualizadas com sucesso.')
      await reloadStudent()
      return true
    } catch (error) {
      toast.error(`Erro ao atualizar a matrícula: ${extractApiMessage(error)}`)
      return false
    }
  }

  const createScholarship = async (values: InclusaoBolsaSubmitValues) => {
    if (!student) return

    try {
      await api.scholarship.createScholarship(
        toCreateScholarshipPayload(values, student.email)
      )
      toast.success('Bolsa criada com sucesso.')
      await reloadStudent()
    } catch (error) {
      const message = extractApiMessage(error)
      toast.error(message ? message : 'Ocorreu um erro na criação da bolsa.')
    }
  }

  const deleteEnrollment = async (enrollmentId: number) => {
    try {
      await api.enrollment.deleteEnrollment(enrollmentId)
      toast.success('Matrícula excluída com sucesso.')
      navigate(STUDENT_AREA_PATH)
    } catch (error) {
      toast.error(`Erro ao excluir a matrícula: ${extractApiMessage(error)}`)
    }
  }

  return (
    <DetalhesMatriculaView
      isLoading={isLoading}
      enrollment={enrollment}
      startEditing={readStartEditing(location.state)}
      advisors={advisors}
      agencies={agencies}
      allocations={allocations}
      addScholarshipDisabledReason={
        student && hasOngoingScholarship(student)
          ? ONGOING_SCHOLARSHIP_BLOCKED
          : undefined
      }
      onBack={() => navigate(STUDENT_AREA_PATH)}
      onUpdate={updateEnrollment}
      onCreateScholarship={createScholarship}
      onViewScholarship={scholarshipId =>
        navigate(`${STUDENT_AREA_PATH}/bolsas/${scholarshipId}`)
      }
      onDelete={deleteEnrollment}
    />
  )
}

export { DetalhesMatricula }
