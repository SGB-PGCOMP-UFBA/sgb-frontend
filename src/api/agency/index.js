import { api } from '../../services/api'

export const getAgencys = async () => {
  return api.get(`/v1/agency`)
}

export const deleteAgency = async (agencyId) => {
  await api.delete(`/v1/agency/${agencyId}`)
}
