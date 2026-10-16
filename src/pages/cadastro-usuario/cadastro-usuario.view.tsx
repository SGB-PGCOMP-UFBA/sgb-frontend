import { useState } from 'react'
import { ArrowLeft, MailCheck } from 'lucide-react'
import { MdPersonAdd } from 'react-icons/md'
import AppLayout from '@/components/app-layout'
import { PageHeader } from '@/components/page-header'
import { UserFormFields } from '@/components/user-form-fields'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getUserRoleLabel } from '@/constants/user-role.constant'
import { readFormValues } from '@/helpers/form-values.helper'
import type { ManagedUserFormValues } from '@/helpers/managed-user.helper'
import type { UserRole } from '@/types'

export interface CadastroUsuarioViewProps {
  availableRoles: UserRole[]
  onBack: () => void
  onSubmit: (role: UserRole, values: ManagedUserFormValues) => Promise<void>
}

function CadastroUsuarioView({
  availableRoles,
  onBack,
  onSubmit,
}: CadastroUsuarioViewProps) {
  const [role, setRole] = useState<UserRole>(availableRoles[0])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const values = readFormValues<ManagedUserFormValues>(
      new FormData(event.currentTarget)
    )

    setIsSubmitting(true)
    await onSubmit(role, values)
    setIsSubmitting(false)
  }

  return (
    <AppLayout>
      <div className='mb-4'>
        <Button variant='ghost' onClick={onBack}>
          <ArrowLeft />
          Voltar para usuários
        </Button>
      </div>

      <PageHeader
        title='Novo usuário'
        description='Cadastro de estudante, orientador ou administrador'
        icon={MdPersonAdd}
        iconBackgroundClassName='bg-indigo-400'
      />

      <form
        onSubmit={submit}
        className='rounded-xl border border-gray-200 bg-white'
      >
        <div className='space-y-8 p-6'>
          <fieldset>
            <legend className='mb-4 text-base font-semibold text-gray-900'>
              Perfil
            </legend>
            <div className='grid grid-cols-1 gap-x-6 md:grid-cols-2 lg:grid-cols-6'>
              <div className='space-y-1.5 lg:col-span-2'>
                <Label htmlFor='new-user-role'>Tipo de usuário</Label>
                <Select
                  value={role}
                  onValueChange={value => setRole(value as UserRole)}
                >
                  <SelectTrigger id='new-user-role'>
                    <SelectValue placeholder='Selecione um perfil' />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRoles.map(option => (
                      <SelectItem key={option} value={option}>
                        {getUserRoleLabel(option)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className='mb-4 text-base font-semibold text-gray-900'>
              Dados do usuário
            </legend>
            <UserFormFields key={role} role={role} idPrefix='new-user' />
          </fieldset>

          <div
            role='note'
            className='flex items-start gap-3 rounded-md border border-sky-200 bg-sky-50 p-3 text-sm text-sky-900'
          >
            <MailCheck className='mt-0.5 h-5 w-5 shrink-0' />
            <p>
              Ao criar, o sistema gera uma senha automaticamente e envia um
              e-mail de boas-vindas para o endereço informado, com a senha de
              acesso. Se o e-mail não puder ser enviado, o cadastro não é
              concluído.
            </p>
          </div>
        </div>

        <div className='flex justify-end gap-2 border-t border-gray-200 px-6 py-4'>
          <Button type='button' variant='ghost' onClick={onBack}>
            Cancelar
          </Button>
          <Button
            type='submit'
            disabled={isSubmitting}
            className='bg-green-600 text-white hover:bg-green-700'
          >
            {isSubmitting ? 'Criando...' : 'Criar e enviar e-mail'}
          </Button>
        </div>
      </form>
    </AppLayout>
  )
}

export { CadastroUsuarioView }
