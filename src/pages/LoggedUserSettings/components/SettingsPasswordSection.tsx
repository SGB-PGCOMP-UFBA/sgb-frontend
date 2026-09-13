import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { PasswordField } from '@/components/password-field'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { api } from '../../../api'
import type { StoredUser } from '../../../helpers/auth-user'

export interface SettingsPasswordSectionProps {
  user: StoredUser | null
}

function SettingsPasswordSection(props: SettingsPasswordSectionProps) {
  const { user } = props
  const [values, setValues] = useState({
    email: user?.email || '',
    current_password: '',
    new_password: '',
    confirm_new_password: ''
  })

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setValues({ ...values, email: user?.email ?? '' })
      if(user && user.role === 'ADMIN') {
        await api.admin.updateAdminPassword(values)
      }
      else if(user && (user.role === 'ADVISOR' || user.role === 'ADVISOR_WITH_ADMIN_PRIVILEGES')) {
        await api.advisor.updateAdvisorPassword(values)
      }
      else if(user && user.role === 'STUDENT') {
        await api.student.updateStudentPassword(values)
      }
      toast.success('Senha alterada com sucesso.')

      setValues({
        email: user?.email || '',
        current_password: '',
        new_password: '',
        confirm_new_password: ''
      })
    } catch (error) {
      if (axios.isAxiosError(error) && [400, 422].includes(error.response?.status ?? 0)) {
        toast.error(getFirstErrorMessage(error.response?.data))
      } else {
        toast.error('Erro inesperado. Tente novamente!')
      }
    }
  }

  function getFirstErrorMessage(data: unknown): string {
    const message =
      data && typeof data === 'object' && 'message' in data ? data.message : undefined

    if (Array.isArray(message)) {
      return String(message[0]);
    }
    return String(message);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-gray-200 shadow-none">
        <CardHeader>
          <CardTitle>Senha</CardTitle>
          <CardDescription>Atualizar Senha de Acesso</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="flex max-w-[450px] flex-col gap-6">
            <PasswordField
              id="current_password"
              name="current_password"
              label="Senha Atual"
              onChange={(e) => handleChange(e)}
              value={values.current_password}
            />
            <PasswordField
              id="new_password"
              name="new_password"
              label="Nova Senha"
              onChange={(e) => handleChange(e)}
              value={values.new_password}
            />
            <PasswordField
              id="confirm_new_password"
              name="confirm_new_password"
              label="Confirmar Nova Senha"
              onChange={(e) => handleChange(e)}
              value={values.confirm_new_password}
            />

            <span className="text-xs text-gray-500">
              Sua senha deve ter entre 4 e 8 caracteres, incluindo letras e números.
            </span>
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="justify-end pt-6">
          <Button type="submit">Salvar Senha</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export { SettingsPasswordSection }
