import type { AxiosResponse } from 'axios'
import { api } from '@/lib/api'
import type { LoginRequest, LoginResponse } from '@/types'

export const login = async (
  data: LoginRequest
): Promise<AxiosResponse<LoginResponse>> => {
  return api.post('/login', data)
}

export const logout = async (refreshToken: string): Promise<void> => {
  await api.post('/logout', { refresh_token: refreshToken })
}
