import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { getUserRoleLabel } from '@/constants/user-role.constant'
import type { ManagedUser } from '@/types'

export interface DialogExclusaoUsuarioProps {
  item: ManagedUser
  isOpen: boolean
  onClose: () => void
  onConfirm: (user: ManagedUser) => void
}

function DialogExclusaoUsuario({
  item,
  isOpen,
  onClose,
  onConfirm,
}: DialogExclusaoUsuarioProps) {
  const confirmAndClose = () => {
    onConfirm(item)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className='sm:max-w-[595px]'>
        <DialogHeader>
          <DialogTitle>Excluir {getUserRoleLabel(item.role)}</DialogTitle>
          <DialogDescription>
            Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-3 text-sm text-gray-700'>
          <p>
            Você tem certeza que deseja apagar do sistema o usuário{' '}
            <b>{item.name}</b> ({item.email})?
          </p>
          {item.role !== 'ADMIN' && (
            <p>
              Usuários com matrícula que tenha bolsa vigente não podem ser
              excluídos. As matrículas e bolsas já encerradas dele serão
              apagadas junto.
            </p>
          )}
        </div>

        <DialogFooter className='gap-x-4'>
          <Button onClick={onClose} variant='ghost' size='sm'>
            Cancelar
          </Button>
          <Button onClick={confirmAndClose} variant='destructive' size='sm'>
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { DialogExclusaoUsuario }
