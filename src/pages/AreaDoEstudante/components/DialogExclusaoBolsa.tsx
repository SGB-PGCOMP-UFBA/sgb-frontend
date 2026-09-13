import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import type { BolsaRow } from './DataGridBolsas'

export interface DialogExclusaoBolsaProps {
  item: BolsaRow
  isOpen: boolean
  onClose: () => void
  onSubmit: (scholarshipId: number) => void
}

function DialogExclusaoBolsa(props: DialogExclusaoBolsaProps) {
  const { item, isOpen, onClose, onSubmit } = props

  const submitAndCloseDialog = async (id: number) => {
    onSubmit(id)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="font-inter sm:max-w-[595px]">
        <DialogHeader>
          <DialogTitle>Excluir Bolsa</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col">
          <p>
            Você tem certeza que quer apagar sua bolsa da{' '}
            <b>{item.agency?.name}</b>?
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

export { DialogExclusaoBolsa }
