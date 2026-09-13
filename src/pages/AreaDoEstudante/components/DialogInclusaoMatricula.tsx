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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import type { AdvisorFilterOption, EnrollmentProgram } from '../../../types'
import { readFormValues } from '../../../helpers/form-values'

export interface InclusaoMatriculaFormValues {
  enrollment_number: string
  enrollment_program: EnrollmentProgram
  advisor_email: string
  enrollment_date: string
  defense_prediction_date: string
}

export interface DialogInclusaoMatriculaProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: InclusaoMatriculaFormValues) => void
  advisors: AdvisorFilterOption[]
}

function DialogInclusaoMatricula(props: DialogInclusaoMatriculaProps) {
  const { isOpen, onSubmit, onClose, advisors } = props

  const [minEndDate, setMinEndDate] = useState<Date | null>(null)

  const handleStartDateChange = (newDate: Date | null) => {
    setMinEndDate(newDate)
  }

  const submitAndCloseDialog = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const entries = readFormValues<InclusaoMatriculaFormValues>(data)

    onSubmit(entries)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[695px]">
        <form onSubmit={submitAndCloseDialog}>
          <DialogHeader>
            <DialogTitle>Incluir Matrícula</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="enrollment_number">Número de Matrícula</Label>
              <Input
                id="enrollment_number"
                name="enrollment_number"
                placeholder="Digite a sua matrícula"
                type="tel"
                required
                minLength={9}
                maxLength={10}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="select-curso">Curso</Label>
              <Select name="enrollment_program" required>
                <SelectTrigger id="select-curso">
                  <SelectValue placeholder="Selecione um curso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MESTRADO">Mestrado</SelectItem>
                  <SelectItem value="DOUTORADO">Doutorado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="select-orientador">Orientador</Label>
              <Select name="advisor_email" required>
                <SelectTrigger id="select-orientador">
                  <SelectValue placeholder="Selecione um orientador" />
                </SelectTrigger>
                <SelectContent>
                  {advisors.map((advisor) => (
                    <SelectItem key={advisor.key} value={advisor.email}>
                      {advisor.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <DateField
              id="enrollment_date"
              name="enrollment_date"
              label="Data Primeira Matrícula"
              required
              onChange={handleStartDateChange}
            />

            <DateField
              id="defense_prediction_date"
              name="defense_prediction_date"
              label="Data de Previsão de Defesa"
              required
              minDate={minEndDate ?? undefined}
            />
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

export { DialogInclusaoMatricula }
