import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CpfInput, PhoneInput } from '@/components/ui/masked-input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getUserRoleLabel } from '@/constants/user-role.constant'
import { readFormValues } from '@/helpers/form-values.helper'
import type { ManagedUser, UserStatus } from '@/types'

export interface EdicaoUsuarioFormValues {
  name: string
  email: string
  tax_id: string
  phone_number: string
  /** Só vem para orientadores. */
  status?: UserStatus
  /** Só vem para estudantes. */
  link_to_lattes?: string
}

export interface DialogEdicaoUsuarioProps {
  item: ManagedUser
  isOpen: boolean
  onClose: () => void
  onSubmit: (user: ManagedUser, values: EdicaoUsuarioFormValues) => void
}

const isAdvisor = (user: ManagedUser) =>
  user.role === 'ADVISOR' || user.role === 'ADVISOR_WITH_ADMIN_PRIVILEGES'

function DialogEdicaoUsuario({
  item,
  isOpen,
  onClose,
  onSubmit,
}: DialogEdicaoUsuarioProps) {
  const submitAndCloseDialog = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const values = readFormValues<EdicaoUsuarioFormValues>(
      new FormData(event.currentTarget)
    )

    onSubmit(item, values)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className='sm:max-w-[595px]'>
        <form onSubmit={submitAndCloseDialog}>
          <DialogHeader>
            <DialogTitle>Editar {getUserRoleLabel(item.role)}</DialogTitle>
          </DialogHeader>

          <div className='flex flex-col space-y-4 pt-4'>
            <div className='space-y-1.5'>
              <Label htmlFor='name'>Nome</Label>
              <Input
                required
                id='name'
                type='text'
                name='name'
                placeholder='Insira o nome do usuário'
                defaultValue={item.name}
                maxLength={80}
              />
            </div>

            <div className='space-y-1.5'>
              <Label htmlFor='email'>E-mail</Label>
              <Input
                required
                id='email'
                type='email'
                name='email'
                placeholder='Insira o e-mail do usuário'
                defaultValue={item.email}
                maxLength={80}
              />
            </div>

            <div className='space-y-1.5'>
              <Label htmlFor='tax_id'>CPF</Label>
              <CpfInput
                id='tax_id'
                name='tax_id'
                placeholder='Insira o CPF do usuário'
                defaultValue={item.tax_id ?? undefined}
              />
            </div>

            <div className='space-y-1.5'>
              <Label htmlFor='phone_number'>Telefone</Label>
              <PhoneInput
                id='phone_number'
                name='phone_number'
                placeholder='Insira o telefone do usuário'
                defaultValue={item.phone_number ?? undefined}
              />
            </div>

            {item.role === 'STUDENT' && (
              <div className='space-y-1.5'>
                <Label htmlFor='link_to_lattes'>Link do Lattes</Label>
                <Input
                  required
                  id='link_to_lattes'
                  type='url'
                  name='link_to_lattes'
                  placeholder='Insira o link do Lattes'
                  defaultValue={item.link_to_lattes ?? undefined}
                  maxLength={80}
                />
              </div>
            )}

            {isAdvisor(item) && (
              <div className='space-y-1.5'>
                <Label htmlFor='select-status'>Situação</Label>
                <Select
                  name='status'
                  required
                  defaultValue={item.status ?? 'ACTIVE'}
                >
                  <SelectTrigger id='select-status'>
                    <SelectValue placeholder='Selecione uma situação' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='ACTIVE'>Ativo(a)</SelectItem>
                    <SelectItem value='INACTIVE'>Inativo(a)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <DialogFooter className='gap-x-4 pt-6'>
            <Button type='button' onClick={onClose} variant='ghost' size='sm'>
              Cancelar
            </Button>
            <Button
              type='submit'
              size='sm'
              className='bg-green-600 text-white hover:bg-green-700'
            >
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { DialogEdicaoUsuario }
