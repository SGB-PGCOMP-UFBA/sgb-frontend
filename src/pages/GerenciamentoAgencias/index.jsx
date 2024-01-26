import React, { useEffect, useState } from 'react'
import { Icon } from '@mui/material'
import Sidebar from '../../components/Sidebar'
import { DataGridAgencias } from './DataGridAgencias'
import { api } from '../../api'

function GerenciamentoAgencias() {
  const [isLoading, setIsLoading] = useState(false)
  const [agencys, setAgencys] = useState([])

  const getAgencys = async () => {
    const response = await api.agency.getAgencys()
    setAgencys(response.data)
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
    <div className="flex h-screen flex-col overflow-auto bg-gray-100 md:flex-row">
      <Sidebar userType="admin" />
      <section className="flex w-full justify-center p-4">
        <div className="shadow-base h-max w-full space-y-8 rounded-lg bg-white p-6 lg:w-full">
          <div className="mb-8 flex items-center gap-x-4">
            <div className="rounded-md bg-purple-400 p-2 leading-none">
              <Icon sx={{ fontSize: 32 }}>business</Icon>
            </div>
            <div>
              <h2 className="poppins text-xl font-semibold text-gray-900">Agências</h2>
              <p className="poppins font-medium text-gray-500">Visualização e Gestão de Agências</p>
            </div>
          </div>
          <DataGridAgencias agencys={agencys} isLoading={isLoading} onRemoveAgency={deleteAgency} />
        </div>
      </section>
    </div>
  )
}

export { GerenciamentoAgencias }
