import { api } from '../../services/api'

export const getAdvisor = async () => {
  return api.get(`/v1/advisor`)
}

export const deleteAdvisor = async (advisorId) => {
  await api.delete(`/v1/advisor/${advisorId}`)
}
