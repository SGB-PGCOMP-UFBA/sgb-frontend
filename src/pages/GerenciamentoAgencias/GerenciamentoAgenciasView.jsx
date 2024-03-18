import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Button, Icon } from '@mui/material'
import { AddCircleOutline } from '@mui/icons-material'
import { DataGridAgencias } from './components/DataGridAgencias'
import { DialogInclusaoAgencia } from './components/DialogInclusaoAgencia'
import Sidebar from '../../components/Sidebar'
import Loading from '../../components/Loading'
import MenuAppBar from '../../components/Navbar'

function GerenciamentoAgenciasView(props) {
  const { isLoading, data, onCreate, onUpdate, onDelete } = props
  const [isDialogForCreateOpen, setIsDialogForCreateOpen] = useState(false)

  const handleDialogForCreateClose = () => {
    setIsDialogForCreateOpen(false)
  }

  const handleDialogForCreateOpen = () => {
    setIsDialogForCreateOpen(true)
  }

  return (
    <div className="flex h-screen flex-col overflow-auto bg-gray-100 md:flex-row">
      <Sidebar />
      <div className="flex w-full flex-col justify-start">
        <MenuAppBar />
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
            {isLoading ? (
              <Loading />
            ) : (
              <DataGridAgencias
                data={data}
                onCreate={onCreate}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            )}

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
    </div>
  )
}

GerenciamentoAgenciasView.prototypes = {
  isLoading: PropTypes.boolean,
  data: PropTypes.node,
  onCreate: PropTypes.node,
  onUpdate: PropTypes.node,
  onDelete: PropTypes.node
}

export { GerenciamentoAgenciasView }
