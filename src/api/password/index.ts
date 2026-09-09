import type { AxiosResponse } from 'axios'
import { api } from '../../services/api'
import type { UserRole } from '../../types'

const BASE_PASSWORD_API_PATH = `/v1/passwords`

export interface ResetPasswordPayload {
  email: string
  role: UserRole
}

/** Rota publica: dispara o e-mail de recuperacao, sem exigir autenticacao. */
export const resetPassword = async (
  payload: ResetPasswordPayload
): Promise<AxiosResponse<void>> => {
  return api.post(`${BASE_PASSWORD_API_PATH}/reset`, payload)
}
