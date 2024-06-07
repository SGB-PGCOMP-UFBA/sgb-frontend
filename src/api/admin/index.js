import { api } from '../../services/api'

const BASE_ADMIN_API_PATH = `/v1/admin`

export const updateAdmin = async (payload) => {
  return api.patch(`${BASE_ADMIN_API_PATH}`, payload)
}

export const updateAdminPassword = async (payload) => {
  return api.patch(`${BASE_ADMIN_API_PATH}/update-password`, payload)
}
