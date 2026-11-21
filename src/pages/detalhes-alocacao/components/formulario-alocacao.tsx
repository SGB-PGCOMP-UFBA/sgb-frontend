import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { readFormValues } from '@/helpers/form-values.helper'
import { useFormChanges } from '@/hooks/use-form-changes'
import type { UpdateAllocationPayload } from '@/services/allocation'
import type { AllocationDetailed } from '@/types'

export interface FormularioAlocacaoProps {
  allocation: AllocationDetailed
  onCancel: () => void
  /** Devolve `true` quando salvou, para o formulário fechar. */
  onSubmit: (values: UpdateAllocationPayload) => Promise<boolean>
}

function FormularioAlocacao({
  allocation,
  onCancel,
  onSubmit,
}: FormularioAlocacaoProps) {
  const [isSaving, setIsSaving] = useState(false)
  const { formProps, hasChanges } = useFormChanges()

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!hasChanges(event.currentTarget)) {
      onCancel()
      return
    }

    const values = readFormValues<{ name: string }>(
      new FormData(event.currentTarget)
    )

    setIsSaving(true)
    const saved = await onSubmit({ name: values.name.trim() })
    setIsSaving(false)

    if (saved) onCancel()
  }

  return (
    <form {...formProps} onSubmit={submit}>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <div className='space-y-1.5'>
          <Label htmlFor='allocation-name'>Nome</Label>
          <Input
            id='allocation-name'
            name='name'
            required
            maxLength={80}
            defaultValue={allocation.name}
            placeholder='Insira o nome da alocação'
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

export { FormularioAlocacao }
