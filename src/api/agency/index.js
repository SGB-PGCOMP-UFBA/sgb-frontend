import { api } from '../../services/api'

const BASE_AGENCY_API_PATH = `/v1/agency`

export const getAgencys = async () => {
  return api.get(`${BASE_AGENCY_API_PATH}`)
}

export const getAgencyFilterList = async () => {
  return api.get(`${BASE_AGENCY_API_PATH}/filter-list`)
}

export const createAgency = async (agency) => {
  return api.post(`${BASE_AGENCY_API_PATH}`, agency)
}

export const updateAgency = async (agencyId, agency) => {
  return api.patch(`${BASE_AGENCY_API_PATH}/${agencyId}`, agency)
}

export const deleteAgency = async (agencyId) => {
  return api.delete(`${BASE_AGENCY_API_PATH}/${agencyId}`)
}
