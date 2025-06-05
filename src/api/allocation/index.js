import { api } from '../../services/api'
import { buildHeaders } from '../utils/HeaderUtils'

const BASE_ALLOCATION_API_PATH = `/v1/allocation`

export const getAllocationFilterList = async () => {
  return api.get(`${BASE_ALLOCATION_API_PATH}/filter-list`, {
    headers: buildHeaders()
  })
}

export const getAllocations = async () => {
  return api.get(`${BASE_ALLOCATION_API_PATH}`, {
    headers: buildHeaders()
  })
}

export const createAllocation = async (allocation) => {
  return api.post(`${BASE_ALLOCATION_API_PATH}`, allocation, {
    headers: buildHeaders()
  })
}

export const updateAllocation = async (allocationId, allocation) => {
  return api.patch(`${BASE_ALLOCATION_API_PATH}/${allocationId}`, allocation, {
    headers: buildHeaders()
  })
}

export const deleteAllocation = async (allocationId) => {
  return api.delete(`${BASE_ALLOCATION_API_PATH}/${allocationId}`, {
    headers: buildHeaders()
  })
}
