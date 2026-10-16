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

export interface DialogSituacaoUsuarioProps {
  item: ManagedUser
  isOpen: boolean
  onClose: () => void
  onConfirm: (user: ManagedUser) => void
}

function DialogSituacaoUsuario({
  item,
  isOpen,
  onClose,
  onConfirm,
}: DialogSituacaoUsuarioProps) {
  const willInactivate = item.status === 'ACTIVE'
  const action = willInactivate ? 'Inativar' : 'Ativar'

  const confirmAndClose = () => {
    onConfirm(item)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className='sm:max-w-[595px]'>
        <DialogHeader>
          <DialogTitle>
            {action} {getUserRoleLabel(item.role)}
          </DialogTitle>
          <DialogDescription>
            Você pode desfazer esta ação depois.
          </DialogDescription>
        </DialogHeader>

        <p className='text-sm text-gray-700'>
          Você tem certeza que deseja {action.toLowerCase()} o usuário{' '}
          <b>{item.name}</b> ({item.email})? A situação passará para{' '}
          <b>{willInactivate ? 'Inativo' : 'Ativo'}</b>.
        </p>

        <DialogFooter className='gap-x-4'>
          <Button onClick={onClose} variant='ghost' size='sm'>
            Cancelar
          </Button>
          <Button
            onClick={confirmAndClose}
            size='sm'
            className={
              willInactivate
                ? 'bg-amber-600 text-white hover:bg-amber-700'
                : 'bg-green-600 text-white hover:bg-green-700'
            }
          >
            {action}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { DialogSituacaoUsuario }
