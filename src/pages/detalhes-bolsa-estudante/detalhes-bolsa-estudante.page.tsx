import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '@/services'
import { extractApiMessage } from '@/helpers/api-error.helper'
import { readRouteId, readStartEditing } from '@/helpers/detail-route.helper'
import { formDateToApi } from '@/helpers/formatters.helper'
import {
  findStudentScholarship,
  parseSalary,
} from '@/helpers/student-records.helper'
import { useStudentArea } from '@/hooks/use-student-area'
import type { FormularioBolsaEstudanteValues } from './components/formulario-bolsa-estudante'
import { DetalhesBolsaEstudanteView } from './detalhes-bolsa-estudante.view'

const STUDENT_AREA_PATH = '/area-do-estudante'

function DetalhesBolsaEstudante() {
  const navigate = useNavigate()
  const location = useLocation()
  const id = readRouteId(useParams().id)
  const { isLoading, student, agencies, allocations, reloadStudent } =
    useStudentArea()

  const scholarship =
    student && id !== null ? findStudentScholarship(student, id) : null

  const updateScholarship = async (values: FormularioBolsaEstudanteValues) => {
    if (!student || !scholarship) return false

    try {
      await api.scholarship.updateScholarship(scholarship.id, {
        enrollment_id: scholarship.enrollment_id,
        student_email: student.email,
        agency_id: values.agency_id,
        allocation_id: values.allocation_id,
        scholarship_starts_at: formDateToApi(values.scholarship_starts_at),
        scholarship_ends_at: formDateToApi(values.scholarship_ends_at),
        extension_ends_at: formDateToApi(values.extension_ends_at),
        salary: parseSalary(values.salary),
      })
      toast.success('As informações da bolsa foram atualizadas com sucesso.')
      await reloadStudent()
      return true
    } catch (error) {
      const message = extractApiMessage(error)
      toast.error(
        message ? message : 'Ocorreu um erro na atualização da bolsa.'
      )
      return false
    }
  }

  const deleteScholarship = async (scholarshipId: number) => {
    try {
      await api.scholarship.deleteScholarship(scholarshipId)
      toast.success('Bolsa excluída com sucesso.')
      navigate(STUDENT_AREA_PATH)
    } catch (error) {
      toast.error(`Erro ao excluir a bolsa: ${extractApiMessage(error)}`)
    }
  }

  return (
    <DetalhesBolsaEstudanteView
      isLoading={isLoading}
      scholarship={scholarship}
      startEditing={readStartEditing(location.state)}
      agencies={agencies}
      allocations={allocations}
      onBack={() => navigate(STUDENT_AREA_PATH)}
      onViewEnrollment={enrollmentId =>
        navigate(`${STUDENT_AREA_PATH}/matriculas/${enrollmentId}`)
      }
      onUpdate={updateScholarship}
      onDelete={deleteScholarship}
    />
  )
}

export { DetalhesBolsaEstudante }
