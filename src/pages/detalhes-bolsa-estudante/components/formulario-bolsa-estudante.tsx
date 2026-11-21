import { useState } from 'react'
import { AvisoDuracaoBolsa } from '@/components/aviso-duracao-bolsa'
import { DateField } from '@/components/date-field'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { MonetaryInput } from '@/components/ui/masked-input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { readFormValues } from '@/helpers/form-values.helper'
import { toCalendarDate } from '@/helpers/formatters.helper'
import type { StudentScholarship } from '@/helpers/student-records.helper'
import { useFormChanges } from '@/hooks/use-form-changes'
import type { IdentifiedFilterOption } from '@/types'

export interface FormularioBolsaEstudanteValues {
  agency_id: string
  allocation_id: string
  scholarship_starts_at: string
  scholarship_ends_at: string
  extension_ends_at: string
  salary: string
}

export interface FormularioBolsaEstudanteProps {
  scholarship: StudentScholarship
  agencies: IdentifiedFilterOption[]
  allocations: IdentifiedFilterOption[]
  onCancel: () => void
  /** Devolve `true` quando salvou, para o formulário fechar. */
  onSubmit: (values: FormularioBolsaEstudanteValues) => Promise<boolean>
}

/** A extensão vai até seis meses depois do término da bolsa. */
function sixMonthsAfter(date: Date | null): Date | null {
  if (!date) return null
  const limit = new Date(date)
  limit.setMonth(limit.getMonth() + 6)
  return limit
}

function FormularioBolsaEstudante({
  scholarship,
  agencies,
  allocations,
  onCancel,
  onSubmit,
}: FormularioBolsaEstudanteProps) {
  // O termino nao tem limite: passar da duracao do curso so gera aviso.
  const [startsAt, setStartsAt] = useState<Date | null>(
    toCalendarDate(scholarship.scholarship_starts_at)
  )
  const [endsAt, setEndsAt] = useState<Date | null>(
    toCalendarDate(scholarship.scholarship_ends_at)
  )
  const [isSaving, setIsSaving] = useState(false)
  const { formProps, hasChanges } = useFormChanges()

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!hasChanges(event.currentTarget)) {
      onCancel()
      return
    }

    const values = readFormValues<FormularioBolsaEstudanteValues>(
      new FormData(event.currentTarget)
    )

    setIsSaving(true)
    const saved = await onSubmit(values)
    setIsSaving(false)

    if (saved) onCancel()
  }

  return (
    <form {...formProps} onSubmit={submit}>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <div className='space-y-1.5'>
          <Label htmlFor='select-agency'>Agência</Label>
          <Select
            name='agency_id'
            required
            defaultValue={
              scholarship.agency ? String(scholarship.agency.id) : undefined
            }
          >
            <SelectTrigger id='select-agency'>
              <SelectValue placeholder='Selecione uma agência' />
            </SelectTrigger>
            <SelectContent>
              {agencies.map(agency => (
                <SelectItem key={agency.id} value={String(agency.id)}>
                  {agency.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-1.5'>
          <Label htmlFor='select-allocation'>Alocação</Label>
          <Select
            name='allocation_id'
            required
            defaultValue={
              scholarship.allocation
                ? String(scholarship.allocation.id)
                : undefined
            }
          >
            <SelectTrigger id='select-allocation'>
              <SelectValue placeholder='Selecione uma alocação' />
            </SelectTrigger>
            <SelectContent>
              {allocations.map(allocation => (
                <SelectItem key={allocation.id} value={String(allocation.id)}>
                  {allocation.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DateField
          id='scholarship_starts_at'
          name='scholarship_starts_at'
          label='Data de Início da Bolsa'
          required
          defaultValue={toCalendarDate(scholarship.scholarship_starts_at)}
          onChange={setStartsAt}
        />

        <DateField
          id='scholarship_ends_at'
          name='scholarship_ends_at'
          label='Data de Término da Bolsa'
          required
          minDate={startsAt ?? undefined}
          defaultValue={toCalendarDate(scholarship.scholarship_ends_at)}
          onChange={setEndsAt}
          hint={
            <AvisoDuracaoBolsa
              startsAt={startsAt}
              endsAt={endsAt}
              program={scholarship.enrollment_program}
            />
          }
        />

        <DateField
          id='extension_ends_at'
          name='extension_ends_at'
          label='Data de Extensão da Bolsa'
          minDate={endsAt ?? undefined}
          maxDate={sixMonthsAfter(endsAt) ?? undefined}
          defaultValue={toCalendarDate(scholarship.extension_ends_at)}
        />

        <div className='space-y-1.5'>
          <Label htmlFor='input-salary'>Valor da Bolsa</Label>
          <MonetaryInput
            id='input-salary'
            name='salary'
            defaultValue={scholarship.salary !== null ? scholarship.salary : '0,00'}
            maxLength={14}
          />
        </div>
      </div>

      <div className='mt-6 flex justify-end gap-2 border-t border-gray-200 pt-4'>
        <Button type='button' variant='ghost' onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          type='submit'
          disabled={isSaving}
          className='bg-green-600 text-white hover:bg-green-700'
        >
          {isSaving ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </form>
  )
}

export { FormularioBolsaEstudante }
