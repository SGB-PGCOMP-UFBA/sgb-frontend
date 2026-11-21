import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '@/services'
import { formatApiError } from '@/helpers/api-error.helper'
import { GerenciamentoAgenciasView } from './gerenciamento-agencias.view'
import type { InclusaoAgenciaFormValues } from './components/dialog-inclusao-agencia'
import type { AgencyDetailed } from '@/types'

function GerenciamentoAgencias() {
  const navigate = useNavigate()
  const [agencys, setAgencys] = useState<AgencyDetailed[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const getAgencys = async () => {
    const response = await api.agency.getAgencys()

    if (response.status === 200) {
      setAgencys(response.data)
    } else {
      toast.error(formatApiError(response.status, response.data))
    }
  }

  const createAgency = async (agency: InclusaoAgenciaFormValues) => {
    const response = await api.agency.createAgency(agency)

    if (response.status === 201) {
      toast.success('Agência inserida com sucesso.')
    } else {
      toast.error(formatApiError(response.status, response.data))
    }

    await getAgencys()
  }

  const viewAgency = useCallback(
    (agency: AgencyDetailed) => navigate(`/agencias/${agency.id}`),
    [navigate]
  )

  /** A edição acontece só na página da agência, que já abre no formulário. */
  const editAgency = useCallback(
    (agency: AgencyDetailed) =>
      navigate(`/agencias/${agency.id}`, { state: { startEditing: true } }),
    [navigate]
  )

  const deleteAgency = async (agency: number) => {
    const response = await api.agency.deleteAgency(agency)

    if (response.status === 204) {
      toast.success('Agência excluída com sucesso.')
    } else {
      toast.error(formatApiError(response.status, response.data))
    }

    await getAgencys()
  }

  useEffect(() => {
    getAgencys().finally(() => setIsLoading(false))
  }, [])

  return (
    <GerenciamentoAgenciasView
      isLoading={isLoading}
      data={agencys}
      onCreate={createAgency}
      onView={viewAgency}
      onEdit={editAgency}
      onDelete={deleteAgency}
    />
  )
}

export { GerenciamentoAgencias }
