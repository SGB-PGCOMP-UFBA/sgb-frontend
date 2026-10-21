import type { AxiosResponse } from 'axios'
import { api } from '@/lib/api'
import { buildHeaders } from '@/lib/api-headers'
import type {
  AdvisorDetailed,
  AdvisorFilterOption,
  ManagedUser,
  StudentDetailedWithFullRelations,
  UserFilters,
  UserRole,
  UserStatus
} from '@/types'

const BASE_USER_API_PATH = `/v1/user`

const userPath = (id: number) => `${BASE_USER_API_PATH}/${id}`

/** Campos aceitos na criação e na edição; o que não se aplica ao perfil vai `null`. */
export interface ManagedUserPayload {
  name: string
  email: string
  tax_id: string | null
  phone_number: string | null
  link_to_lattes: string | null
}

/** A senha não é enviada: o backend gera e manda por e-mail. */
export interface CreateManagedUserPayload extends ManagedUserPayload {
  role: UserRole
}

export interface SignUpPayload {
  name: string
  email: string
  password: string
  tax_id: string
  phone_number: string
  link_to_lattes: string
}

/**
 * Dados da própria conta. O backend identifica a pessoa pelo token e recusa
 * campos a mais, então não há `current_email` nem `email` de referência.
 */
export interface UpdateProfilePayload {
  name?: string | null
  email?: string | null
  tax_id?: string | null
  phone_number?: string | null
  link_to_lattes?: string | null
}

export interface UpdatePasswordPayload {
  current_password: string
  new_password: string
  confirm_new_password: string
}

export const getUsers = async (
  filters: UserFilters = {}
): Promise<AxiosResponse<ManagedUser[]>> => {
  const params = Object.fromEntries(
    Object.entries(filters).filter(([, value]) => Boolean(value))
  )

  return api.get(BASE_USER_API_PATH, {
    headers: buildHeaders(),
    params,
  })
}

export const getUser = async (
  id: number
): Promise<AxiosResponse<ManagedUser>> => {
  return api.get(userPath(id), { headers: buildHeaders() })
}

export const createUser = async (
  payload: CreateManagedUserPayload
): Promise<AxiosResponse<ManagedUser>> => {
  return api.post(BASE_USER_API_PATH, payload, { headers: buildHeaders() })
}

export const updateUser = async (
  id: number,
  payload: ManagedUserPayload
): Promise<AxiosResponse<ManagedUser>> => {
  return api.patch(userPath(id), payload, { headers: buildHeaders() })
}

/** Só orientador e administrador têm situação. */
export const updateUserStatus = async (
  id: number,
  status: UserStatus
): Promise<AxiosResponse<ManagedUser>> => {
  return api.patch(
    `${userPath(id)}/status`,
    { status },
    { headers: buildHeaders() }
  )
}

/** Liga o privilégio de administrador do orientador, ou desliga se já tiver. */
export const toggleAdminPrivileges = async (
  id: number
): Promise<AxiosResponse<ManagedUser>> => {
  return api.patch(
    `${userPath(id)}/admin-privileges`,
    {},
    { headers: buildHeaders() }
  )
}

export const deleteUser = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return api.delete(userPath(id), { headers: buildHeaders() })
}

/** Cadastro público de estudante: não envia headers de autenticação. */
export const signUp = async (
  payload: SignUpPayload
): Promise<AxiosResponse<ManagedUser>> => {
  return api.post(`${BASE_USER_API_PATH}/signup`, payload)
}

export const updateProfile = async (
  payload: UpdateProfilePayload
): Promise<AxiosResponse<ManagedUser>> => {
  return api.patch(`${BASE_USER_API_PATH}/me`, payload, {
    headers: buildHeaders()
  })
}

export const updatePassword = async (
  payload: UpdatePasswordPayload
): Promise<AxiosResponse<void>> => {
  return api.patch(`${BASE_USER_API_PATH}/me/password`, payload, {
    headers: buildHeaders()
  })
}

export const getAdvisors = async (): Promise<
  AxiosResponse<AdvisorDetailed[]>
> => {
  return api.get(`${BASE_USER_API_PATH}/advisors`, {
    headers: buildHeaders()
  })
}

export const getAdvisorFilterList = async (): Promise<
  AxiosResponse<AdvisorFilterOption[]>
> => {
  return api.get(`${BASE_USER_API_PATH}/advisors/filter-list`, {
    headers: buildHeaders()
  })
}

export const getStudentsByAdvisor = async (
  advisorId: number
): Promise<AxiosResponse<StudentDetailedWithFullRelations[]>> => {
  return api.get(`${BASE_USER_API_PATH}/advisors/${advisorId}/students`, {
    headers: buildHeaders()
  })
}

export const getStudent = async (
  id: number
): Promise<AxiosResponse<StudentDetailedWithFullRelations>> => {
  return api.get(`${BASE_USER_API_PATH}/students/${id}`, {
    headers: buildHeaders()
  })
}
