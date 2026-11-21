import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '@/services'
import { extractApiMessage } from '@/helpers/api-error.helper'
import { readRouteId, readStartEditing } from '@/helpers/detail-route.helper'
import type { UpdateAllocationPayload } from '@/services/allocation'
import { DetalhesAlocacaoView } from './detalhes-alocacao.view'
import type { AllocationDetailed } from '@/types'

function DetalhesAlocacao() {
  const navigate = useNavigate()
  const location = useLocation()
  const id = readRouteId(useParams().id)

  const [allocation, setAllocation] = useState<AllocationDetailed | null>(null)
  const [isLoading, setIsLoading] = useState(id !== null)

  const updateAllocation = async (values: UpdateAllocationPayload) => {
    if (!allocation) return false

    try {
      await api.allocation.updateAllocation(allocation.id, values)
      // O PATCH devolve a entidade crua; os contadores vêm do GET detalhado.
      const refreshed = await api.allocation.getAllocation(allocation.id)
      setAllocation(refreshed.data)
      toast.success('Alocação atualizada com sucesso.')
      return true
    } catch (error) {
      toast.error(`Erro ao atualizar a alocação: ${extractApiMessage(error)}`)
      return false
    }
  }

  const deleteAllocation = async (allocationId: number) => {
    try {
      await api.allocation.deleteAllocation(allocationId)
      toast.success('Alocação excluída com sucesso.')
      navigate('/alocacoes')
    } catch (error) {
      toast.error(`Erro ao excluir a alocação: ${extractApiMessage(error)}`)
    }
  }

  useEffect(() => {
    if (id === null) return

    setIsLoading(true)
    api.allocation
      .getAllocation(id)
      .then(response => setAllocation(response.data))
      .catch(error => {
        setAllocation(null)
        toast.error(`Erro ao buscar a alocação: ${extractApiMessage(error)}`)
      })
      .finally(() => setIsLoading(false))
  }, [id])

  return (
    <DetalhesAlocacaoView
      isLoading={isLoading}
      allocation={allocation}
      startEditing={readStartEditing(location.state)}
      onBack={() => navigate('/alocacoes')}
      onUpdate={updateAllocation}
      onDelete={deleteAllocation}
    />
  )
}

export { DetalhesAlocacao }
