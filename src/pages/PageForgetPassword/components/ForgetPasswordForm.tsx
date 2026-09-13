import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '@/components/loading'
import { PublicPageLayout } from '@/components/public-page-layout'
import { RoleRadioGroup } from '@/components/role-radio-group'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '../../../api'
import type { ResetPasswordPayload } from '../../../api/password'

function getServerErrorMessage(error: unknown): string {
  const data: unknown = axios.isAxiosError(error)
    ? error.response?.data
    : undefined

  const message =
    data && typeof data === 'object' && 'message' in data
      ? data.message
      : undefined

  return String(message)
}

const initialState: ResetPasswordPayload = {
  email: '',
  role: 'STUDENT',
}

function ForgetPasswordForm() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState<ResetPasswordPayload>(initialState)

  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const { email, role } = values

    try {
      const response = await api.password.resetPassword({ email, role })

      if (response.status === 201) {
        toast.success('Sua nova senha foi enviada para seu e-mail.')
        navigate('/', { replace: true })
      }
    } catch (error) {
      toast.error(`${getServerErrorMessage(error)}`)
    } finally {
      setValues(initialState)
      setIsLoading(false)
    }
  }

  return (
    <PublicPageLayout
      subtitle='Recuperar Senha'
      contentClassName={isLoading ? 'mt-20 w-full' : 'mt-4 w-full'}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit} className='w-full'>
          <div className='mb-8 mt-4'>
            <RoleRadioGroup
              defaultValue={initialState.role}
              onValueChange={value =>
                setValues(current => ({
                  ...current,
                  role: value as typeof current.role,
                }))
              }
            />
          </div>

          <div className='space-y-1.5'>
            <Label htmlFor='email'>E-mail</Label>
            <Input
              required
              id='email'
              name='email'
              type='email'
              value={values.email}
              onChange={handleChangeValues}
              placeholder='Digite seu e-mail'
              maxLength={80}
            />
            <p className='text-sm text-muted-foreground'>
              Informe o endereço de e-mail utilizado em seu cadastro
            </p>
          </div>

          <Button type='submit' className='mb-4 mt-12 w-full'>
            Enviar
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
      )}
    </PublicPageLayout>
  )
}

export { ForgetPasswordForm }
