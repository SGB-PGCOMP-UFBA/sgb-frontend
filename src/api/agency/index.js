import { api } from '../../services/api'
import { buildHeaders } from '../utils/HeaderUtils'

const BASE_AGENCY_API_PATH = `/v1/agency`

export const getAgencyFilterList = async () => {
  return api.get(`${BASE_AGENCY_API_PATH}/filter-list`, {
    headers: buildHeaders()
  })
}

export const getAgencys = async () => {
  return api.get(`${BASE_AGENCY_API_PATH}`, {
    headers: buildHeaders()
  })
}

export const createAgency = async (agency) => {
  return api.post(`${BASE_AGENCY_API_PATH}`, agency, {
    headers: buildHeaders()
  })
}

export const updateAgency = async (agencyId, agency) => {
  return api.patch(`${BASE_AGENCY_API_PATH}/${agencyId}`, agency, {
    headers: buildHeaders()
  })
}

export const deleteAgency = async (agencyId) => {
  return api.delete(`${BASE_AGENCY_API_PATH}/${agencyId}`, {
    headers: buildHeaders()
  })
}
