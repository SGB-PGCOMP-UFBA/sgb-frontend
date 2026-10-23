import { useState } from 'react'
import { DateField } from '@/components/date-field'
import { DetailSection } from '@/components/detail-section'
import { InfoItem } from '@/components/info-item'
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
import { toCalendarDate } from '@/helpers/formatters.helper'
import { readFormValues } from '@/helpers/form-values.helper'
import { useFormChanges } from '@/hooks/use-form-changes'
import type { ScholarshipFormValues } from '@/helpers/scholarship.helper'
import type {
  AdvisorDetailed,
  IdentifiedFilterOption,
  ScholarshipDetailedWithRelations,
} from '@/types'

const GRID_CLASS = 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'

export interface ScholarshipFormOptions {
  agencies: IdentifiedFilterOption[]
  allocations: IdentifiedFilterOption[]
  advisors: AdvisorDetailed[]
  isLoading: boolean
}

export interface FormularioBolsaProps {
  scholarship: ScholarshipDetailedWithRelations
  options: ScholarshipFormOptions
  onCancel: () => void
  onSubmit: (values: ScholarshipFormValues) => Promise<boolean>
}

/**
 * Orientadores ativos, mais o atual mesmo que inativo, para o select nao
 * perder o valor salvo.
 */
function selectableAdvisors(
  advisors: AdvisorDetailed[],
  currentId: number | undefined
) {
  return advisors
    .filter(advisor => advisor.status === 'ACTIVE' || advisor.id === currentId)
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
}

function FormularioBolsa({
  scholarship,
  options,
  onCancel,
  onSubmit,
}: FormularioBolsaProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [endsAt, setEndsAt] = useState(
    toCalendarDate(scholarship.scholarship_ends_at)
  )
  const { enrollment, student, advisor, agency, allocation } = scholarship
  const advisors = selectableAdvisors(options.advisors, advisor?.id)
  const { formProps, hasChanges } = useFormChanges()

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!hasChanges(event.currentTarget)) {
      onCancel()
      return
    }

    const values = readFormValues<ScholarshipFormValues>(
      new FormData(event.currentTarget)
    )

    setIsSaving(true)
    const saved = await onSubmit(values)
    setIsSaving(false)

    if (saved) onCancel()
  }

  if (options.isLoading) {
    return (
      <p role='status' className='text-sm text-gray-500'>
        Carregando opções de edição...
      </p>
    )
  }

  return (
    <form
      {...formProps}
      onSubmit={submit}
      aria-label='Editar bolsa'
      className='flex flex-col gap-4'
    >
      <DetailSection title='Bolsa'>
        <div className={GRID_CLASS}>
          <div className='space-y-1.5'>
            <Label htmlFor='edit-agency'>Agência</Label>
            <Select
              name='agency_id'
              defaultValue={agency ? String(agency.id) : undefined}
              required
            >
              <SelectTrigger id='edit-agency'>
                <SelectValue placeholder='Selecione uma agência' />
              </SelectTrigger>
              <SelectContent>
                {options.agencies.map(option => (
                  <SelectItem key={option.id} value={String(option.id)}>
                    {option.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-1.5'>
            <Label htmlFor='edit-allocation'>Alocação</Label>
            <Select
              name='allocation_id'
              defaultValue={allocation ? String(allocation.id) : undefined}
            >
              <SelectTrigger id='edit-allocation'>
                <SelectValue placeholder='Selecione uma alocação' />
              </SelectTrigger>
              <SelectContent>
                {options.allocations.map(option => (
                  <SelectItem key={option.id} value={String(option.id)}>
                    {option.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-1.5'>
            <Label htmlFor='edit-salary'>Valor</Label>
            <MonetaryInput
              id='edit-salary'
              name='salary'
              defaultValue={scholarship.salary ?? '0,00'}
              maxLength={14}
            />
          </div>

          <DateField
            id='edit-starts-at'
            name='scholarship_starts_at'
            label='Início'
            required
            defaultValue={toCalendarDate(scholarship.scholarship_starts_at)}
          />

          <DateField
            id='edit-ends-at'
            name='scholarship_ends_at'
            label='Término'
            required
            defaultValue={endsAt}
            onChange={setEndsAt}
          />

          <DateField
            id='edit-extension-ends-at'
            name='extension_ends_at'
            label='Extensão'
            minDate={endsAt ?? undefined}
            defaultValue={toCalendarDate(scholarship.extension_ends_at)}
          />
        </div>
      </DetailSection>

      <DetailSection title='Matrícula'>
        <div className={GRID_CLASS}>
          <InfoItem
            label='Número'
            value={enrollment?.enrollment_number.trim()}
          />

          <div className='space-y-1.5'>
            <Label htmlFor='edit-program'>Curso</Label>
            <Select
              name='enrollment_program'
              defaultValue={enrollment?.enrollment_program}
              required
            >
              <SelectTrigger id='edit-program'>
                <SelectValue placeholder='Selecione um curso' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='MESTRADO'>Mestrado</SelectItem>
                <SelectItem value='DOUTORADO'>Doutorado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DateField
            id='edit-enrollment-date'
            name='enrollment_date'
            label='Data da matrícula'
            defaultValue={toCalendarDate(enrollment?.enrollment_date)}
          />

          <DateField
            id='edit-defense-date'
            name='defense_prediction_date'
            label='Previsão de defesa'
            defaultValue={toCalendarDate(enrollment?.defense_prediction_date)}
          />
        </div>
      </DetailSection>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <DetailSection title='Bolsista'>
          <p className='text-sm font-medium text-gray-900'>
            {student?.name ?? 'Bolsista não encontrado.'}
          </p>
          <p className='mt-1 text-xs text-gray-500'>
            O bolsista não muda na edição da bolsa. Os dados pessoais dele são
            editados na página do usuário.
          </p>
        </DetailSection>

        <DetailSection title='Orientador'>
          <Label htmlFor='edit-advisor' className='sr-only'>
            Orientador
          </Label>
          <Select name='advisor_email' defaultValue={advisor?.email} required>
            <SelectTrigger id='edit-advisor'>
              <SelectValue placeholder='Selecione um orientador' />
            </SelectTrigger>
            <SelectContent>
              {advisors.map(option => (
                <SelectItem key={option.id} value={option.email}>
                  {option.status === 'ACTIVE'
                    ? option.name
                    : `${option.name} (inativo)`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </DetailSection>
      </div>

      <div className='flex justify-end gap-2 border-t border-gray-200 pt-4'>
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

export { FormularioBolsa }
