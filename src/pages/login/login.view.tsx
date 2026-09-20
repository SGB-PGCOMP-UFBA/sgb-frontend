import { LoginForm } from './components/login-form'
import type { FieldChangeEvent, LoginRequest } from '@/types'

export interface LoginViewProps {
  onSubmit: () => void
  formValues: LoginRequest
  onChangeFormValues: (event: FieldChangeEvent) => void
}

function LoginView(props: LoginViewProps) {
  const { formValues, onChangeFormValues, onSubmit } = props

  return (
    <LoginForm formValues={formValues} onChangeFormValues={onChangeFormValues} onSubmit={onSubmit} />
  )
}

export { LoginView }
