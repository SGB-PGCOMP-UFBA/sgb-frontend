import React, { useEffect, useState } from 'react'
import { api } from '../../api'
import { GerenciamentoAgenciasView } from './GerenciamentoAgenciasView'

function GerenciamentoAgencias() {
  const [agencys, setAgencys] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getAgencys = async () => {
    const response = await api.agency.getAgencys()
    setAgencys(response.data)
  }

  const createAgency = async (agency) => {
    await api.agency.createAgency(agency)
    await getAgencys()
  }

  const updateAgency = async (agencyId, agency) => {
    await api.agency.updateAgency(agencyId, agency)
    await getAgencys()
  }

  const deleteAgency = async (agency) => {
    await api.agency.deleteAgency(agency)
    await getAgencys()
  }

  useEffect(() => {
    if (isLoading) return
    getAgencys().finally(() => setIsLoading(false))
  }, [])

  return (
    <GerenciamentoAgenciasView
      isLoading={isLoading}
      agencys={agencys}
      onCreate={createAgency}
      onUpdate={updateAgency}
      onDelete={deleteAgency}
    />
  )
}

export { GerenciamentoAgencias }
