import { api } from '../../services/api'
import { buildHeaders } from '../utils/HeaderUtils'

const BASE_ADVISOR_API_PATH = `/v1/advisor`

export const getAdvisorFilterList = async () => {
  return api.get(`${BASE_ADVISOR_API_PATH}/filter-list`, {
    headers: buildHeaders()
  })
}

export const getAdvisors = async () => {
  return api.get(`${BASE_ADVISOR_API_PATH}`, {
    headers: buildHeaders()
  })
}

export const createAdvisor = async (advisor) => {
  return api.post(`${BASE_ADVISOR_API_PATH}`, advisor, {
    headers: buildHeaders()
  })
}

export const updateAdvisor = async (payload) => {
  return api.patch(`${BASE_ADVISOR_API_PATH}`, payload, {
    headers: buildHeaders()
  })
}

export const updateAdvisorPassword = async (payload) => {
  return api.patch(`${BASE_ADVISOR_API_PATH}/update-password`, payload, {
    headers: buildHeaders()
  })
}

export const deleteAdvisor = async (advisorId) => {
  return api.delete(`${BASE_ADVISOR_API_PATH}/${advisorId}`, {
    headers: buildHeaders()
  })
}
