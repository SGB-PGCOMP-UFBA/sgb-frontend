import { api } from '../../services/api'
import { buildHeaders } from '../utils/HeaderUtils'

const BASE_ADMIN_API_PATH = `/v1/admin`

export const updateAdmin = async (payload) => {
  return api.patch(`${BASE_ADMIN_API_PATH}`, payload, {
    headers: buildHeaders()
  })
}

export const updateAdminPassword = async (payload) => {
  return api.patch(`${BASE_ADMIN_API_PATH}/update-password`, payload, {
    headers: buildHeaders()
  })
}
