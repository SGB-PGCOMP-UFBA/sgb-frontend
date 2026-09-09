import type { AxiosResponse } from 'axios'
import { api } from '../../services/api'
import { buildHeaders } from '../utils/HeaderUtils'
import type { AllocationDetailed, IdentifiedFilterOption } from '../../types'

const BASE_ALLOCATION_API_PATH = `/v1/allocation`

export interface CreateAllocationPayload {
  name: string
  masters_degree_awarded_scholarships?: number
  doctorate_degree_awarded_scholarships?: number
}

export type UpdateAllocationPayload = Partial<CreateAllocationPayload>

export const getAllocationFilterList = async (): Promise<
  AxiosResponse<IdentifiedFilterOption[]>
> => {
  return api.get(`${BASE_ALLOCATION_API_PATH}/filter-list`, {
    headers: buildHeaders()
  })
}

export const getAllocations = async (): Promise<
  AxiosResponse<AllocationDetailed[]>
> => {
  return api.get(`${BASE_ALLOCATION_API_PATH}`, {
    headers: buildHeaders()
  })
}

export const createAllocation = async (
  allocation: CreateAllocationPayload
): Promise<AxiosResponse<AllocationDetailed>> => {
  return api.post(`${BASE_ALLOCATION_API_PATH}`, allocation, {
    headers: buildHeaders()
  })
}

export const updateAllocation = async (
  allocationId: number,
  allocation: UpdateAllocationPayload
): Promise<AxiosResponse<AllocationDetailed>> => {
  return api.patch(`${BASE_ALLOCATION_API_PATH}/${allocationId}`, allocation, {
    headers: buildHeaders()
  })
}

export const deleteAllocation = async (
  allocationId: number
): Promise<AxiosResponse<void>> => {
  return api.delete(`${BASE_ALLOCATION_API_PATH}/${allocationId}`, {
    headers: buildHeaders()
  })
}
