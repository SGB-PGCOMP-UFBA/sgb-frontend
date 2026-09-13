import { useMemo, useState } from 'react'
import { ActionIconButton } from '@/components/action-icon-button'
import { Pencil, Trash2 } from 'lucide-react'
import { DataTable } from '@/components/data-table'
import type { DataTableColumn } from '@/components/data-table/types'
import { formatBrazilianCurrency, formatDate } from '../../../helpers/formatters'
import { CustomChip } from '../../../components'
import { DialogExclusaoBolsa } from './DialogExclusaoBolsa'
import { DialogEdicaoBolsa } from './DialogEdicaoBolsa'
import type { EdicaoBolsaSubmitValues } from './DialogEdicaoBolsa'
import type {
  EnrollmentProgram,
  IdentifiedFilterOption,
  ScholarshipDetailedWithFullRelations,
  StudentDetailedWithFullRelations
} from '../../../types'

const NOT_INFORMED = 'Não informado'

export interface BolsaRow extends ScholarshipDetailedWithFullRelations {
  student_id: number
  student_email: string
  enrollment_id: number
  enrollment_number: string
  enrollment_program: EnrollmentProgram
}

export interface DataGridBolsasProps {
  data: StudentDetailedWithFullRelations
  agencies: IdentifiedFilterOption[]
  allocations: IdentifiedFilterOption[]
  onUpdate: (data: EdicaoBolsaSubmitValues) => Promise<false | void>
  onDelete: (scholarshipId: number) => void
  getMaxEndDate: (referenceDate: Date | null, enrollmentProgram: EnrollmentProgram) => Date
}

function DataGridBolsas(props: DataGridBolsasProps) {
  const { data } = props

  const scholarships = useMemo<BolsaRow[]>(
    () =>
      data.enrollments.flatMap(enrollment =>
        enrollment.scholarships.map(scholarship => ({
          ...scholarship,
          student_id: data.id,
          student_email: data.email,
          enrollment_id: enrollment.id,
          enrollment_number: enrollment.enrollment_number.trim(),
          enrollment_program: enrollment.enrollment_program,
        }))
      ),
    [data]
  )

  const [selectedScholarship, setSelectedScholarship] = useState<BolsaRow | null>(null)
  const [isDialogForScholarshipUpdateOpen, setIsDialogForScholarshipUpdateOpen] = useState(false)
  const [isDialogForScholarshipDeleteOpen, setIsDialogForScholarshipDeleteOpen] = useState(false)

  const handleDialogForUpdateClose = () => {
    setSelectedScholarship(null)
    setIsDialogForScholarshipUpdateOpen(false)
  }

  const handleDialogForUpdateOpen = (value: BolsaRow) => {
    setSelectedScholarship(value)
    setIsDialogForScholarshipUpdateOpen(true)
  }

  const handleDialogForDeleteClose = () => {
    setSelectedScholarship(null)
    setIsDialogForScholarshipDeleteOpen(false)
  }

  const handleDialogForDeleteOpen = (value: BolsaRow) => {
    setSelectedScholarship(value)
    setIsDialogForScholarshipDeleteOpen(true)
  }

  const columns = useMemo<DataTableColumn<BolsaRow>[]>(
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
        id: 'agencyName',
        header: 'Agência de Fomento',
        width: 120,
        cell: (row) => <CustomChip value={row.agency?.name ?? ''} type="agency" />,
        csv: (row) => row.agency?.name
      },
      {
        id: 'status',
        header: 'Situação da Bolsa',
        width: 170,
        cell: (row) => <CustomChip value={row.status} type="status" />,
        csv: (row) => row.status
      },
      {
        id: 'salary',
        header: 'Valor da Bolsa',
        width: 120,
        cell: (row) => formatBrazilianCurrency(row.salary),
        csv: (row) => formatBrazilianCurrency(row.salary)
      },
      {
        id: 'scholarshipStartsAt',
        header: 'Data de Início da Bolsa',
        width: 180,
        cell: (row) => formatDate(row.scholarship_starts_at),
        csv: (row) => formatDate(row.scholarship_starts_at)
      },
      {
        id: 'scholarshipEndsAt',
        header: 'Data de Término da Bolsa',
        width: 200,
        cell: (row) => formatDate(row.scholarship_ends_at),
        csv: (row) => formatDate(row.scholarship_ends_at)
      },
      {
        id: 'extensionEndsAt',
        header: 'Data de Extensão da Bolsa',
        width: 210,
        cell: (row) =>
          row.extension_ends_at ? formatDate(row.extension_ends_at) : NOT_INFORMED,
        csv: (row) => (row.extension_ends_at ? formatDate(row.extension_ends_at) : null)
      },
      {
        id: 'allocationName',
        header: 'Alocação',
        width: 160,
        cell: (row) => (
          <p className="overflow-auto">{row.allocation ? row.allocation.name : NOT_INFORMED}</p>
        ),
        csv: (row) => row.allocation?.name
      },
      {
        id: 'actions',
        header: 'Ações',
        width: 180,
        cell: (row) => (
          <div className="flex items-center gap-x-2 overflow-auto">
            <ActionIconButton
              label="Editar Bolsa"
              icon={Pencil}
              onClick={() => handleDialogForUpdateOpen(row)}
            />
            <ActionIconButton
              label="Excluir Bolsa"
              icon={Trash2}
              onClick={() => handleDialogForDeleteOpen(row)}
            />
          </div>
        )
      }
    ],
    []
  )

  return (
    <div>
      <DataTable data={scholarships} columns={columns} csvFileName="bolsas" />

      {selectedScholarship && (
        <DialogEdicaoBolsa
          onSubmit={props.onUpdate}
          item={selectedScholarship}
          agencies={props.agencies}
          allocations={props.allocations}
          isOpen={isDialogForScholarshipUpdateOpen}
          onClose={handleDialogForUpdateClose}
          getMaxEndDate={props.getMaxEndDate}
        />
      )}

      {selectedScholarship && (
        <DialogExclusaoBolsa
          onSubmit={props.onDelete}
          item={selectedScholarship}
          isOpen={isDialogForScholarshipDeleteOpen}
          onClose={handleDialogForDeleteClose}
        />
      )}
    </div>
  )
}

export { DataGridBolsas }
