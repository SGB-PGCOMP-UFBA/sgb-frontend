import type { AxiosResponse } from 'axios'
import { api } from '@/lib/api'
import { buildHeaders } from '@/lib/api-headers'
import type { ManagedUser, UserFilters, UserRole, UserStatus } from '@/types'

const BASE_USER_API_PATH = `/v1/user`

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

const userPath = (role: UserRole, id: number) =>
  `${BASE_USER_API_PATH}/${role}/${id}`

export const getUser = async (
  role: UserRole,
  id: number
): Promise<AxiosResponse<ManagedUser>> => {
  return api.get(userPath(role, id), { headers: buildHeaders() })
}

export const createUser = async (
  payload: CreateManagedUserPayload
): Promise<AxiosResponse<ManagedUser>> => {
  return api.post(BASE_USER_API_PATH, payload, { headers: buildHeaders() })
}

export const updateUser = async (
  role: UserRole,
  id: number,
  payload: ManagedUserPayload
): Promise<AxiosResponse<ManagedUser>> => {
  return api.patch(userPath(role, id), payload, { headers: buildHeaders() })
}

/** Só orientador e administrador têm situação. */
export const updateUserStatus = async (
  role: UserRole,
  id: number,
  status: UserStatus
): Promise<AxiosResponse<ManagedUser>> => {
  return api.patch(
    `${userPath(role, id)}/status`,
    { status },
    { headers: buildHeaders() }
  )
}

export const deleteUser = async (
  role: UserRole,
  id: number
): Promise<AxiosResponse<void>> => {
  return api.delete(userPath(role, id), { headers: buildHeaders() })
}
