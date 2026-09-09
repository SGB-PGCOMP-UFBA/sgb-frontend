import type { AxiosResponse } from 'axios'
import { api } from '../../services/api'
import { buildHeaders } from '../utils/HeaderUtils'
import type { StudentDetailedWithFullRelations } from '../../types'

const BASE_STUDENT_API_PATH = `/v1/student`

export interface CreateStudentPayload {
  name: string
  email: string
  password: string
  tax_id: string
  phone_number: string
  link_to_lattes: string
}

/**
 * Espelha `UpdateStudentDto`: o estudante e identificado por `current_email`,
 * nao por id, e todo campo enviado vazio e normalizado para `null` no backend.
 */
export interface UpdateStudentPayload {
  current_email: string
  email?: string | null
  name?: string | null
  tax_id?: string | null
  phone_number?: string | null
  link_to_lattes?: string | null
}

/**
 * Espelha `UpdateStudentPasswordDto`. O backend valida
 * `confirm_new_password` contra `new_password`, entao os quatro campos sao
 * obrigatorios.
 */
export interface UpdateStudentPasswordPayload {
  email: string
  current_password: string
  new_password: string
  confirm_new_password: string
}

export const getStudents = async (): Promise<
  AxiosResponse<StudentDetailedWithFullRelations[]>
> => {
  return api.get(`${BASE_STUDENT_API_PATH}`, {
    headers: buildHeaders()
  })
}

export const getStudentsByEmail = async (
  email: string
): Promise<AxiosResponse<StudentDetailedWithFullRelations>> => {
  return api.get(`${BASE_STUDENT_API_PATH}/${email}`, {
    headers: buildHeaders()
  })
}

export const getStudentsByAdvisorId = async (
  advisorId: number
): Promise<AxiosResponse<StudentDetailedWithFullRelations[]>> => {
  return api.get(`${BASE_STUDENT_API_PATH}/by-advisor/${advisorId}`, {
    headers: buildHeaders()
  })
}

/** Cadastro publico: nao envia headers de autenticacao. */
export const createStudent = async (
  student: CreateStudentPayload
): Promise<AxiosResponse<StudentDetailedWithFullRelations>> => {
  return api.post(`${BASE_STUDENT_API_PATH}`, student)
}

export const updateStudent = async (
  payload: UpdateStudentPayload
): Promise<AxiosResponse<StudentDetailedWithFullRelations>> => {
  return api.patch(`${BASE_STUDENT_API_PATH}`, payload, {
    headers: buildHeaders()
  })
}

export const updateStudentPassword = async (
  payload: UpdateStudentPasswordPayload
): Promise<AxiosResponse<void>> => {
  return api.patch(`${BASE_STUDENT_API_PATH}/update-password`, payload, {
    headers: buildHeaders()
  })
}

export const deleteStudent = async (
  studentId: number
): Promise<AxiosResponse<void>> => {
  return api.delete(`${BASE_STUDENT_API_PATH}/${studentId}`, {
    headers: buildHeaders()
  })
}
