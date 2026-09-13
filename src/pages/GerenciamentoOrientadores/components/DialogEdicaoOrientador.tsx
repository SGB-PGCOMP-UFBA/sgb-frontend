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
import type { UpdateAdvisorPayload } from '@/api/advisor'
import type { AdvisorDetailed, UserStatus } from '@/types'
import { readFormValues } from '@/helpers/form-values'

export interface EdicaoOrientadorFormFields {
  name: string
  email: string
  tax_id: string
  phone_number: string
  status: UserStatus
}

export interface DialogEdicaoOrientadorProps {
  item: AdvisorDetailed
  isOpen: boolean
  onClose: () => void
  onSubmit: (payload: UpdateAdvisorPayload) => void
}

function DialogEdicaoOrientador({
  item,
  isOpen,
  onClose,
  onSubmit,
}: DialogEdicaoOrientadorProps) {
  const submitAndCloseDialog = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    const newFormData = new FormData(event.currentTarget)
    const entries = readFormValues<EdicaoOrientadorFormFields>(newFormData)

    const payload: UpdateAdvisorPayload = {
      ...entries,
      current_email: item.email,
      tax_id: entries.tax_id.replace(/[^0-9]/g, ''),
      phone_number: entries.phone_number.replace(/[^0-9]/g, ''),
      status: entries.status,
    }

    onSubmit(payload)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className='sm:max-w-[595px]'>
        <form onSubmit={submitAndCloseDialog}>
          <DialogHeader>
            <DialogTitle>Editar Orientador</DialogTitle>
          </DialogHeader>

          <div className='flex flex-col space-y-4 pt-4'>
            <div className='space-y-1.5'>
              <Label htmlFor='name'>Nome</Label>
              <Input
                required
                id='name'
                type='text'
                name='name'
                placeholder='Insira o nome do orientador'
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
                placeholder='Insira o e-mail do orientador'
                defaultValue={item.email}
                maxLength={80}
              />
            </div>

            <div className='space-y-1.5'>
              <Label htmlFor='tax_id'>CPF</Label>
              <CpfInput
                id='tax_id'
                name='tax_id'
                placeholder='Insira o CPF do orientador'
                defaultValue={item.tax_id ?? undefined}
              />
            </div>

            <div className='space-y-1.5'>
              <Label htmlFor='phone_number'>Telefone</Label>
              <PhoneInput
                id='phone_number'
                name='phone_number'
                placeholder='Insira o telefone do orientador'
                defaultValue={item.phone_number ?? undefined}
              />
            </div>

            <div className='space-y-1.5'>
              <Label htmlFor='select-status'>Situação</Label>
              <Select name='status' required defaultValue={item.status}>
                <SelectTrigger id='select-status'>
                  <SelectValue placeholder='Selecione uma situação' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='ACTIVE'>Ativo(a)</SelectItem>
                  <SelectItem value='INACTIVE'>Inativo(a)</SelectItem>
                </SelectContent>
              </Select>
            </div>
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

export { DialogEdicaoOrientador }
