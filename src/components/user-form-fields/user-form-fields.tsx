import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CpfInput, PhoneInput } from '@/components/ui/masked-input'
import { CPF_INVALID, getCpfError } from '@/helpers/cpf.helper'
import { isStudentRole } from '@/helpers/managed-user.helper'
import type { ManagedUser, UserRole } from '@/types'

export interface UserFormFieldsProps {
  role: UserRole
  defaultValues?: Partial<ManagedUser>
  idPrefix?: string
}

function UserFormFields({
  role,
  defaultValues,
  idPrefix = 'user',
}: UserFormFieldsProps) {
  const id = (field: string) => `${idPrefix}-${field}`
  const cpfFieldRef = useRef<HTMLDivElement>(null)
  const [cpfError, setCpfError] = useState<string>()

  // O CpfInput não expõe a ref do input; o erro vai para o próprio input via
  // setCustomValidity, assim o navegador impede o envio e mostra a mensagem.
  // Na tela só aparece o CPF completo e inválido: o incompleto ainda está
  // sendo digitado.
  const validateCpf = (value: string) => {
    const error = getCpfError(value)
    setCpfError(error)
    cpfFieldRef.current?.querySelector('input')?.setCustomValidity(error ?? '')
  }

  useEffect(() => {
    validateCpf(cpfFieldRef.current?.querySelector('input')?.value ?? '')
  }, [])

  const wideField = 'space-y-1.5 lg:col-span-3'
  const shortField = 'space-y-1.5 lg:col-span-2'

  return (
    <div className='grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2 lg:grid-cols-6'>
      <div className={wideField}>
        <Label htmlFor={id('name')}>Nome</Label>
        <Input
          required
          id={id('name')}
          type='text'
          name='name'
          placeholder='Insira o nome do usuário'
          defaultValue={defaultValues?.name}
          maxLength={80}
        />
      </div>

      <div className={wideField}>
        <Label htmlFor={id('email')}>E-mail</Label>
        <Input
          required
          id={id('email')}
          type='email'
          name='email'
          placeholder='Insira o e-mail do usuário'
          defaultValue={defaultValues?.email}
          maxLength={80}
        />
      </div>

      <div ref={cpfFieldRef} className={shortField}>
        <Label htmlFor={id('tax_id')}>
          CPF{isStudentRole(role) ? '' : ' (opcional)'}
        </Label>
        <CpfInput
          required={isStudentRole(role)}
          id={id('tax_id')}
          name='tax_id'
          placeholder='Insira o CPF do usuário'
          defaultValue={defaultValues?.tax_id ?? undefined}
          onChange={event => validateCpf(event.target.value)}
        />
        {cpfError === CPF_INVALID && (
          <p role='alert' className='text-xs text-red-600'>
            {cpfError}
          </p>
        )}
      </div>

      <div className={shortField}>
        <Label htmlFor={id('phone_number')}>Telefone (opcional)</Label>
        <PhoneInput
          id={id('phone_number')}
          name='phone_number'
          placeholder='Insira o telefone do usuário'
          defaultValue={defaultValues?.phone_number ?? undefined}
        />
      </div>

      {isStudentRole(role) && (
        <div className={shortField}>
          <Label htmlFor={id('link_to_lattes')}>
            Link do Lattes (opcional)
          </Label>
          <Input
            id={id('link_to_lattes')}
            type='url'
            name='link_to_lattes'
            placeholder='Insira o link do Lattes'
            defaultValue={defaultValues?.link_to_lattes ?? undefined}
            maxLength={80}
          />
        </div>
      )}
    </div>
  )
}

export { UserFormFields }
