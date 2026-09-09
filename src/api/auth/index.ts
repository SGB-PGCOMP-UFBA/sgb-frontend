import type { AxiosResponse } from 'axios'
import { api } from '../../services/api'
import type { LoginRequest, LoginResponse } from '../../types'

export const login = async (
  data: LoginRequest
): Promise<AxiosResponse<LoginResponse>> => {
  return api.post('/login', data)
}
