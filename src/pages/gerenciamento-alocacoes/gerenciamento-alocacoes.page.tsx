import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '@/services'
import { formatApiError } from '@/helpers/api-error.helper'
import { GerenciamentoAlocacoesView } from './gerenciamento-alocacoes.view'
import type { InclusaoAlocacaoFormValues } from './components/dialog-inclusao-alocacao'
import type { AllocationDetailed } from '@/types'

function GerenciamentoAlocacoes() {
  const navigate = useNavigate()
  const [allocations, setAllocations] = useState<AllocationDetailed[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const getAllocations = async () => {
    const response = await api.allocation.getAllocations()

    if (response.status === 200) {
      setAllocations(response.data)
    } else {
      toast.error(formatApiError(response.status, response.data))
    }
  }

  const createAllocation = async (allocation: InclusaoAlocacaoFormValues) => {
    const response = await api.allocation.createAllocation(allocation)

    if (response.status === 201) {
      toast.success('Alocação inserida com sucesso.')
    } else {
      toast.error(formatApiError(response.status, response.data))
    }

    await getAllocations()
  }

  const viewAllocation = useCallback(
    (allocation: AllocationDetailed) =>
      navigate(`/alocacoes/${allocation.id}`),
    [navigate]
  )

  /** A edição acontece só na página da alocação, que já abre no formulário. */
  const editAllocation = useCallback(
    (allocation: AllocationDetailed) =>
      navigate(`/alocacoes/${allocation.id}`, {
        state: { startEditing: true },
      }),
    [navigate]
  )

  const deleteAllocation = async (allocation: number) => {
    const response = await api.allocation.deleteAllocation(allocation)

    if (response.status === 204) {
      toast.success('Alocação excluída com sucesso.')
    } else {
      toast.error(formatApiError(response.status, response.data))
    }

    await getAllocations()
  }

  useEffect(() => {
    getAllocations().finally(() => setIsLoading(false))
  }, [])

  return (
    <GerenciamentoAlocacoesView
      isLoading={isLoading}
      data={allocations}
      onCreate={createAllocation}
      onView={viewAllocation}
      onEdit={editAllocation}
      onDelete={deleteAllocation}
    />
  )
}

export { GerenciamentoAlocacoes }
