import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../api'
import { GerenciamentoAgenciasView } from './GerenciamentoAgenciasView'

function GerenciamentoAgencias() {
  const [agencys, setAgencys] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getAgencys = async () => {
    const response = await api.agency.getAgencys()
    console.log(response.data)

    if (response.status === 200) {
      setAgencys(response.data)
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }
  }

  const createAgency = async (agency) => {
    const response = await api.agency.createAgency(agency)

    if (response.status === 201) {
      toast.success('Agência inserida com sucesso.')
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }

    await getAgencys()
  }

  const updateAgency = async (agencyId, agency) => {
    const response = await api.agency.updateAgency(agencyId, agency)

    if (response.status === 200) {
      toast.success('Agência atualizada com sucesso.')
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }

    await getAgencys()
  }

  const deleteAgency = async (agency) => {
    const response = await api.agency.deleteAgency(agency)

    if (response.status === 204) {
      toast.success('Agência excluída com sucesso.')
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
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
