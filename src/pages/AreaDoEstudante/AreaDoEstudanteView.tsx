import { useState } from 'react'
import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
import InfoIcon from '@mui/icons-material/Info'
import { Button, Icon, IconButton, Tooltip, Typography } from '@mui/material'
import Loading from '../../components/Loading'
import Sidebar from '../../components/Sidebar'
import MenuAppBar from '../../components/Navbar'
import { DialogInclusaoMatricula } from './components/DialogInclusaoMatricula'
import type { InclusaoMatriculaFormValues } from './components/DialogInclusaoMatricula'
import { DataGridBolsas } from './components/DataGridBolsas'
import type { EdicaoBolsaSubmitValues } from './components/DialogEdicaoBolsa'
import { DataGridMatriculas } from './components/DataGridMatriculas'
import type { EdicaoMatriculaSubmitValues } from './components/DialogEdicaoMatricula'
import type { InclusaoBolsaSubmitValues } from './components/DialogInclusaoBolsa'
import type {
  AdvisorFilterOption,
  EnrollmentProgram,
  IdentifiedFilterOption,
  StudentDetailedWithFullRelations
} from '../../types'

export interface AreaDoEstudanteViewProps {
  isLoading: boolean
  advisors: AdvisorFilterOption[]
  agencies: IdentifiedFilterOption[]
  allocations: IdentifiedFilterOption[]
  /** `null` enquanto a consulta nao terminou (ou quando ela falha). */
  student: StudentDetailedWithFullRelations | null
  onCreateNewEnrollment: (data: InclusaoMatriculaFormValues) => void
  onCreateNewScholarship: (data: InclusaoBolsaSubmitValues) => void
  onUpdateEnrollment: (data: EdicaoMatriculaSubmitValues) => void
  onUpdateScholarship: (data: EdicaoBolsaSubmitValues) => Promise<false | void>
  onDeleteEnrollment: (enrollmentId: number) => void
  onDeleteScholarship: (scholarshipId: number) => void
  getMaxEndDate: (referenceDate: Date | null, enrollmentProgram: EnrollmentProgram) => Date
}

function AreaDoEstudanteView(props: AreaDoEstudanteViewProps) {
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
                <Tooltip title="Caso você exclua um registro de matrícula, as bolsas vinculadas a ela também serão apagadas.">
                  <IconButton color='error'>
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
            {}
            <Typography variant="h6" component="h6">Matrículas</Typography>
            {props.isLoading ? <Loading /> : props.student && <DataGridMatriculas data={props.student} agencies={props.agencies} allocations={props.allocations} advisors={props.advisors} onCreateScholarship={props.onCreateNewScholarship} onUpdate={props.onUpdateEnrollment} onDelete={props.onDeleteEnrollment} getMaxEndDate={props.getMaxEndDate} />}

            <Typography variant="h6" component="h6">Bolsas</Typography>
            {props.isLoading ? <Loading /> : props.student && <DataGridBolsas data={props.student} agencies={props.agencies} allocations={props.allocations} onUpdate={props.onUpdateScholarship} onDelete={props.onDeleteScholarship} getMaxEndDate={props.getMaxEndDate} />}

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

export { AreaDoEstudanteView }
