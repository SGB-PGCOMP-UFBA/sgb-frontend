import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { PublicPageLayout } from '@/components/public-page-layout'
import { PasswordField } from '@/components/password-field'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CpfInput, PhoneInput } from '@/components/ui/masked-input'
import { api } from '../../../api'
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
} from '../../../helpers/auth-user'
import type { StoredUser } from '../../../helpers/auth-user'
import { delay } from '../../../helpers/delay'
import axios from 'axios'
import type { FieldChangeEvent } from '../../../types'

export interface RegisterFormValues {
  tax_id: string
  email: string
  phone_number: string
  link_to_lattes: string
  name: string
  password: string
  confirm_password: string
}

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

const initialState: RegisterFormValues = {
  tax_id: '',
  email: '',
  phone_number: '',
  link_to_lattes: '',
  name: '',
  password: '',
  confirm_password: '',
}

function RegisterForm() {
  const navigate = useNavigate()

  const [values, setValues] = useState<RegisterFormValues>(initialState)

  const handleChangeValues = (e: FieldChangeEvent) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const firstRedirect = (user: StoredUser | null) => {
    if (user && user.role === 'ADMIN') {
      navigate('/dashboard', { replace: true })
    } else if (
      user &&
      (user.role === 'ADVISOR' || user.role === 'ADVISOR_WITH_ADMIN_PRIVILEGES')
    ) {
      navigate('/orientandos', { replace: true })
    } else if (user && user.role === 'STUDENT') {
      navigate('/area-do-estudante', { replace: true })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (values.password !== values.confirm_password) {
      toast.error('As senhas digitadas são diferentes!')
      return
    }

    try {
      const createStudentResponse = await api.student.createStudent({
        email: values.email,
        name: values.name,
        link_to_lattes: values.link_to_lattes,
        password: values.password,
        tax_id: values.tax_id.replace(/[^0-9]/g, ''),
        phone_number: values.phone_number.replace(/[^0-9]/g, ''),
      })

      if ([200, 201].includes(createStudentResponse.status)) {
        toast.success(
          'Cadastro realizado com sucesso! Em poucos segundos você será redirecionado.',
          { autoClose: 2000 }
        )

        const loginResponse = await api.auth.login({
          email: values.email,
          password: values.password,
          role: 'STUDENT',
        })

        if ([200, 201].includes(loginResponse.status)) {
          addUserToLocalStorage(loginResponse.data)

          await delay(2000)

          firstRedirect(getUserFromLocalStorage())
        }
      }
    } catch (error) {
      toast.error(`${getServerErrorMessage(error)}`)
    }
  }

  return (
    <PublicPageLayout subtitle='Cadastro'>
      <form onSubmit={handleSubmit} className='w-full'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='space-y-1.5 sm:col-span-2'>
            <Label htmlFor='name'>Nome Completo</Label>
            <Input
              required
              id='name'
              name='name'
              value={values.name}
              onChange={handleChangeValues}
              placeholder='Insira o seu nome completo'
              maxLength={80}
            />
          </div>

          <div className='space-y-1.5'>
            <Label htmlFor='phone_number'>Telefone</Label>
            <PhoneInput
              required
              id='phone_number'
              name='phone_number'
              value={values.phone_number}
              onChange={handleChangeValues}
              placeholder='Insira o seu telefone'
            />
          </div>

          <div className='space-y-1.5'>
            <Label htmlFor='tax_id'>CPF</Label>
            <CpfInput
              required
              id='tax_id'
              name='tax_id'
              value={values.tax_id}
              onChange={handleChangeValues}
              placeholder='Insira o seu CPF'
            />
          </div>

          <div className='space-y-1.5 sm:col-span-2'>
            <Label htmlFor='link_to_lattes'>Currículo Lattes</Label>
            <Input
              required
              id='link_to_lattes'
              name='link_to_lattes'
              value={values.link_to_lattes}
              onChange={handleChangeValues}
              placeholder='Insira o link de seu currículo Lattes'
              maxLength={80}
            />
          </div>

          <div className='space-y-1.5 sm:col-span-2'>
            <Label htmlFor='email'>E-mail</Label>
            <Input
              required
              id='email'
              name='email'
              type='email'
              value={values.email}
              onChange={handleChangeValues}
              placeholder='Insira o seu e-mail'
              maxLength={80}
            />
          </div>

          <PasswordField
            required
            id='password'
            name='password'
            label='Senha'
            value={values.password}
            onChange={handleChangeValues}
            placeholder='Insira uma senha'
            minLength={4}
            maxLength={8}
            error={
              values.password === '' ? 'Digite uma senha válida' : undefined
            }
          />

          <PasswordField
            required
            id='confirm_password'
            name='confirm_password'
            label='Confirmar Senha'
            value={values.confirm_password}
            onChange={handleChangeValues}
            placeholder='Digite sua senha novamente'
            minLength={4}
            maxLength={8}
            error={
              values.password !== values.confirm_password
                ? 'As senhas digitadas são diferentes!'
                : undefined
            }
          />
        </div>

        <Button type='submit' className='mb-4 mt-6 w-full'>
          Enviar
        </Button>

        <div className='mb-12 mt-12 flex justify-end'>
          <p className='text-center text-base font-normal leading-6'>
            Já possui uma conta?{' '}
            <Link
              to='/'
              className='text-base font-normal text-blue-600 transition-colors hover:text-blue-800'
            >
              Entrar!
            </Link>
          </p>
        </div>
      </form>
    </PublicPageLayout>
  )
}

export { RegisterForm }
