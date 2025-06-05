import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../api'
import { GerenciamentoAlocacoesView } from './GerenciamentoAlocacoesView'

function GerenciamentoAlocacoes() {
  const [allocations, setAllocations] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getAllocations = async () => {
    const response = await api.allocation.getAllocations()

    if (response.status === 200) {
      setAllocations(response.data)
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }
  }

  const createAllocation = async (allocation) => {
    const response = await api.allocation.createAllocation(allocation)

    if (response.status === 201) {
      toast.success('Alocação inserida com sucesso.')
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }

    await getAllocations()
  }

  const updateAllocation = async (allocationId, allocation) => {
    const response = await api.allocation.updateAllocation(allocationId, allocation)

    if (response.status === 200) {
      toast.success('Alocação atualizada com sucesso.')
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }

    await getAllocations()
  }

  const deleteAllocation = async (allocation) => {
    const response = await api.allocation.deleteAllocation(allocation)

    if (response.status === 204) {
      toast.success('Alocação excluída com sucesso.')
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
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
