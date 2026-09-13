import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ActionIconButton } from '@/components/action-icon-button'
import { Pencil, Trash2 } from 'lucide-react'
import { DataTable } from '@/components/data-table'
import type { DataTableColumn } from '@/components/data-table/types'
import { Button } from '@/components/ui/button'
import { formatDate, formatPhone } from '../../../helpers/formatters'
import { CustomChip } from '../../../components'
import { DialogExclusaoMatricula } from './DialogExclusaoMatricula'
import { DialogInclusaoBolsa } from './DialogInclusaoBolsa'
import type { InclusaoBolsaSubmitValues } from './DialogInclusaoBolsa'
import { DialogEdicaoMatricula } from './DialogEdicaoMatricula'
import type { EdicaoMatriculaSubmitValues } from './DialogEdicaoMatricula'
import type {
  AdvisorFilterOption,
  EnrollmentDetailedWithFullRelations,
  EnrollmentProgram,
  IdentifiedFilterOption,
  StudentDetailedWithFullRelations
} from '../../../types'

const NOT_INFORMED = 'Não informado'

export interface MatriculaRow extends EnrollmentDetailedWithFullRelations {
  student_email: string
}

export interface DataGridMatriculasProps {
  data: StudentDetailedWithFullRelations
  advisors: AdvisorFilterOption[]
  agencies: IdentifiedFilterOption[]
  allocations: IdentifiedFilterOption[]
  onCreateScholarship: (data: InclusaoBolsaSubmitValues) => void
  onUpdate: (data: EdicaoMatriculaSubmitValues) => void
  onDelete: (enrollmentId: number) => void
  getMaxEndDate: (referenceDate: Date | null, enrollmentProgram: EnrollmentProgram) => Date
}

function DataGridMatriculas(props: DataGridMatriculasProps) {
  const { data } = props

  const enrollments = useMemo<MatriculaRow[]>(
    () =>
      data.enrollments.map(enrollment => ({
        ...enrollment,
        student_email: data.email,
      })),
    [data]
  )

  const hasOnGoingScholarship = enrollments.some(enrollment => enrollment.scholarships.some(scholarship => scholarship.status === 'ON_GOING' || scholarship.status === 'EXTENDED'))

  const [selectedEnrollment, setSelectedEnrollment] = useState<MatriculaRow | null>(null)
  const [isDialogForScholarshipCreateOpen, setIsDialogForScholarshipCreateOpen] = useState(false)
  const [isDialogForEnrollmentUpdateOpen, setIsDialogForEnrollmentUpdateOpen] = useState(false)
  const [isDialogForEnrollmentDeleteOpen, setIsDialogForEnrollmentDeleteOpen] = useState(false)

  const handleDialogForScholarshipCreateClose = () => {
    setSelectedEnrollment(null)
    setIsDialogForScholarshipCreateOpen(false)
  }

  const handleDialogForScholarshipCreateOpen = (value: MatriculaRow) => {
    setSelectedEnrollment(value)
    setIsDialogForScholarshipCreateOpen(true)
  }

  const handleDialogForUpdateClose = () => {
    setSelectedEnrollment(null)
    setIsDialogForEnrollmentUpdateOpen(false)
  }

  const handleDialogForUpdateOpen = (value: MatriculaRow) => {
    setSelectedEnrollment(value)
    setIsDialogForEnrollmentUpdateOpen(true)
  }

  const handleDialogForDeleteClose = () => {
    setSelectedEnrollment(null)
    setIsDialogForEnrollmentDeleteOpen(false)
  }

  const handleDialogForDeleteOpen = (value: MatriculaRow) => {
    setSelectedEnrollment(value)
    setIsDialogForEnrollmentDeleteOpen(true)
  }

  const columns = useMemo<DataTableColumn<MatriculaRow>[]>(
    () => [
      {
        id: 'enrollmentNumber',
        header: 'Matrícula',
        width: 120,
        cell: (row) => <p className="overflow-auto">{row.enrollment_number.trim()}</p>,
        csv: (row) => row.enrollment_number.trim()
      },
      {
        id: 'enrollmentProgram',
        header: 'Curso',
        width: 135,
        cell: (row) => <CustomChip value={row.enrollment_program} type="program" />,
        csv: (row) => row.enrollment_program
      },
      {
        id: 'advisorName',
        header: 'Nome do Orientador',
        width: 250,
        cell: (row) => (
          <p className="custom-scrollbar whitespace-nowrap overflow-x-auto">{row.advisor?.name}</p>
        ),
        csv: (row) => row.advisor?.name
      },
      {
        id: 'advisorEmail',
        header: 'E-mail do Orientador',
        width: 190,
        cell: (row) => (
          <p className="custom-scrollbar whitespace-nowrap overflow-x-auto">{row.advisor?.email}</p>
        ),
        csv: (row) => row.advisor?.email
      },
      {
        id: 'advisorPhoneNumber',
        header: 'Celular do Orientador',
        width: 170,
        cell: (row) =>
          row.advisor?.phone_number ? (
            <a
              href={`https://wa.me/${row.advisor?.phone_number}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500"
            >
              {formatPhone(row.advisor?.phone_number)}
            </a>
          ) : (
            <p className="overflow-auto">{NOT_INFORMED}</p>
          ),
        csv: (row) => row.advisor?.phone_number
      },
      {
        id: 'advisorStatus',
        header: 'Situação do Orientador',
        width: 180,
        cell: (row) => (
          <p className="custom-scrollbar whitespace-nowrap overflow-x-auto">
            {row.advisor?.status === 'ACTIVE' ? 'Em exercício' : 'Inativo'}
          </p>
        ),
        csv: (row) => row.advisor?.email
      },
      {
        id: 'enrollmentDate',
        header: 'Data da Matrícula',
        width: 150,
        cell: (row) => formatDate(row.enrollment_date),
        csv: (row) => formatDate(row.enrollment_date)
      },
      {
        id: 'defensePredictionDate',
        header: 'Previsão de Defesa',
        width: 160,
        cell: (row) => formatDate(row.defense_prediction_date ?? 0),
        csv: (row) => formatDate(row.defense_prediction_date ?? 0)
      },
      {
        id: 'actions',
        header: 'Ações',
        width: 180,
        cell: (row) => (
          <div className="flex w-full h-full items-center justify-center gap-x-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'h-auto min-w-0 whitespace-normal px-2 py-1 leading-tight text-primary',
                    hasOnGoingScholarship && 'cursor-not-allowed opacity-50 hover:bg-transparent'
                  )}
                  aria-label="Adicionar Bolsa"
                  aria-disabled={hasOnGoingScholarship || undefined}
                  onClick={
                    hasOnGoingScholarship
                      ? undefined
                      : () => handleDialogForScholarshipCreateOpen(row)
                  }
                >
                  <span className="capitalize font-bold text-center">Add<br />Bolsa</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs text-center">
                {hasOnGoingScholarship
                  ? 'Não é possível adicionar uma nova bolsa, pois você já possui uma bolsa em andamento.'
                  : 'Adicionar Bolsa'}
              </TooltipContent>
            </Tooltip>
            <ActionIconButton
              label="Editar Matrícula"
              icon={Pencil}
              onClick={() => handleDialogForUpdateOpen(row)}
            />
            <ActionIconButton
              label="Excluir Matrícula"
              icon={Trash2}
              onClick={() => handleDialogForDeleteOpen(row)}
            />
          </div>
        )
      }
    ],
    [hasOnGoingScholarship]
  )

  return (
    <div>
      <DataTable data={enrollments} columns={columns} csvFileName="matriculas" />

      {isDialogForScholarshipCreateOpen && selectedEnrollment && (
        <DialogInclusaoBolsa
          isOpen={isDialogForScholarshipCreateOpen}
          onClose={handleDialogForScholarshipCreateClose}
          onSubmit={props.onCreateScholarship}
          agencies={props.agencies}
          allocations={props.allocations}
          enrollment={selectedEnrollment}
          getMaxEndDate={props.getMaxEndDate}
        />
      )}

      {selectedEnrollment && (
        <DialogEdicaoMatricula
          onSubmit={props.onUpdate}
          item={selectedEnrollment}
          advisors={props.advisors}
          isOpen={isDialogForEnrollmentUpdateOpen}
          onClose={handleDialogForUpdateClose}
        />
      )}

      {selectedEnrollment && (
        <DialogExclusaoMatricula
          onSubmit={props.onDelete}
          item={selectedEnrollment}
          isOpen={isDialogForEnrollmentDeleteOpen}
          onClose={handleDialogForDeleteClose}
        />
      )}
    </div>
  )
}

export { DataGridMatriculas }
