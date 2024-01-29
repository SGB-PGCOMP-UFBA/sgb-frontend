import { api } from '../../services/api'

export const getAdvisor = async () => {
  return api.get(`/v1/advisor`)
}

export const createAdvisor = async (advisor) => {
  return api.post(`/v1/advisor/`, advisor)
}

export const deleteAdvisor = async (advisorId) => {
  return api.delete(`/v1/advisor/${advisorId}`)
}
