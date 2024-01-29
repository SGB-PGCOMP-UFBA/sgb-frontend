import React, { useState } from 'react'
import { Button, Icon } from '@mui/material'
import { AddCircleOutline } from '@mui/icons-material'
import Sidebar from '../../components/Sidebar'
import { DataGridAgencias } from './components/DataGridAgencias'
import { DialogInclusaoAgencia } from './components/DialogInclusaoAgencia'

function GerenciamentoAgenciasView({ isLoading, agencys, onCreate, onUpdate, onDelete }) {
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
              <div className="rounded-md bg-purple-400 p-2 leading-none">
                <Icon sx={{ fontSize: 32 }}>business</Icon>
              </div>
              <div>
                <h2 className="poppins text-xl font-semibold text-gray-900">Agências</h2>
                <p className="poppins font-medium text-gray-500">
                  Visualização e Gestão de Agências
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
          <DataGridAgencias
            isLoading={isLoading}
            agencys={agencys}
            onCreate={onCreate}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />

          {isDialogForCreateOpen && (
            <DialogInclusaoAgencia
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

export { GerenciamentoAgenciasView }
