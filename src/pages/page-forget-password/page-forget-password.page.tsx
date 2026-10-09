import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { api } from '@/services'
import type { ConfirmPasswordRecoveryPayload } from '@/services/password'
import { extractApiMessage } from '@/helpers/api-error.helper'
import { useCountdown } from '@/hooks/use-countdown'
import type { FieldChangeEvent, UserRole } from '@/types'
import { PageForgetPasswordView } from './page-forget-password.view'
import type { RecoveryStep } from './page-forget-password.view'

const UNEXPECTED_ERROR = 'Erro inesperado. Tente novamente!'
const RESEND_COOLDOWN_SECONDS = 60

const initialState: ConfirmPasswordRecoveryPayload = {
  email: '',
  role: 'STUDENT',
  code: '',
  new_password: '',
  confirm_new_password: '',
}

function getPasswordError(values: ConfirmPasswordRecoveryPayload) {
  const length = values.new_password.trim().length

  if (length < 4 || length > 8) {
    return 'A senha deve ter entre 4 e 8 caracteres.'
  }

  if (values.new_password !== values.confirm_new_password) {
    return 'A senha e o confirmar senha são diferentes.'
  }

  return undefined
}

function PageForgetPassword() {
  const navigate = useNavigate()
  const [step, setStep] = useState<RecoveryStep>('email')
  const [isLoading, setIsLoading] = useState(false)
  const resendCountdown = useCountdown()
  const [values, setValues] =
    useState<ConfirmPasswordRecoveryPayload>(initialState)

  const handleChangeValues = (event: FieldChangeEvent) => {
    setValues(current => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  const handleChangeRole = (role: UserRole) => {
    setValues(current => ({ ...current, role }))
  }

  const handleChangeCode = (code: string) => {
    setValues(current => ({ ...current, code }))
  }

  const runRequest = async (request: () => Promise<void>) => {
    setIsLoading(true)

    try {
      await request()
    } catch (error) {
      toast.error(extractApiMessage(error) ?? UNEXPECTED_ERROR)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRequestCode = () =>
    runRequest(async () => {
      await api.password.requestPasswordRecovery({
        email: values.email,
        role: values.role,
      })
      toast.success(
        'Se o e-mail estiver cadastrado, você receberá um código em instantes.'
      )
      resendCountdown.start(RESEND_COOLDOWN_SECONDS)
      setStep('code')
    })

  const handleResendCode = () =>
    runRequest(async () => {
      await api.password.resendRecoveryCode({
        email: values.email,
        role: values.role,
      })
      setValues(current => ({ ...current, code: '' }))
      resendCountdown.start(RESEND_COOLDOWN_SECONDS)
      toast.success('Enviamos um novo código para o seu e-mail.')
    })

  const handleVerifyCode = () =>
    runRequest(async () => {
      await api.password.verifyRecoveryCode({
        email: values.email,
        role: values.role,
        code: values.code,
      })
      setStep('new-password')
    })

  const handleConfirmPassword = async () => {
    const passwordError = getPasswordError(values)

    if (passwordError) {
      toast.error(passwordError)
      return
    }

    setIsLoading(true)

    try {
      await api.password.confirmPasswordRecovery(values)
      toast.success('Senha redefinida com sucesso. Entre com a nova senha.')
      navigate('/', { replace: true })
    } catch (error) {
      toast.error(extractApiMessage(error) ?? UNEXPECTED_ERROR)

      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setValues(current => ({ ...current, code: '' }))
        setStep('code')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangeEmail = () => {
    setValues(current => ({ ...current, code: '' }))
    setStep('email')
  }

  return (
    <PageForgetPasswordView
      step={step}
      isLoading={isLoading}
      resendCountdown={resendCountdown.secondsLeft}
      values={values}
      onChangeValues={handleChangeValues}
      onChangeRole={handleChangeRole}
      onChangeCode={handleChangeCode}
      onRequestCode={handleRequestCode}
      onResendCode={handleResendCode}
      onVerifyCode={handleVerifyCode}
      onConfirmPassword={handleConfirmPassword}
      onChangeEmail={handleChangeEmail}
    />
  )
}

export { PageForgetPassword }
