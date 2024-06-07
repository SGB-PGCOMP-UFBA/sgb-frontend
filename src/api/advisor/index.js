import { api } from '../../services/api'

const BASE_ADVISOR_API_PATH = `/v1/advisor`

export const getAdvisor = async () => {
  return api.get(`${BASE_ADVISOR_API_PATH}`)
}

export const getAdvisorFilterList = async () => {
  return api.get(`${BASE_ADVISOR_API_PATH}/filter-list`)
}

export const createAdvisor = async (advisor) => {
  return api.post(`${BASE_ADVISOR_API_PATH}`, advisor)
}

export const updateAdvisor = async (payload) => {
  return api.patch(`${BASE_ADVISOR_API_PATH}`, payload)
}

export const updateAdvisorPassword = async (payload) => {
  return api.patch(`${BASE_ADVISOR_API_PATH}/update-password`, payload)
}

export const deleteAdvisor = async (advisorId) => {
  return api.delete(`${BASE_ADVISOR_API_PATH}/${advisorId}`)
}
