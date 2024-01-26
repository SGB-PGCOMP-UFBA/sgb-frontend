import React from 'react'
import { Icon } from '@mui/material'
import Sidebar from '../../components/Sidebar'
import { DataGridAgencias } from './components/DataGridAgencias'

function GerenciamentoAgenciasView({ isLoading, agencys, onUpdate, onDelete }) {
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
          <DataGridAgencias
            isLoading={isLoading}
            agencys={agencys}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </div>
      </section>
    </div>
  )
}

export { GerenciamentoAgenciasView }
