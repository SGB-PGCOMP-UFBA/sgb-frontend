import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { AddCircleOutline } from '@mui/icons-material'
import InfoIcon from '@mui/icons-material/Info'
import { Button, Icon, IconButton, Tooltip, Typography } from '@mui/material'
import Loading from '../../components/Loading'
import Sidebar from '../../components/Sidebar'
import MenuAppBar from '../../components/Navbar'
import { DialogInclusaoMatricula } from './components/DialogInclusaoMatricula'
import { DataGridBolsas } from './components/DataGridBolsas'
import { DataGridMatriculas } from './components/DataGridMatriculas'

function AreaDoEstudanteView(props) {
  const [isDialogForCreateEnrollmentOpen, setIsDialogForCreateEnrollmentOpen] = useState(false)

  const handleDialogForCreateEnrollmentClose = () => {
    setIsDialogForCreateEnrollmentOpen(false)
  }

  const handleDialogForCreateEnrollmentOpen = () => {
    setIsDialogForCreateEnrollmentOpen(true)
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
                <Tooltip title="A edição de matrículas está temporariamente desabilitada. Caso precise realizar algum ajuste, remova a matrícula e cadastre-a novamente. Vale lembrar que as bolsas vinculadas a ela também serão removidas.">
                  <IconButton color='info'>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<AddCircleOutline />}
                  onClick={() => handleDialogForCreateEnrollmentOpen()}
                >
                  Nova Matrícula
                </Button>
              </div>
            </div>
            <Typography variant="h6" component="h6">Matrículas</Typography>
            {props.isLoading ? <Loading /> : <DataGridMatriculas data={props.student} agencies={props.agencies} onCreateScholarship={props.onCreateNewScholarship} onUpdate={props.onUpdateEnrollment} onDelete={props.onDeleteEnrollment} />}

            <Typography variant="h6" component="h6">Bolsas</Typography>
            {props.isLoading ? <Loading /> : <DataGridBolsas data={props.student} onUpdate={props.onUpdateScholarship} onDelete={props.onDeleteScholarship} />}

            {isDialogForCreateEnrollmentOpen && (
              <DialogInclusaoMatricula
                isOpen={isDialogForCreateEnrollmentOpen}
                onClose={handleDialogForCreateEnrollmentClose}
                onSubmit={props.onCreateNewEnrollment}
                advisors={props.advisors}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

AreaDoEstudanteView.prototypes = {
  enrollmentTabIndex: PropTypes.number.isRequired,
  handleChangeEnrollmentTab: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  advisors: PropTypes.node.isRequired,
  agencies: PropTypes.node.isRequired,
  onCreateNewEnrollment: PropTypes.func,
  onCreateNewScholarship: PropTypes.func,
  onDeleteEnrollment: PropTypes.func,
  onDeleteScholarship: PropTypes.func,
  onUpdateEnrollment: PropTypes.func,
  onUpdateScholarship: PropTypes.func,
  student: PropTypes.shape({
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
}

export { AreaDoEstudanteView }
