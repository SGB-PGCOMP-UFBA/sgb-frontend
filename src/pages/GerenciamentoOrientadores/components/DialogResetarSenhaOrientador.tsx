import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { ResetPasswordPayload } from '@/api/password'
import type { AdvisorDetailed } from '@/types'

export interface DialogResetarSenhaOrientadorProps {
  item: AdvisorDetailed
  isOpen: boolean
  onClose: () => void
  onSubmit: (payload: ResetPasswordPayload) => void
}

function DialogResetarSenhaOrientador({
  item,
  isOpen,
  onClose,
  onSubmit,
}: DialogResetarSenhaOrientadorProps) {
  const submitAndCloseDialog = async () => {
    onSubmit({ email: item.email, role: item.role })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className='font-inter sm:max-w-[595px]'>
        <DialogHeader>
          <DialogTitle>Resetar a Senha do Orientador</DialogTitle>
        </DialogHeader>

        <div className='flex flex-col'>
          <p>
            Você tem certeza que deseja resetar a senha do(a) orientador(a){' '}
            <b>{item.name}</b>?
          </p>
          <br />
          <p>
            Ele(a) receberá uma nova senha no e-mail informado em seu cadastro
            nesta plataforma.
          </p>
        </div>

        <DialogFooter className='gap-x-4'>
          <Button onClick={onClose} variant='ghost' size='sm'>
            Cancelar
          </Button>
          <Button
            onClick={() => submitAndCloseDialog()}
            size='sm'
            className='bg-green-600 text-white hover:bg-green-700'
          >
            Resetar Senha
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { DialogResetarSenhaOrientador }
