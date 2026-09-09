import type { AxiosResponse } from 'axios'
import { api } from '../../services/api'
import { buildHeaders } from '../utils/HeaderUtils'
import type {
  AdvisorDetailed,
  AdvisorFilterOption,
  UserStatus
} from '../../types'

const BASE_ADVISOR_API_PATH = `/v1/advisor`

export interface CreateAdvisorPayload {
  name: string
  email: string
  password: string
  status?: UserStatus
  tax_id?: string | null
  phone_number?: string | null
  notify?: boolean
}

export interface UpdateAdvisorPayload {
  current_email: string
  email?: string | null
  name?: string | null
  status?: UserStatus | null
  tax_id?: string | null
  phone_number?: string | null
}

export interface UpdateAdvisorPasswordPayload {
  email: string
  current_password: string
  new_password: string
  confirm_new_password: string
}

export const getAdvisorFilterList = async (): Promise<
  AxiosResponse<AdvisorFilterOption[]>
> => {
  return api.get(`${BASE_ADVISOR_API_PATH}/filter-list`, {
    headers: buildHeaders()
  })
}

export const getAdvisors = async (): Promise<
  AxiosResponse<AdvisorDetailed[]>
> => {
  return api.get(`${BASE_ADVISOR_API_PATH}`, {
    headers: buildHeaders()
  })
}

export const createAdvisor = async (
  advisor: CreateAdvisorPayload
): Promise<AxiosResponse<AdvisorDetailed>> => {
  return api.post(`${BASE_ADVISOR_API_PATH}`, advisor, {
    headers: buildHeaders()
  })
}

export const updateAdvisor = async (
  payload: UpdateAdvisorPayload
): Promise<AxiosResponse<AdvisorDetailed>> => {
  return api.patch(`${BASE_ADVISOR_API_PATH}`, payload, {
    headers: buildHeaders()
  })
}

export const updateAdvisorPassword = async (
  payload: UpdateAdvisorPasswordPayload
): Promise<AxiosResponse<void>> => {
  return api.patch(`${BASE_ADVISOR_API_PATH}/update-password`, payload, {
    headers: buildHeaders()
  })
}

export const deleteAdvisor = async (
  advisorId: number
): Promise<AxiosResponse<void>> => {
  return api.delete(`${BASE_ADVISOR_API_PATH}/${advisorId}`, {
    headers: buildHeaders()
  })
}

export const grantAdminPrivileges = async (
  advisorId: number
): Promise<AxiosResponse<AdvisorDetailed>> => {
  return api.patch(
    `${BASE_ADVISOR_API_PATH}/grant-admin-privileges/${advisorId}`,
    {},
    {
      headers: buildHeaders()
    }
  )
}
