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
import type { UpdateAgencyPayload } from '@/api/agency'
import type { AgencyDetailed } from '@/types'
import { readFormValues } from '@/helpers/form-values'

interface EdicaoAgenciaFormValues {
  name?: string
  description: string
  masters_degree_awarded_scholarships: string
  doctorate_degree_awarded_scholarships: string
}

export interface DialogEdicaoAgenciaProps {
  item: AgencyDetailed
  isOpen: boolean
  onClose: () => void
  onSubmit: (agencyId: number, agency: UpdateAgencyPayload) => void
}

function DialogEdicaoAgencia({ item, isOpen, onClose, onSubmit }: DialogEdicaoAgenciaProps) {
  const submitAndCloseDialog = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newAgencyData = new FormData(event.currentTarget)
    const entries = readFormValues<EdicaoAgenciaFormValues>(newAgencyData)

    onSubmit(item.id, {
      name: entries.name,
      description: entries.description,
      masters_degree_awarded_scholarships: Number(entries.masters_degree_awarded_scholarships),
      doctorate_degree_awarded_scholarships: Number(entries.doctorate_degree_awarded_scholarships)
    })

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[595px]">
        <form onSubmit={submitAndCloseDialog}>
          <DialogHeader>
            <DialogTitle>Editar Agência</DialogTitle>
          </DialogHeader>

          <div className="flex w-full flex-col space-y-4 pt-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input
                disabled
                required
                id="name"
                type="text"
                name="name"
                defaultValue={item.name}
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
                defaultValue={item.description}
                placeholder="Insira a descrição da agência"
                maxLength={255}

              />
            </div>

            <div className="space-y-1.5">
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

export { DialogEdicaoAgencia }
