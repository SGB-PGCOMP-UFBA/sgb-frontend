import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
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
import { readFormValues } from '../../../helpers/form-values'

export interface InclusaoOrientadorFormValues {
  name: string
  email: string
  tax_id: string
  phone_number: string
}

export interface DialogInclusaoOrientadorProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: InclusaoOrientadorFormValues) => void
}

function DialogInclusaoOrientador({
  isOpen,
  onClose,
  onSubmit,
}: DialogInclusaoOrientadorProps) {
  const submitAndCloseDialog = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    const newAdvisorData = new FormData(event.currentTarget)

    onSubmit(readFormValues<InclusaoOrientadorFormValues>(newAdvisorData))
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className='sm:max-w-[595px]'>
        <form onSubmit={submitAndCloseDialog}>
          <DialogHeader>
            <DialogTitle>
              <span className='flex items-center gap-x-2'>
                Adicionar Orientador
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type='button'
                      className='text-sky-600'
                      aria-label='Sobre o cadastro do(a) orientador(a)'
                    >
                      <Info className='h-5 w-5' />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className='max-w-xs text-center'>
                    O(a) orientador(a) receberá no e-mail informado abaixo uma
                    mensagem informando sobre o seu cadastro bem como a senha
                    para acesso à plataforma.
                  </TooltipContent>
                </Tooltip>
              </span>
            </DialogTitle>
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
                maxLength={80}
              />
            </div>

            <div className='space-y-1.5'>
              <Label htmlFor='tax_id'>CPF</Label>
              <CpfInput
                id='tax_id'
                name='tax_id'
                placeholder='Insira o CPF do orientador'
              />
            </div>

            <div className='space-y-1.5'>
              <Label htmlFor='phone_number'>Telefone</Label>
              <PhoneInput
                id='phone_number'
                name='phone_number'
                placeholder='Insira o telefone do orientador'
              />
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

export { DialogInclusaoOrientador }
