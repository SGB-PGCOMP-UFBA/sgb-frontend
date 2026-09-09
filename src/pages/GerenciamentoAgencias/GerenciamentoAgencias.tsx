import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../api'
import { formatApiError } from '../../helpers/api-error'
import { GerenciamentoAgenciasView } from './GerenciamentoAgenciasView'
import type { InclusaoAgenciaFormValues } from './components/DialogInclusaoAgencia'
import type { UpdateAgencyPayload } from '../../api/agency'
import type { AgencyDetailed } from '../../types'

function GerenciamentoAgencias() {
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

  const updateAgency = async (agencyId: number, agency: UpdateAgencyPayload) => {
    const response = await api.agency.updateAgency(agencyId, agency)

    if (response.status === 200) {
      toast.success('Agência atualizada com sucesso.')
    } else {
      toast.error(formatApiError(response.status, response.data))
    }

    await getAgencys()
  }

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
      onUpdate={updateAgency}
      onDelete={deleteAgency}
    />
  )
}

export { GerenciamentoAgencias }
