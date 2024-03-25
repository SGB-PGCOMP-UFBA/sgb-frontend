import { api } from '../../services/api'

const BASE_PASSWORD_API_PATH = `/v1/password-recovery`

export const resetPassword = async (payload) => {
  return api.post(`${BASE_PASSWORD_API_PATH}/reset`, payload)
}
