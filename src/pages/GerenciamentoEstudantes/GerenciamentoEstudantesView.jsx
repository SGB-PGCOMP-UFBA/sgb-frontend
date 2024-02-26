import PropTypes from 'prop-types'
import React from 'react'
import { Icon } from '@mui/material'
import { DataGridEstudantes } from './components/DataGridEstudantes'
import Sidebar from '../../components/Sidebar'
import Loading from '../../components/Loading'

function GerenciamentoEstudantesView(props) {
  const { isLoading, data, onUpdate, onDelete } = props

  return (
    <div className="flex h-screen flex-col overflow-auto bg-gray-100 md:flex-row">
      <Sidebar userType="admin" />
      <section className="flex w-full justify-center p-4">
        <div className="shadow-base h-max w-full space-y-8 rounded-lg bg-white p-6 lg:w-full">
          <div className="mb-8 flex justify-between">
            <div className="flex items-center gap-x-4">
              <div className="rounded-md bg-blue-400 p-2 leading-none">
                <Icon sx={{ fontSize: 32 }}>school</Icon>
              </div>
              <div>
                <h2 className="poppins text-xl font-semibold text-gray-900">Estudantes</h2>
                <p className="poppins font-medium text-gray-500">
                  Visualização e Gestão de Estudantes
                </p>
              </div>
            </div>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <DataGridEstudantes
              isLoading={isLoading}
              data={data}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          )}
        </div>
      </section>
    </div>
  )
}

GerenciamentoEstudantesView.prototypes = {
  isLoading: PropTypes.boolean,
  data: PropTypes.node,
  onUpdate: PropTypes.node,
  onDelete: PropTypes.node
}

export { GerenciamentoEstudantesView }
