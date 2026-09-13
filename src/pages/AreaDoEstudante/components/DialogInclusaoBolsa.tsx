import { useState } from 'react'
import { DateField } from '@/components/date-field'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { MonetaryInput } from '@/components/ui/masked-input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { MatriculaRow } from './DataGridMatriculas'
import type { EnrollmentProgram, IdentifiedFilterOption } from '@/types'
import { readFormValues } from '@/helpers/form-values'

export interface InclusaoBolsaFormFields {
  agency_name: string
  salary: string
  scholarship_starts_at: string
  scholarship_ends_at: string
  allocation_name: string
}

export interface InclusaoBolsaSubmitValues extends InclusaoBolsaFormFields {
  enrollment_number: string
}

export interface DialogInclusaoBolsaProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: InclusaoBolsaSubmitValues) => void
  agencies: IdentifiedFilterOption[]
  allocations: IdentifiedFilterOption[]
  enrollment: MatriculaRow
  getMaxEndDate: (
    referenceDate: Date | null,
    enrollmentProgram: EnrollmentProgram
  ) => Date
}

function DialogInclusaoBolsa(props: DialogInclusaoBolsaProps) {
  const {
    isOpen,
    onSubmit,
    onClose,
    agencies,
    allocations,
    enrollment,
    getMaxEndDate,
  } = props

  const [minEndDate, setMinEndDate] = useState<Date | null>(null)
  const [maxEndDate, setMaxEndDate] = useState<Date | null>(null)
  const [agency, setAgency] = useState('')

  const handleStartDateChange = (newDate: Date | null) => {
    setMinEndDate(newDate)
    setMaxEndDate(getMaxEndDate(newDate, enrollment.enrollment_program))
  }

  const submitAndCloseDialog = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const entries = readFormValues<InclusaoBolsaFormFields>(data)

    onSubmit({
      ...entries,
      enrollment_number: enrollment.enrollment_number,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className='sm:max-w-[695px]'>
        <form onSubmit={submitAndCloseDialog}>
          <DialogHeader>
            <DialogTitle>
              Incluir Bolsa (Matrícula {enrollment.enrollment_number} -{' '}
              {enrollment.enrollment_program})
            </DialogTitle>
          </DialogHeader>

          <div className='grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2'>
            <div className='space-y-1.5'>
              <Label htmlFor='select-agency'>Agência</Label>
              <Select name='agency_name' required onValueChange={setAgency}>
                <SelectTrigger id='select-agency'>
                  <SelectValue placeholder='Selecione uma agência' />
                </SelectTrigger>
                <SelectContent>
                  {agencies.map(option => (
                    <SelectItem key={option.key} value={option.value}>
                      {option.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-1.5'>
              <Label htmlFor='input-salary'>Valor da Bolsa</Label>
              <MonetaryInput
                id='input-salary'
                name='salary'
                defaultValue='0,00'
                maxLength={14}
              />
            </div>

            {agency === 'CAPES' && (
              <div className='flex justify-center sm:col-span-2'>
                <p className='text-ms text-center font-semibold'>
                  Coloque as datas de início e fim EXATAS como disposto em&nbsp;
                  <a
                    href='https://sso.capes.gov.br/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-400 underline hover:text-blue-600'
                  >
                    https://sso.capes.gov.br/
                  </a>
                </p>
              </div>
            )}

            <DateField
              id='scholarship_starts_at'
              name='scholarship_starts_at'
              label='Data de Início da Bolsa'
              required
              onChange={handleStartDateChange}
            />

            <DateField
              id='scholarship_ends_at'
              name='scholarship_ends_at'
              label='Data de Término da Bolsa'
              required
              minDate={minEndDate ?? undefined}
              maxDate={maxEndDate ?? undefined}
            />

            <div className='space-y-1.5'>
              <Label htmlFor='select-allocation'>Alocação</Label>
              <Select name='allocation_name' required>
                <SelectTrigger id='select-allocation'>
                  <SelectValue placeholder='Selecione uma alocação' />
                </SelectTrigger>
                <SelectContent>
                  {allocations.map(option => (
                    <SelectItem key={option.key} value={option.value}>
                      {option.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className='gap-x-4 pt-6'>
            <Button type='button' onClick={onClose} variant='ghost' size='sm'>
              Cancelar
            </Button>
            <Button
              type='submit'
              size='sm'
              className='bg-green-600 text-white hover:bg-green-700'
            >
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { DialogInclusaoBolsa }
