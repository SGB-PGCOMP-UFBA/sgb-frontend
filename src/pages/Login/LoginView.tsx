import { Box } from '@mui/material'
import { LoginForm } from './components/LoginForm'
import type { LoginRequest } from '../../types'

export interface LoginViewProps {
  onSubmit: () => void
  formValues: LoginRequest
  onChangeFormValues: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function LoginView(props: LoginViewProps) {
  const { formValues, onChangeFormValues, onSubmit } = props;

  return (
    <Box className="flex h-full w-full p-5 md:p-10">
      <LoginForm formValues={formValues} onChangeFormValues={onChangeFormValues} onSubmit={onSubmit} />
    </Box>
  )
}

export { LoginView }
