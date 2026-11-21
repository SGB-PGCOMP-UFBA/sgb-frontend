import { useState } from 'react'
import { DateField } from '@/components/date-field'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { readFormValues } from '@/helpers/form-values.helper'
import { toCalendarDate } from '@/helpers/formatters.helper'
import { useFormChanges } from '@/hooks/use-form-changes'
import type {
  AdvisorFilterOption,
  EnrollmentDetailedWithFullRelations,
  EnrollmentProgram,
} from '@/types'

export interface FormularioMatriculaValues {
  enrollment_number: string
  enrollment_program: EnrollmentProgram
  advisor_email: string
  enrollment_date: string
  defense_prediction_date: string
}

export interface FormularioMatriculaProps {
  enrollment: EnrollmentDetailedWithFullRelations
  advisors: AdvisorFilterOption[]
  onCancel: () => void
  /** Devolve `true` quando salvou, para o formulário fechar. */
  onSubmit: (values: FormularioMatriculaValues) => Promise<boolean>
}

function FormularioMatricula({
  enrollment,
  advisors,
  onCancel,
  onSubmit,
}: FormularioMatriculaProps) {
  const [minDefenseDate, setMinDefenseDate] = useState<Date | null>(
    toCalendarDate(enrollment.enrollment_date)
  )
  const [isSaving, setIsSaving] = useState(false)
  const { formProps, hasChanges } = useFormChanges()

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!hasChanges(event.currentTarget)) {
      onCancel()
      return
    }

    const values = readFormValues<FormularioMatriculaValues>(
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
          <Label htmlFor='enrollment_number'>Número de Matrícula</Label>
          <Input
            id='enrollment_number'
            name='enrollment_number'
            placeholder='Digite a sua matrícula'
            type='tel'
            required
            minLength={9}
            maxLength={10}
            defaultValue={enrollment.enrollment_number.trim()}
          />
        </div>

        <div className='space-y-1.5'>
          <Label htmlFor='select-curso'>Curso</Label>
          <Select
            name='enrollment_program'
            required
            defaultValue={enrollment.enrollment_program}
          >
            <SelectTrigger id='select-curso'>
              <SelectValue placeholder='Selecione um curso' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='MESTRADO'>Mestrado</SelectItem>
              <SelectItem value='DOUTORADO'>Doutorado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-1.5 sm:col-span-2'>
          <Label htmlFor='select-orientador'>Orientador</Label>
          <Select
            name='advisor_email'
            required
            defaultValue={enrollment.advisor?.email ?? undefined}
          >
            <SelectTrigger id='select-orientador'>
              <SelectValue placeholder='Selecione um orientador' />
            </SelectTrigger>
            <SelectContent>
              {advisors.map(advisor => (
                <SelectItem key={advisor.key} value={advisor.email}>
                  {advisor.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DateField
          id='enrollment_date'
          name='enrollment_date'
          label='Data Primeira Matrícula'
          required
          defaultValue={toCalendarDate(enrollment.enrollment_date)}
          onChange={setMinDefenseDate}
        />

        <DateField
          id='defense_prediction_date'
          name='defense_prediction_date'
          label='Data de Previsão de Defesa'
          required
          minDate={minDefenseDate ?? undefined}
          defaultValue={toCalendarDate(enrollment.defense_prediction_date)}
        />
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

export { FormularioMatricula }
