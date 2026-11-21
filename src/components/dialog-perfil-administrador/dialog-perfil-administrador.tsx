import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { ManagedUser } from '@/types'

export interface DialogPerfilAdministradorProps {
  item: ManagedUser
  isOpen: boolean
  onClose: () => void
  /** Recebe o estado desejado: o oposto do que o diálogo mostra. */
  onConfirm: (user: ManagedUser, enabled: boolean) => void
}

function DialogPerfilAdministrador({
  item,
  isOpen,
  onClose,
  onConfirm,
}: DialogPerfilAdministradorProps) {
  const hasAdminPrivileges = item.role === 'ADVISOR_WITH_ADMIN_PRIVILEGES'
  const action = hasAdminPrivileges ? 'desabilitar' : 'habilitar'

  const confirmAndClose = () => {
    onConfirm(item, !hasAdminPrivileges)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className='sm:max-w-[595px]'>
        <DialogHeader>
          <DialogTitle>
            {hasAdminPrivileges ? 'Desabilitar' : 'Habilitar'} perfil de
            administrador
          </DialogTitle>
        </DialogHeader>

        <p className='text-sm text-gray-700'>
          Você tem certeza que deseja {action} o perfil de administrador do(a)
          orientador(a) <b>{item.name}</b>?
        </p>

        <DialogFooter className='gap-x-4'>
          <Button onClick={onClose} variant='ghost' size='sm'>
            Não
          </Button>
          <Button
            onClick={confirmAndClose}
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

export { DialogPerfilAdministrador }
