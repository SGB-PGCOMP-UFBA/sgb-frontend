import { DateField } from '@/components/date-field'
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
import { CpfInput, MonetaryInput, PhoneInput } from '@/components/ui/masked-input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import type { ScholarshipFilterOptions } from '@/pages/GerenciamentoBolsistas/GerenciamentoBolsistas'
import type {
  EnrollmentProgram,
  ScholarshipDetailedWithRelations
} from '@/types'
import { readFormValues } from '@/helpers/form-values'

export interface EdicaoBolsistaFormFields {
  student_name: string
  student_link_to_lattes: string
  student_tax_id: string
  student_phone_number: string
  enrollment_program: EnrollmentProgram
  enrollment_date: string
  defense_prediction_date: string
  advisor_email: string
  agency_id: string
  salary: string
  scholarship_starts_at: string
  scholarship_ends_at: string
  extension_ends_at: string
  allocation_id: string
}

export interface EdicaoBolsistaSubmitValues extends EdicaoBolsistaFormFields {
  student_email: string
  enrollment_id: number
  scholarship_id: number
}

export interface DialogEdicaoBolsistaProps {
  item: ScholarshipDetailedWithRelations
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: EdicaoBolsistaSubmitValues) => Promise<false | void>
  filterOptions: ScholarshipFilterOptions
}

function DialogEdicaoBolsista({ item, isOpen, onClose, onSubmit, filterOptions }: DialogEdicaoBolsistaProps) {
  const submitAndCloseDialog = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const entries = readFormValues<EdicaoBolsistaFormFields>(data)

    const result = await onSubmit({
      student_email: item.student?.email ?? '',
      enrollment_id: item.enrollment?.id ?? 0,
      scholarship_id: item.id,
      ...entries,
    })

    if (result !== false) onClose()
  }

  const advisorsName = filterOptions.advisorNameFilterList.slice(1)
  const agenciesName = filterOptions.agencyNameFilterList.slice(1)
  const allocationsName = filterOptions.allocationNameFilterList.slice(1)

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[695px]">
        <form onSubmit={submitAndCloseDialog}>
          <DialogHeader>
            <DialogTitle>
              Editar Bolsista - <b>{item.student?.name}</b>
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-6 pt-4">
            <div className="flex w-full flex-col gap-2">
              <h3 className="text-base font-medium">Bolsista</h3>
              <Separator />

              <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="input-student-name">Nome</Label>
                  <Input
                    id="input-student-name"
                    name="student_name"
                    defaultValue={item.student?.name}
                    maxLength={80}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="input-student-link-to-lattes">Link do Lattes</Label>
                  <Input
                    id="input-student-link-to-lattes"
                    name="student_link_to_lattes"
                    defaultValue={item.student?.link_to_lattes}
                    maxLength={80}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="input-student-tax-id">CPF</Label>
                  <CpfInput
                    id="input-student-tax-id"
                    name="student_tax_id"
                    defaultValue={item.student?.tax_id}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="input-student-phone">Celular</Label>
                  <PhoneInput
                    id="input-student-phone"
                    name="student_phone_number"
                    defaultValue={item.student?.phone_number}
                  />
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col gap-2">
              <h3 className="text-base font-medium">Matrícula</h3>
              <Separator />

              <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-3">
                <div className="space-y-1.5">
                  <Label htmlFor="select-curso">Curso</Label>
                  <Select name="enrollment_program" defaultValue={item.enrollment?.enrollment_program}>
                    <SelectTrigger id="select-curso">
                      <SelectValue placeholder="Selecione um curso" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MESTRADO">Mestrado</SelectItem>
                      <SelectItem value="DOUTORADO">Doutorado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <DateField
                  id="enrollment_date"
                  name="enrollment_date"
                  label="Data Primeira Matrícula"
                  defaultValue={new Date(item.enrollment?.enrollment_date ?? 0)}
                />

                <DateField
                  id="defense_prediction_date"
                  name="defense_prediction_date"
                  label="Data de Previsão de Defesa"
                  defaultValue={new Date(item.enrollment?.defense_prediction_date ?? 0)}
                />

                <div className="space-y-1.5 md:col-span-3">
                  <Label htmlFor="select-orientador">Orientador</Label>
                  <Select name="advisor_email" defaultValue={item.advisor?.email}>
                    <SelectTrigger id="select-orientador">
                      <SelectValue placeholder="Selecione um orientador" />
                    </SelectTrigger>
                    <SelectContent>
                      {advisorsName.map((advisor) => (
                        <SelectItem key={advisor.key} value={advisor.email}>
                          {advisor.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col gap-2">
              <h3 className="text-base font-medium">Bolsa</h3>
              <Separator />

              <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-3">
                <div className="space-y-1.5">
                  <Label htmlFor="select-agencia">Agência</Label>
                  <Select
                    name="agency_id"
                    defaultValue={item.agency ? String(item.agency.id) : undefined}
                  >
                    <SelectTrigger id="select-agencia">
                      <SelectValue placeholder="Selecione uma agência" />
                    </SelectTrigger>
                    <SelectContent>
                      {agenciesName.map((agency) => (
                        <SelectItem key={agency.key} value={String(agency.id)}>
                          {agency.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="input-salary">Valor da Bolsa</Label>
                  <MonetaryInput
                    id="input-salary"
                    name="salary"
                    defaultValue={item.salary !== null ? item.salary : '0,00'}
                    maxLength={14}
                  />
                </div>

                <DateField
                  id="scholarship_starts_at"
                  name="scholarship_starts_at"
                  label="Data de Início da Bolsa"
                  defaultValue={new Date(item.scholarship_starts_at)}
                />

                <DateField
                  id="scholarship_ends_at"
                  name="scholarship_ends_at"
                  label="Data de Término da Bolsa"
                  defaultValue={new Date(item.scholarship_ends_at)}
                />

                <DateField
                  id="extension_ends_at"
                  name="extension_ends_at"
                  label="Data de Extensão da Bolsa"
                  minDate={new Date(item.scholarship_ends_at)}
                  defaultValue={item.extension_ends_at !== null ? new Date(item.extension_ends_at) : null}
                />

                <div className="space-y-1.5 md:col-span-3">
                  <Label htmlFor="select-alocacao">Alocação</Label>
                  <Select
                    name="allocation_id"
                    defaultValue={String(item.allocation ? item.allocation.id : allocationsName[0].id)}
                  >
                    <SelectTrigger id="select-alocacao">
                      <SelectValue placeholder="Selecione uma alocação" />
                    </SelectTrigger>
                    <SelectContent>
                      {allocationsName.map((allocation) => (
                        <SelectItem key={allocation.key} value={String(allocation.id)}>
                          {allocation.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
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

export { DialogEdicaoBolsista }
