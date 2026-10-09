import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { Button } from '@/components/ui/button'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'

const CODE_LENGTH = 6

export interface VerifyCodeFormProps {
  email: string
  code: string
  resendCountdown: number
  onChangeCode: (code: string) => void
  onSubmit: () => void
  onResendCode: () => void
  onChangeEmail: () => void
}

function VerifyCodeForm(props: VerifyCodeFormProps) {
  const {
    email,
    code,
    resendCountdown,
    onChangeCode,
    onSubmit,
    onResendCode,
    onChangeEmail,
  } = props

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <p className='mb-6 mt-4 text-sm text-muted-foreground'>
        Se houver uma conta para <b>{email}</b>, enviamos um código de 6
        dígitos válido por 15 minutos.
      </p>

      <div className='flex flex-col items-center space-y-1.5'>
        <Label htmlFor='code'>Código de verificação</Label>
        <InputOTP
          id='code'
          name='code'
          maxLength={CODE_LENGTH}
          pattern={REGEXP_ONLY_DIGITS}
          value={code}
          onChange={onChangeCode}
          autoComplete='one-time-code'
        >
          <InputOTPGroup className='gap-2 sm:gap-3'>
            {Array.from({ length: CODE_LENGTH }, (_, index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className='h-11 w-11 rounded-md border text-lg sm:h-14 sm:w-14 sm:text-2xl'
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Button
        type='submit'
        className='mb-4 mt-12 w-full'
        disabled={code.length < CODE_LENGTH}
      >
        Validar código
      </Button>

      <div className='mb-12 mt-4 flex flex-wrap justify-between gap-2'>
        <Button type='button' variant='link' className='px-0' onClick={onChangeEmail}>
          Usar outro e-mail
        </Button>
        <Button
          type='button'
          variant='link'
          className='px-0'
          onClick={onResendCode}
          disabled={resendCountdown > 0}
        >
          {resendCountdown > 0
            ? `Reenviar código em ${formatCountdown(resendCountdown)}`
            : 'Reenviar código'}
        </Button>
      </div>
    </form>
  )
}

function formatCountdown(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const rest = String(seconds % 60).padStart(2, '0')

  return `${minutes}:${rest}`
}

export { VerifyCodeForm }
