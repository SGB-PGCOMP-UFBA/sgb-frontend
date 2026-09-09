import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../api'
import { formatApiError } from '../../helpers/api-error'
import { GerenciamentoAlocacoesView } from './GerenciamentoAlocacoesView'
import type { InclusaoAlocacaoFormValues } from './components/DialogInclusaoAlocacao'
import type { UpdateAllocationPayload } from '../../api/allocation'
import type { AllocationDetailed } from '../../types'

function GerenciamentoAlocacoes() {
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

  const updateAllocation = async (allocationId: number, allocation: UpdateAllocationPayload) => {
    const response = await api.allocation.updateAllocation(allocationId, allocation)

    if (response.status === 200) {
      toast.success('Alocação atualizada com sucesso.')
    } else {
      toast.error(formatApiError(response.status, response.data))
    }

    await getAllocations()
  }

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
      onUpdate={updateAllocation}
      onDelete={deleteAllocation}
    />
  )
}

export { GerenciamentoAlocacoes }
