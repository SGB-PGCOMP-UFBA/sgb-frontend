import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { readFormValues } from '@/helpers/form-values'

export interface InclusaoAgenciaFormValues {
  name: string
  description: string
}

export interface DialogInclusaoAgenciaProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: InclusaoAgenciaFormValues) => void
}

function DialogInclusaoAgencia({ isOpen, onClose, onSubmit }: DialogInclusaoAgenciaProps) {
  const submitAndCloseDialog = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newAgencyData = new FormData(event.currentTarget)

    onSubmit(readFormValues<InclusaoAgenciaFormValues>(newAgencyData))
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[595px]">
        <form onSubmit={submitAndCloseDialog}>
          <DialogHeader>
            <DialogTitle>Adicionar Agência</DialogTitle>
          </DialogHeader>

          <div className="flex w-full flex-col space-y-4 pt-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input
                required
                id="name"
                type="text"
                name="name"
                placeholder="Insira o nome da agência"
                maxLength={80}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                rows={4}
                required
                id="description"
                name="description"
                placeholder="Insira a descrição da agência"
                maxLength={255}

              />
            </div>
          </div>

          <DialogFooter className="gap-x-4 pt-6">
            <Button type="button" onClick={onClose} variant="ghost" size="sm">
              Cancelar
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { DialogInclusaoAgencia }
