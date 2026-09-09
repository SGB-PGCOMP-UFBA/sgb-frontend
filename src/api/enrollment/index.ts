import type { AxiosResponse } from 'axios'
import { api } from '../../services/api'
import { buildHeaders } from '../utils/HeaderUtils'
import type {
  DateInput,
  EnrollmentDetailed,
  EnrollmentProgram,
  FilterOption
} from '../../types'

const BASE_ENROLLMENT_API_PATH = `/v1/enrollment`

/**
 * Os formularios alimentam estes campos com `parseDate`, que devolve `null`
 * quando o texto digitado nao casa com dd/MM/yyyy. O `null` chega ao servidor e
 * o `@IsDate()` do DTO o rejeita com erro de validacao — que e o comportamento
 * atual da tela. O tipo admite `null` para descrever isso, em vez de esconder
 * o caso com um cast.
 */

/**
 * Espelha `CreateEnrollmentDto`. A matricula e criada pelos e-mails do estudante
 * e do orientador, nao por ids — e assim que o backend resolve os dois lados.
 */
export interface CreateEnrollmentPayload {
  student_email: string
  advisor_email: string
  enrollment_date: DateInput | null
  enrollment_number: string
  enrollment_program: EnrollmentProgram
  defense_prediction_date?: DateInput | null
}

/**
 * Espelha `UpdateEnrollmentDto`: os dois e-mails continuam obrigatorios (sao
 * eles que identificam a matricula), o resto e opcional.
 *
 * Nota: o backend valida `enrollment_number` com `@Length(9, 10)` aqui, mas com
 * `@MaxLength(15)` na criacao — uma matricula de 11 a 15 digitos pode ser criada
 * e depois nao pode ser editada. Divergencia do backend, nao do cliente.
 */
export interface UpdateEnrollmentPayload {
  student_email: string
  advisor_email: string
  enrollment_program?: EnrollmentProgram
  enrollment_date?: DateInput | null
  defense_prediction_date?: DateInput | null
  enrollment_number?: string
}

export const createEnrollment = async (
  enrollment: CreateEnrollmentPayload
): Promise<AxiosResponse<EnrollmentDetailed>> => {
  return api.post(`${BASE_ENROLLMENT_API_PATH}`, enrollment, {
    headers: buildHeaders()
  })
}

export const getEnrollmentProgramFilterList = async (): Promise<
  AxiosResponse<FilterOption[]>
> => {
  return api.get(`${BASE_ENROLLMENT_API_PATH}/filter-list`, {
    headers: buildHeaders()
  })
}

export const updateEnrollment = async (
  enrollmentId: number,
  enrollment: UpdateEnrollmentPayload
): Promise<AxiosResponse<EnrollmentDetailed>> => {
  return api.patch(`${BASE_ENROLLMENT_API_PATH}/${enrollmentId}`, enrollment, {
    headers: buildHeaders()
  })
}

export const deleteEnrollment = async (
  enrollmentId: number
): Promise<AxiosResponse<void>> => {
  return api.delete(`${BASE_ENROLLMENT_API_PATH}/${enrollmentId}`, {
    headers: buildHeaders()
  })
}
