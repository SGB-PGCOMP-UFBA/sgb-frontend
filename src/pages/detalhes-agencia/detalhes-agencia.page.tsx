import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '@/services'
import { extractApiMessage } from '@/helpers/api-error.helper'
import { readRouteId, readStartEditing } from '@/helpers/detail-route.helper'
import type { UpdateAgencyPayload } from '@/services/agency'
import { DetalhesAgenciaView } from './detalhes-agencia.view'
import type { AgencyDetailed } from '@/types'

function DetalhesAgencia() {
  const navigate = useNavigate()
  const location = useLocation()
  const id = readRouteId(useParams().id)

  const [agency, setAgency] = useState<AgencyDetailed | null>(null)
  const [isLoading, setIsLoading] = useState(id !== null)

  const updateAgency = async (values: UpdateAgencyPayload) => {
    if (!agency) return false

    try {
      await api.agency.updateAgency(agency.id, values)
      // O PATCH devolve a entidade crua; os contadores vêm do GET detalhado.
      const refreshed = await api.agency.getAgency(agency.id)
      setAgency(refreshed.data)
      toast.success('Agência atualizada com sucesso.')
      return true
    } catch (error) {
      toast.error(`Erro ao atualizar a agência: ${extractApiMessage(error)}`)
      return false
    }
  }

  const deleteAgency = async (agencyId: number) => {
    try {
      await api.agency.deleteAgency(agencyId)
      toast.success('Agência excluída com sucesso.')
      navigate('/agencias')
    } catch (error) {
      toast.error(`Erro ao excluir a agência: ${extractApiMessage(error)}`)
    }
  }

  useEffect(() => {
    if (id === null) return

    setIsLoading(true)
    api.agency
      .getAgency(id)
      .then(response => setAgency(response.data))
      .catch(error => {
        setAgency(null)
        toast.error(`Erro ao buscar a agência: ${extractApiMessage(error)}`)
      })
      .finally(() => setIsLoading(false))
  }, [id])

  return (
    <DetalhesAgenciaView
      isLoading={isLoading}
      agency={agency}
      startEditing={readStartEditing(location.state)}
      onBack={() => navigate('/agencias')}
      onUpdate={updateAgency}
      onDelete={deleteAgency}
    />
  )
}

export { DetalhesAgencia }
