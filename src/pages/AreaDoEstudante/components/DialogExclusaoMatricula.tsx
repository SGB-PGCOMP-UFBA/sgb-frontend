import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import type { MatriculaRow } from './DataGridMatriculas'

export interface DialogExclusaoMatriculaProps {
  item: MatriculaRow
  isOpen: boolean
  onClose: () => void
  onSubmit: (enrollmentId: number) => void
}

function DialogExclusaoMatricula(props: DialogExclusaoMatriculaProps) {
  const { item, isOpen, onClose, onSubmit } = props

  const submitAndCloseDialog = async (id: number) => {
    onSubmit(id)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="font-inter sm:max-w-[595px]">
        <DialogHeader>
          <DialogTitle>Excluir Matrícula</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col">
          <p>
            Você tem certeza que quer apagar o vínculo de matrícula de número{' '}
            <b>{item.enrollment_number.trim()}</b>? Isso também irá apagar as informações de bolsas relacionadas a esta matrícula.
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

export { DialogExclusaoMatricula }
