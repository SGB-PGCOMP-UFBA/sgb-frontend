import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Button, Icon } from '@mui/material'
import { AddCircleOutline } from '@mui/icons-material'
import { DataGridOrientadores } from './components/DataGridOrientadores'
import { DialogInclusaoOrientador } from './components/DialogInclusaoOrientador'
import Sidebar from '../../components/Sidebar'
import Loading from '../../components/Loading'

function GerenciamentoOrientadoresView(props) {
  const { isLoading, data, onCreate, onUpdate, onDelete, onResetPassword } = props
  const [isDialogForCreateOpen, setIsDialogForCreateOpen] = useState(false)

  const handleDialogForCreateClose = () => {
    setIsDialogForCreateOpen(false)
  }

  const handleDialogForCreateOpen = () => {
    setIsDialogForCreateOpen(true)
  }

  return (
    <div className="flex h-screen flex-col overflow-auto bg-gray-100 md:flex-row">
      <Sidebar userType="admin" />
      <section className="flex w-full justify-center p-4">
        <div className="shadow-base h-max w-full space-y-8 rounded-lg bg-white p-6 lg:w-full">
          <div className="mb-8 flex justify-between">
            <div className="flex items-center gap-x-4">
              <div className="rounded-md bg-yellow-400 p-2 leading-none">
                <Icon sx={{ fontSize: 32 }}>people</Icon>
              </div>
              <div>
                <h2 className="poppins text-xl font-semibold text-gray-900">Orientadores</h2>
                <p className="poppins font-medium text-gray-500">
                  Visualização e Gestão de Orientadores
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <Button
                variant="contained"
                color="success"
                startIcon={<AddCircleOutline />}
                onClick={() => handleDialogForCreateOpen()}
              >
                Novo
              </Button>
            </div>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <DataGridOrientadores
              data={data}
              onCreate={onCreate}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onResetPassword={onResetPassword}
            />
          )}

          {isDialogForCreateOpen && (
            <DialogInclusaoOrientador
              isOpen={isDialogForCreateOpen}
              onClose={handleDialogForCreateClose}
              onSubmit={onCreate}
            />
          )}
        </div>
      </section>
    </div>
  )
}

GerenciamentoOrientadoresView.prototypes = {
  isLoading: PropTypes.boolean,
  data: PropTypes.node,
  onCreate: PropTypes.node,
  onUpdate: PropTypes.node,
  onDelete: PropTypes.node
}

export { GerenciamentoOrientadoresView }
