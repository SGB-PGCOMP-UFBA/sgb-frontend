import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CpfInput, PhoneInput } from '@/components/ui/masked-input'
import { Separator } from '@/components/ui/separator'
import { api } from '@/api'
import { updateUserFromLocalStorage } from '@/helpers/auth-user'
import type { StoredUser } from '@/helpers/auth-user'
import type { FieldChangeEvent } from '@/types'

export interface ProfileDetailsSectionProps {
  user: StoredUser | null
}

interface ProfileUpdatePayload {
  current_email: string
  email: string
  name: string
  tax_id: string
  phone_number: string
  link_to_lattes?: string
}

function ProfileDetailsSection(props: ProfileDetailsSectionProps) {
  const { user } = props

  const [values, setValues] = useState({
    email: user?.email || '',
    name: user?.name || '',
    tax_id: user?.tax_id || '',
    phone_number: user?.phone_number || '',
    link_to_lattes: user?.link_to_lattes || ''
  })

  const handleChange = (event: FieldChangeEvent) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload: ProfileUpdatePayload = {
      ...values,
      current_email: user?.email || '',
      tax_id: values.tax_id.replace(/[^0-9]/g, ''),
      phone_number: values.phone_number.replace(/[^0-9]/g, '')
    }

    try {
      if(user && user.role === 'ADMIN') {
        delete payload.link_to_lattes
        await api.admin.updateAdmin(payload)
      }
      else if(user && (user.role === 'ADVISOR' || user.role === 'ADVISOR_WITH_ADMIN_PRIVILEGES')) {
        delete payload.link_to_lattes
        await api.advisor.updateAdvisor(payload)
      }
      else if(user && user.role === 'STUDENT') {
        await api.student.updateStudent(payload)
      }
      toast.success('Informações alteradas com sucesso.')
      updateUserFromLocalStorage(payload)
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
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Card className="border-gray-200 shadow-none">
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
          <CardDescription>Informações do Usuário</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="input-name">Name</Label>
              <Input
                id="input-name"
                required
                name="name"
                onChange={(e) => handleChange(e)}
                value={values.name}
                maxLength={80}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="input-email">E-mail</Label>
              <Input
                id="input-email"
                required
                name="email"
                onChange={(e) => handleChange(e)}
                value={values.email}
                maxLength={80}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="input-tax-id">CPF</Label>
              <CpfInput
                id="input-tax-id"
                required
                name="tax_id"
                onChange={(e) => handleChange(e)}
                value={values.tax_id}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="input-phone-number">Telefone</Label>
              <PhoneInput
                id="input-phone-number"
                name="phone_number"
                onChange={(e) => handleChange(e)}
                value={values.phone_number}
              />
            </div>
            {}
            {user?.role === 'STUDENT' && (
              <div className="space-y-1.5">
                <Label htmlFor="input-link-to-lattes">Link para o Lattes</Label>
                <Input
                  id="input-link-to-lattes"
                  name="link_to_lattes"
                  onChange={(e) => handleChange(e)}
                  value={values.link_to_lattes}
                  maxLength={80}
                />
              </div>
            )}
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="justify-end pt-6">
          <Button type="submit">Salvar</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export { ProfileDetailsSection }
