import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import type { AllocationDetailed } from '@/types'

export interface DialogExclusaoAlocacaoProps {
  item: AllocationDetailed
  isOpen: boolean
  onClose: () => void
  onSubmit: (allocationId: number) => void
}

function DialogExclusaoAlocacao({ item, isOpen, onClose, onSubmit }: DialogExclusaoAlocacaoProps) {
  const submitAndCloseDialog = async (id: number) => {
    onSubmit(id)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="font-inter sm:max-w-[595px]">
        <DialogHeader>
          <DialogTitle>Excluir Alocação</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col">
          <p>
            Você tem certeza que deseja apagar do sistema a alocacao <b>{item.name}</b>?
          </p>
          <br />
          <p>Não será possível recuperar estas informações após a exclusão!</p>
        </div>

        <DialogFooter className="gap-x-4">
          <Button onClick={onClose} variant="ghost" size="sm">
            Cancelar
          </Button>
          <Button
            onClick={() => submitAndCloseDialog(item.id)}
            variant="destructive"
            size="sm"
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { DialogExclusaoAlocacao }
