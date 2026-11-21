import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { readFormValues } from '@/helpers/form-values.helper'
import { useFormChanges } from '@/hooks/use-form-changes'
import type { UpdateAgencyPayload } from '@/services/agency'
import type { AgencyDetailed } from '@/types'

interface FormularioAgenciaValues {
  description: string
  masters_degree_awarded_scholarships: string
  doctorate_degree_awarded_scholarships: string
}

export interface FormularioAgenciaProps {
  agency: AgencyDetailed
  onCancel: () => void
  /** Devolve `true` quando salvou, para o formulário fechar. */
  onSubmit: (values: UpdateAgencyPayload) => Promise<boolean>
}

/** O nome fica bloqueado: ele identifica a agência nos relatórios. */
function FormularioAgencia({
  agency,
  onCancel,
  onSubmit,
}: FormularioAgenciaProps) {
  const [isSaving, setIsSaving] = useState(false)
  const { formProps, hasChanges } = useFormChanges()

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!hasChanges(event.currentTarget)) {
      onCancel()
      return
    }

    const values = readFormValues<FormularioAgenciaValues>(
      new FormData(event.currentTarget)
    )

    setIsSaving(true)
    const saved = await onSubmit({
      description: values.description,
      masters_degree_awarded_scholarships: Number(
        values.masters_degree_awarded_scholarships
      ),
      doctorate_degree_awarded_scholarships: Number(
        values.doctorate_degree_awarded_scholarships
      ),
    })
    setIsSaving(false)

    if (saved) onCancel()
  }

  return (
    <form {...formProps} onSubmit={submit}>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <div className='space-y-1.5'>
          <Label htmlFor='agency-name'>Nome</Label>
          <Input id='agency-name' disabled defaultValue={agency.name} />
        </div>

        <div className='space-y-1.5 sm:col-span-2'>
          <Label htmlFor='agency-description'>Descrição</Label>
          <Textarea
            id='agency-description'
            name='description'
            rows={4}
            required
            maxLength={255}
            defaultValue={agency.description}
            placeholder='Insira a descrição da agência'
          />
        </div>

        <div className='space-y-1.5'>
          <Label htmlFor='agency-masters-awarded'>
            Bolsas Concedidas Para o Mestrado
          </Label>
          <Input
            id='agency-masters-awarded'
            name='masters_degree_awarded_scholarships'
            type='number'
            min={0}
            step={1}
            defaultValue={agency.masters_degree_awarded_scholarships}
          />
        </div>

        <div className='space-y-1.5'>
          <Label htmlFor='agency-doctorate-awarded'>
            Bolsas Concedidas Para o Doutorado
          </Label>
          <Input
            id='agency-doctorate-awarded'
            name='doctorate_degree_awarded_scholarships'
            type='number'
            min={0}
            step={1}
            defaultValue={agency.doctorate_degree_awarded_scholarships}
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

export { FormularioAgencia }
