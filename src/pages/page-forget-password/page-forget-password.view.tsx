import Loading from '@/components/loading'
import { PublicPageLayout } from '@/components/public-page-layout'
import type { ConfirmPasswordRecoveryPayload } from '@/services/password'
import type { FieldChangeEvent, UserRole } from '@/types'
import { ForgetPasswordForm } from './components/forget-password-form'
import { NewPasswordForm } from './components/new-password-form'
import { VerifyCodeForm } from './components/verify-code-form'

export type RecoveryStep = 'email' | 'code' | 'new-password'

export interface PageForgetPasswordViewProps {
  step: RecoveryStep
  isLoading: boolean
  resendCountdown: number
  values: ConfirmPasswordRecoveryPayload
  onChangeValues: (event: FieldChangeEvent) => void
  onChangeRole: (role: UserRole) => void
  onChangeCode: (code: string) => void
  onRequestCode: () => void
  onResendCode: () => void
  onVerifyCode: () => void
  onConfirmPassword: () => void
  onChangeEmail: () => void
}

function PageForgetPasswordView(props: PageForgetPasswordViewProps) {
  const { step, isLoading, values, onChangeValues } = props

  const renderStep = () => {
    if (isLoading) {
      return <Loading />
    }

    if (step === 'code') {
      return (
        <VerifyCodeForm
          email={values.email}
          code={values.code}
          resendCountdown={props.resendCountdown}
          onChangeCode={props.onChangeCode}
          onSubmit={props.onVerifyCode}
          onResendCode={props.onResendCode}
          onChangeEmail={props.onChangeEmail}
        />
      )
    }

    if (step === 'new-password') {
      return (
        <NewPasswordForm
          newPassword={values.new_password}
          confirmNewPassword={values.confirm_new_password}
          onChangeValues={onChangeValues}
          onSubmit={props.onConfirmPassword}
        />
      )
    }

    return (
      <ForgetPasswordForm
        email={values.email}
        role={values.role}
        onChangeValues={onChangeValues}
        onChangeRole={props.onChangeRole}
        onSubmit={props.onRequestCode}
      />
    )
  }

  return (
    <PublicPageLayout
      subtitle='Recuperar Senha'
      contentClassName={isLoading ? 'mt-20 w-full' : 'mt-4 w-full'}
    >
      {renderStep()}
    </PublicPageLayout>
  )
}

export { PageForgetPasswordView }
