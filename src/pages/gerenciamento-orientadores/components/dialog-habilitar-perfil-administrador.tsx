import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { AdvisorDetailed } from '@/types'

export interface DialogHabilitarPerfilAdministradorProps {
  item: AdvisorDetailed
  isOpen: boolean
  onClose: () => void
  onSubmit: (advisorId: number) => void
}

function DialogHabilitarPerfilAdministrador({
  item,
  isOpen,
  onClose,
  onSubmit,
}: DialogHabilitarPerfilAdministradorProps) {
  const submitAndCloseDialog = async () => {
    onSubmit(item.id)
    onClose()
  }

  const title = item.has_admin_privileges
    ? 'Desabilitar Perfil de Administrador'
    : 'Habilitar Perfil de Administrador'

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className='font-inter sm:max-w-[595px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className='flex flex-col'>
          <p>
            Você tem certeza que deseja{' '}
            {item.has_admin_privileges ? 'desabilitar' : 'habilitar'} o perfil
            de administrador do orientador(a) <b>{item.name}</b>?
          </p>
        </div>

        <DialogFooter className='gap-x-4'>
          <Button onClick={onClose} variant='ghost' size='sm'>
            Não
          </Button>
          <Button
            onClick={() => submitAndCloseDialog()}
            size='sm'
            className='bg-green-600 text-white hover:bg-green-700'
          >
            Sim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { DialogHabilitarPerfilAdministrador }
