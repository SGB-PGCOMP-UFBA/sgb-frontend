import type { AxiosResponse } from 'axios'
import { api } from '../../services/api'
import { buildHeaders } from '../utils/HeaderUtils'
import type { AgencyDetailed, IdentifiedFilterOption } from '../../types'

const BASE_AGENCY_API_PATH = `/v1/agency`

/** Payload aceito na criacao; o backend preenche id, timestamps e contadores. */
export interface CreateAgencyPayload {
  name: string
  description: string
  masters_degree_awarded_scholarships?: number
  doctorate_degree_awarded_scholarships?: number
}

export type UpdateAgencyPayload = Partial<CreateAgencyPayload>

export const getAgencyFilterList = async (): Promise<
  AxiosResponse<IdentifiedFilterOption[]>
> => {
  return api.get(`${BASE_AGENCY_API_PATH}/filter-list`, {
    headers: buildHeaders()
  })
}

export const getAgencys = async (): Promise<
  AxiosResponse<AgencyDetailed[]>
> => {
  return api.get(`${BASE_AGENCY_API_PATH}`, {
    headers: buildHeaders()
  })
}

export const createAgency = async (
  agency: CreateAgencyPayload
): Promise<AxiosResponse<AgencyDetailed>> => {
  return api.post(`${BASE_AGENCY_API_PATH}`, agency, {
    headers: buildHeaders()
  })
}

export const updateAgency = async (
  agencyId: number,
  agency: UpdateAgencyPayload
): Promise<AxiosResponse<AgencyDetailed>> => {
  return api.patch(`${BASE_AGENCY_API_PATH}/${agencyId}`, agency, {
    headers: buildHeaders()
  })
}

export const deleteAgency = async (
  agencyId: number
): Promise<AxiosResponse<void>> => {
  return api.delete(`${BASE_AGENCY_API_PATH}/${agencyId}`, {
    headers: buildHeaders()
  })
}
