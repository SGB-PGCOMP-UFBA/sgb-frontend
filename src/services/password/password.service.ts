import type { AxiosResponse } from 'axios'
import { api } from '@/lib/api'
import type { UserRole } from '@/types'

const BASE_RECOVERY_API_PATH = `/v1/passwords/recovery`

export interface ResetPasswordPayload {
  email: string
  role: UserRole
}

export interface VerifyRecoveryCodePayload extends ResetPasswordPayload {
  code: string
}

export interface ConfirmPasswordRecoveryPayload
  extends VerifyRecoveryCodePayload {
  new_password: string
  confirm_new_password: string
}

/**
 * Rotas publicas. O pedido e o reenvio respondem com sucesso mesmo para
 * e-mail nao cadastrado, para nao revelar quem tem conta.
 */
export const requestPasswordRecovery = async (
  payload: ResetPasswordPayload
): Promise<AxiosResponse<void>> => {
  return api.post(BASE_RECOVERY_API_PATH, payload)
}

export const resendRecoveryCode = async (
  payload: ResetPasswordPayload
): Promise<AxiosResponse<void>> => {
  return api.post(`${BASE_RECOVERY_API_PATH}/resend`, payload)
}

export const verifyRecoveryCode = async (
  payload: VerifyRecoveryCodePayload
): Promise<AxiosResponse<void>> => {
  return api.post(`${BASE_RECOVERY_API_PATH}/verify`, payload)
}

export const confirmPasswordRecovery = async (
  payload: ConfirmPasswordRecoveryPayload
): Promise<AxiosResponse<void>> => {
  return api.post(`${BASE_RECOVERY_API_PATH}/confirm`, payload)
}
