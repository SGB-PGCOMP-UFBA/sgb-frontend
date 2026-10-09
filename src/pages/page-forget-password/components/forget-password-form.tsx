import { Link } from 'react-router-dom'
import { RoleRadioGroup } from '@/components/role-radio-group'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { FieldChangeEvent, UserRole } from '@/types'

export interface ForgetPasswordFormProps {
  email: string
  role: UserRole
  onChangeValues: (event: FieldChangeEvent) => void
  onChangeRole: (role: UserRole) => void
  onSubmit: () => void
}

function ForgetPasswordForm(props: ForgetPasswordFormProps) {
  const { email, role, onChangeValues, onChangeRole, onSubmit } = props

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <div className='mb-8 mt-4'>
        <RoleRadioGroup
          value={role}
          onValueChange={value => onChangeRole(value as UserRole)}
        />
      </div>

      <div className='space-y-1.5'>
        <Label htmlFor='email'>E-mail</Label>
        <Input
          required
          id='email'
          name='email'
          type='email'
          value={email}
          onChange={onChangeValues}
          placeholder='Digite seu e-mail'
          maxLength={80}
          autoComplete='email'
        />
        <p className='text-sm text-muted-foreground'>
          Enviaremos um código de verificação para o e-mail do seu cadastro
        </p>
      </div>

      <Button type='submit' className='mb-4 mt-12 w-full'>
        Enviar código
      </Button>

      <div className='mb-12 mt-12 flex justify-end'>
        <p className='text-center text-base font-normal leading-6'>
          Lembrou sua senha?{' '}
          <Link
            to='/'
            className='text-base font-normal text-blue-600 transition-colors hover:text-blue-800'
          >
            Entrar!
          </Link>
        </p>
      </div>
    </form>
  )
}

export { ForgetPasswordForm }
