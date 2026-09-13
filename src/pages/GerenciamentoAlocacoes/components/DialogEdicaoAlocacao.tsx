import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { UpdateAllocationPayload } from '@/api/allocation'
import type { AllocationDetailed } from '@/types'
import { readFormValues } from '@/helpers/form-values'

interface EdicaoAlocacaoFormValues {
  name: string
}

export interface DialogEdicaoAlocacaoProps {
  item: AllocationDetailed
  isOpen: boolean
  onClose: () => void
  onSubmit: (allocationId: number, allocation: UpdateAllocationPayload) => void
}

function DialogEdicaoAlocacao({ item, isOpen, onClose, onSubmit }: DialogEdicaoAlocacaoProps) {
  const submitAndCloseDialog = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newAgencyData = new FormData(event.currentTarget)
    const entries = readFormValues<EdicaoAlocacaoFormValues>(newAgencyData)

    onSubmit(item.id, {
      name: entries.name,
      // masters_degree_awarded_scholarships: Number(entries.masters_degree_awarded_scholarships),
      // doctorate_degree_awarded_scholarships: Number(entries.doctorate_degree_awarded_scholarships)
    })

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[595px]">
        <form onSubmit={submitAndCloseDialog}>
          <DialogHeader>
            <DialogTitle>Editar Alocação</DialogTitle>
          </DialogHeader>

          <div className="flex w-full flex-col space-y-4 pt-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input
                // disabled
                required
                id="name"
                type="text"
                name="name"
                defaultValue={item.name}
                placeholder="Insira o nome da alocação"
                maxLength={80}
              />
            </div>

            {/* <div className="space-y-1.5">
              <Label htmlFor="masters_degree_awarded_scholarships">
                Bolsas Concedidas Para o Mestrado
              </Label>
              <Input
                id="masters_degree_awarded_scholarships"
                name="masters_degree_awarded_scholarships"
                type="number"
                defaultValue={item.masters_degree_awarded_scholarships}
                min={0}
                step={1}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="doctorate_degree_awarded_scholarships">
                Bolsas Concedidas Para o Doutorado
              </Label>
              <Input
                id="doctorate_degree_awarded_scholarships"
                name="doctorate_degree_awarded_scholarships"
                type="number"
                defaultValue={item.doctorate_degree_awarded_scholarships}
                min={0}
                step={1}
              />
            </div> */}
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

export { DialogEdicaoAlocacao }
