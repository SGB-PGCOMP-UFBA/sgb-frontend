import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { PublicPageLayout } from '@/components/public-page-layout'
import { RoleRadioGroup } from '@/components/role-radio-group'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { FieldChangeEvent, LoginRequest } from '@/types'

export interface LoginFormProps {
  onSubmit: () => void
  formValues: LoginRequest
  onChangeFormValues: (event: FieldChangeEvent) => void
}

function LoginForm(props: LoginFormProps) {
  const { formValues, onChangeFormValues, onSubmit } = props

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
  }

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  return (
    <PublicPageLayout subtitle='Entrar'>
      <form onSubmit={handleSubmit} className='w-full space-y-4'>
        <div className='space-y-1.5'>
          <Label htmlFor='input-email'>E-mail</Label>
          <Input
            required
            type='email'
            id='input-email'
            name='email'
            placeholder='Digite seu e-mail'
            value={formValues.email}
            onChange={onChangeFormValues}
            maxLength={80}
            autoComplete='email'
          />
        </div>

        <div className='space-y-1.5'>
          <Label htmlFor='input-password'>Senha</Label>
          <div className='relative'>
            <Input
              required
              id='input-password'
              name='password'
              placeholder='Digite sua senha'
              value={formValues.password}
              onChange={onChangeFormValues}
              type={showPassword ? 'text' : 'password'}
              maxLength={8}
              autoComplete='current-password'
              className='pr-10'
            />
            <Button
              type='button'
              variant='ghost'
              size='icon'
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={event => event.preventDefault()}
              onMouseUp={event => event.preventDefault()}
              className='absolute right-0 top-0 h-9 w-9 text-muted-foreground hover:bg-transparent'
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </Button>
          </div>
        </div>

        <RoleRadioGroup
          value={formValues.role}
          onValueChange={value =>
            onChangeFormValues({ target: { name: 'role', value } })
          }
        />

        <Button type='submit' className='mt-6 w-full'>
          Entrar
        </Button>
      </form>

      <div className='mb-12 mt-12 flex flex-col items-center justify-center gap-y-4'>
        <p className='text-center text-base font-normal leading-6'>
          Você é estudante e ainda não tem uma conta?{' '}
          <Link
            to='/cadastro-estudante'
            className='text-base font-normal text-blue-600 transition-colors hover:text-blue-800'
          >
            Cadastre-se!
          </Link>
        </p>
        <Link
          to='/esqueci-a-senha'
          className='text-base font-normal leading-6 text-blue-600 transition-colors hover:text-blue-800'
        >
          Esqueceu sua senha?
        </Link>
        <p className='mt-8 text-center text-base font-normal leading-6'>
          Você é orientador?{' '}
          <Link
            to='/cadastro-orientador'
            className='text-base font-normal text-blue-600 transition-colors hover:text-blue-800'
          >
            Saiba como acessar!
          </Link>
        </p>
        <Link
          to='/sobre'
          className='text-base font-normal leading-6 text-blue-600 transition-colors hover:text-blue-800'
        >
          Sobre o Sistema
        </Link>
      </div>
    </PublicPageLayout>
  )
}

export { LoginForm }
