import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { ScholarshipDetailedWithRelations } from '@/types'

export interface DialogExclusaoBolsaProps {
  item: ScholarshipDetailedWithRelations
  isOpen: boolean
  onClose: () => void
  onSubmit: (scholarshipId: number) => void
}

function DialogExclusaoBolsa({
  item,
  isOpen,
  onClose,
  onSubmit,
}: DialogExclusaoBolsaProps) {
  const submitAndCloseDialog = async (id: number) => {
    onSubmit(id)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className='font-inter sm:max-w-[595px]'>
        <DialogHeader>
          <DialogTitle>Excluir Bolsa</DialogTitle>
        </DialogHeader>

        <div className='flex flex-col'>
          <p>
            Você tem certeza que deseja remover a bolsa do(a) estudante{' '}
            <b>{item.student?.name}</b>? As informações pessoais do bolsista e
            de sua matrícula ainda permanecerão no sistema.
          </p>
          <br />
          <p>
            Não será possível recuperar as informações desta bolsa após a
            exclusão!
          </p>
        </div>

        <DialogFooter className='gap-x-4'>
          <Button onClick={onClose} variant='ghost' size='sm'>
            Cancelar
          </Button>
          <Button
            onClick={() => submitAndCloseDialog(item.id)}
            variant='destructive'
            size='sm'
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { DialogExclusaoBolsa }
