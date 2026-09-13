import { useState } from 'react'
import { DateField } from '@/components/date-field'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { MonetaryInput } from '@/components/ui/masked-input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import type { BolsaRow } from './DataGridBolsas'
import type {
  EnrollmentProgram,
  IdentifiedFilterOption,
  ScholarshipEditableStatus
} from '@/types'
import { readFormValues } from '@/helpers/form-values'

export interface EdicaoBolsaFormFields {
  agency_id: string
  status: ScholarshipEditableStatus
  scholarship_starts_at: string
  scholarship_ends_at: string
  extension_ends_at: string
  salary: string
  allocation_id: string
}

export interface EdicaoBolsaSubmitValues extends EdicaoBolsaFormFields {
  scholarship_id: number
  enrollment_id: number
  student_email: string
}

export interface DialogEdicaoBolsaProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: EdicaoBolsaSubmitValues) => Promise<false | void>
  agencies: IdentifiedFilterOption[]
  allocations: IdentifiedFilterOption[]
  item: BolsaRow
  getMaxEndDate: (referenceDate: Date | null, enrollmentProgram: EnrollmentProgram) => Date
}

function DialogEdicaoBolsa(props: DialogEdicaoBolsaProps) {
  const { isOpen, onSubmit, onClose, agencies, allocations, item, getMaxEndDate } = props

  const [minEndDate, setMinEndDate] = useState<Date | null>(new Date(item.scholarship_starts_at))
  const [maxEndDate, setMaxEndDate] = useState<Date | null>(getMaxEndDate(new Date(item.scholarship_starts_at), item.enrollment_program))
  const [minExtensionEndDate, setMinExtensionEndDate] = useState<Date | null>(new Date(item.scholarship_ends_at))
  const [maxExtensionEndDate, setMaxExtensionEndDate] = useState<Date | null>(new Date(new Date(item.scholarship_ends_at).setMonth(new Date(item.scholarship_ends_at).getMonth() + 6)))

  const handleStartDateChange = (newDate: Date | null) => {
    setMinEndDate(newDate)
    setMaxEndDate(getMaxEndDate(newDate, item.enrollment_program))
  }

  const handleEndDateChange = (newDate: Date | null) => {
    setMinExtensionEndDate(newDate)
    const maxEndDate = new Date(newDate ?? 0)
    maxEndDate.setMonth(maxEndDate.getMonth() + 6)
    setMaxExtensionEndDate(maxEndDate)
  }

  const submitAndCloseDialog = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const entries = readFormValues<EdicaoBolsaFormFields>(data)

    const result = await onSubmit({
      ...entries,
      agency_id: entries.agency_id,
      scholarship_id: item.id,
      enrollment_id: item.enrollment_id,
      student_email: item.student_email,
    })

    if (result !== false) onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[695px]">
        <form onSubmit={submitAndCloseDialog}>
          <DialogHeader>
            <DialogTitle>
              Editar Bolsa (Matrícula {item.enrollment_number.trim()} - {item.enrollment_program})
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="select-agency">Agência</Label>
              <Select
                name="agency_id"
                required
                defaultValue={item.agency ? String(item.agency.id) : undefined}
              >
                <SelectTrigger id="select-agency">
                  <SelectValue placeholder="Selecione uma agência" />
                </SelectTrigger>
                <SelectContent>
                  {agencies.map((agency) => (
                    <SelectItem key={agency.id} value={String(agency.id)}>
                      {agency.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="select-status">Situação</Label>
              <Select name="status" defaultValue={item.status}>
                <SelectTrigger id="select-status">
                  <SelectValue placeholder="Selecione uma situação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ON_GOING">Em Andamento</SelectItem>
                  <SelectItem value="EXTENDED">Prazo Estendido</SelectItem>
                  <SelectItem value="FINISHED">Finalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DateField
              id="scholarship_starts_at"
              name="scholarship_starts_at"
              label="Data de Início da Bolsa"
              required
              defaultValue={new Date(item.scholarship_starts_at)}
              onChange={handleStartDateChange}
            />

            <DateField
              id="scholarship_ends_at"
              name="scholarship_ends_at"
              label="Data de Término da Bolsa"
              required
              minDate={minEndDate ?? undefined}
              maxDate={maxEndDate ?? undefined}
              defaultValue={new Date(item.scholarship_ends_at)}
              onChange={handleEndDateChange}
            />

            <DateField
              id="extension_ends_at"
              name="extension_ends_at"
              label="Data de Extensão da Bolsa"
              minDate={minExtensionEndDate ?? undefined}
              maxDate={maxExtensionEndDate ?? undefined}
              defaultValue={item.extension_ends_at !== null ? new Date(item.extension_ends_at) : null}
            />

            <div className="space-y-1.5">
              <Label htmlFor="input-salary">Valor da Bolsa</Label>
              <MonetaryInput
                id="input-salary"
                name="salary"
                defaultValue={item.salary !== null ? item.salary : '0,00'}
                maxLength={14}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="select-allocation">Alocação</Label>
              <Select
                name="allocation_id"
                required
                defaultValue={String(item.allocation ? item.allocation.id : allocations[0].id)}
              >
                <SelectTrigger id="select-allocation">
                  <SelectValue placeholder="Selecione uma alocação" />
                </SelectTrigger>
                <SelectContent>
                  {allocations.map((allocation) => (
                    <SelectItem key={allocation.id} value={String(allocation.id)}>
                      {allocation.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-x-4 pt-6">
            <Button type="button" onClick={onClose} variant="ghost" size="sm">
              Cancelar
            </Button>
            <Button type="submit" size="sm" className="bg-green-600 text-white hover:bg-green-700">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { DialogEdicaoBolsa }
