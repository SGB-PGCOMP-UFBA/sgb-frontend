import { api } from '../../services/api'

const BASE_AGENCY_API_PATH = `/v1/agency`

export const getAgencys = async () => {
  return api.get(`${BASE_AGENCY_API_PATH}`)
}

export const createAgency = async (agency) => {
  return api.post(`${BASE_AGENCY_API_PATH}`, { agency })
}

export const updateAgency = async (agency) => {
  return api.patch(`${BASE_AGENCY_API_PATH}`, { agency })
}

export const deleteAgency = async (agencyId) => {
  await api.delete(`${BASE_AGENCY_API_PATH}/${agencyId}`)
}
