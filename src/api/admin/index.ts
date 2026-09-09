import type { AxiosResponse } from 'axios'
import { api } from '../../services/api'
import { buildHeaders } from '../utils/HeaderUtils'

const BASE_ADMIN_API_PATH = `/v1/admin`

export interface UpdateAdminPayload {
  current_email: string
  email?: string | null
  name?: string | null
  tax_id?: string | null
  phone_number?: string | null
}

export interface UpdateAdminPasswordPayload {
  email: string
  current_password: string
  new_password: string
  confirm_new_password: string
}

export const updateAdmin = async (
  payload: UpdateAdminPayload
): Promise<AxiosResponse<void>> => {
  return api.patch(`${BASE_ADMIN_API_PATH}`, payload, {
    headers: buildHeaders()
  })
}

export const updateAdminPassword = async (
  payload: UpdateAdminPasswordPayload
): Promise<AxiosResponse<void>> => {
  return api.patch(`${BASE_ADMIN_API_PATH}/update-password`, payload, {
    headers: buildHeaders()
  })
}
