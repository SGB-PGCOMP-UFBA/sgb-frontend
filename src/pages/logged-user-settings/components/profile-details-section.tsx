import { useEffect, useState } from 'react'
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
import { api } from '@/services'
import { isClientError } from '@/helpers/api-error.helper'
import { updateUserFromLocalStorage } from '@/helpers/auth-user.helper'
import { useFormChanges } from '@/hooks/use-form-changes'
import type { StoredUser } from '@/helpers/auth-user.helper'
import type { FieldChangeEvent, ManagedUser } from '@/types'

export interface ProfileDetailsSectionProps {
  user: StoredUser | null
}

type ProfileValues = {
  name: string
  email: string
  tax_id: string
  phone_number: string
  link_to_lattes: string
}

function toProfileValues(profile: ManagedUser): ProfileValues {
  return {
    name: profile.name,
    email: profile.email,
    tax_id: profile.tax_id ?? '',
    phone_number: profile.phone_number ?? '',
    link_to_lattes: profile.link_to_lattes ?? ''
  }
}

type ProfileLoad = 'loading' | 'loaded' | 'failed'

/**
 * O formulario so aparece com o cadastro vindo de `GET /v1/user/me`. O
 * usuario guardado no login nao tem todos os campos (o Lattes, por exemplo),
 * e um campo vazio enviado no salvar apaga o valor gravado.
 */
function ProfileDetailsSection(props: ProfileDetailsSectionProps) {
  const { user } = props

  const [values, setValues] = useState<ProfileValues | null>(null)
  const [load, setLoad] = useState<ProfileLoad>('loading')

  const userId = user?.id

  useEffect(() => {
    if (userId === undefined) return

    let active = true
    api.user
      .getProfile()
      .then(response => {
        if (!active) return
        setValues(toProfileValues(response.data))
        setLoad('loaded')
      })
      .catch(() => {
        if (active) setLoad('failed')
      })

    return () => {
      active = false
    }
  }, [userId])

  const handleChange = (event: FieldChangeEvent) => {
    setValues(current =>
      current && { ...current, [event.target.name]: event.target.value }
    )
  }

  const { formProps, hasChanges, resetChanges } = useFormChanges()
  const isStudent = user?.role === 'STUDENT'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    if (!user || !values || !hasChanges(form)) {
      return
    }

    const payload = {
      name: values.name,
      email: values.email,
      tax_id: values.tax_id.replace(/[^0-9]/g, ''),
      phone_number: values.phone_number.replace(/[^0-9]/g, ''),
      ...(isStudent && { link_to_lattes: values.link_to_lattes })
    }

    try {
      await api.user.updateProfile(payload)
      toast.success('Informações alteradas com sucesso.')
      updateUserFromLocalStorage({
        ...payload,
        tax_id: payload.tax_id || null,
        phone_number: payload.phone_number || null
      })
      resetChanges(form)
    } catch (error) {
      if (axios.isAxiosError(error) && isClientError(error.response?.status)) {
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

  if (load !== 'loaded' || !values) {
    return (
      <Card className="border-gray-200 shadow-none">
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
          <CardDescription>Informações do Usuário</CardDescription>
        </CardHeader>
        <CardContent>
          {load === 'failed' ? (
            <p className="text-sm text-red-600">
              Não foi possível carregar o seu perfil. Recarregue a página para
              tentar de novo.
            </p>
          ) : (
            <p role="status" className="text-sm text-gray-500">
              Carregando perfil...
            </p>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <form {...formProps} autoComplete="off" onSubmit={handleSubmit}>
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
                required={isStudent}
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
            {isStudent && (
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
