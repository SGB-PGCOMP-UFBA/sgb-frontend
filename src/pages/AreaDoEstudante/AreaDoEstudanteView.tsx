import { useState } from 'react'
import { MdSchool } from 'react-icons/md'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import AppLayout from '@/components/app-layout'
import {
  CirclePlus,
  Info
} from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import Loading from '@/components/loading'
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
} from '@/types'

const EXCLUSAO_MATRICULA_AVISO =
  'Caso você exclua um registro de matrícula, as bolsas vinculadas a ela também serão apagadas.'

export interface AreaDoEstudanteViewProps {
  isLoading: boolean
  advisors: AdvisorFilterOption[]
  agencies: IdentifiedFilterOption[]
  allocations: IdentifiedFilterOption[]
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
    <AppLayout>
      <PageHeader
        title="Área do Estudante"
        description="Matrículas e Bolsas"
        icon={MdSchool}
        iconBackgroundClassName="bg-red-400"
        actions={
          <div className="flex items-center gap-x-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-600 hover:text-red-700"
                  aria-label={EXCLUSAO_MATRICULA_AVISO}
                >
                  <Info />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs text-center">
                {EXCLUSAO_MATRICULA_AVISO}
              </TooltipContent>
            </Tooltip>
            <Button
              className="bg-green-600 text-white hover:bg-green-700"
              onClick={() => handleDialogForCreateEnrollmentOpen()}
            >
              <CirclePlus />
              Nova Matrícula
            </Button>
          </div>
        }
      />
      <h3 className="text-xl font-medium text-gray-900">Matrículas</h3>
      {props.isLoading ? <Loading /> : props.student && <DataGridMatriculas data={props.student} agencies={props.agencies} allocations={props.allocations} advisors={props.advisors} onCreateScholarship={props.onCreateNewScholarship} onUpdate={props.onUpdateEnrollment} onDelete={props.onDeleteEnrollment} getMaxEndDate={props.getMaxEndDate} />}

      <h3 className="text-xl font-medium text-gray-900">Bolsas</h3>
      {props.isLoading ? <Loading /> : props.student && <DataGridBolsas data={props.student} agencies={props.agencies} allocations={props.allocations} onUpdate={props.onUpdateScholarship} onDelete={props.onDeleteScholarship} getMaxEndDate={props.getMaxEndDate} />}

      {isDialogForCreateEnrollmentOpen && (
        <DialogInclusaoMatricula
          isOpen={isDialogForCreateEnrollmentOpen}
          onClose={handleDialogForCreateEnrollmentClose}
          onSubmit={props.onCreateNewEnrollment}
          advisors={props.advisors}
        />
      )}
    </AppLayout>
  )
}

export { AreaDoEstudanteView }
