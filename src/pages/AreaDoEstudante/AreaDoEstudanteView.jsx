import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { AddCircleOutline } from '@mui/icons-material'
import { Button, Icon } from '@mui/material'
import Loading from '../../components/Loading'
import Sidebar from '../../components/Sidebar'
import MenuAppBar from '../../components/Navbar'
import { TabDeMatriculas } from './components/TabDeMatriculas'
import { DialogInclusaoMatricula } from './components/DialogInclusaoMatricula'

function AreaDoEstudanteView(props) {
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
                <div className="rounded-md bg-red-400 p-2 leading-none">
                  <Icon sx={{ fontSize: 32 }}>school</Icon>
                </div>
                <div>
                  <h2 className="poppins text-xl font-semibold text-gray-900">Área do Estudante</h2>
                  <p className="poppins font-medium text-gray-500">Matrículas e Bolsas</p>
                </div>
              </div>
              <div className="flex items-center gap-x-4">
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<AddCircleOutline />}
                  onClick={() => handleDialogForCreateOpen()}
                >
                  Nova Matrícula
                </Button>
              </div>
            </div>
            {props.isLoading ? <Loading /> : <TabDeMatriculas student={props.student} advisors={props.advisors} agencies={props.agencies} />}

            {isDialogForCreateOpen && (
              <DialogInclusaoMatricula
                isOpen={isDialogForCreateOpen}
                onClose={handleDialogForCreateClose}
                onSubmit={() => {}}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

AreaDoEstudanteView.prototypes = {
  isLoading: PropTypes.bool.isRequired,
  advisors: PropTypes.node.isRequired,
  agencies: PropTypes.node.isRequired,
  onUpdate: PropTypes.func,
  student: PropTypes.shape({
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
}

export { AreaDoEstudanteView }
