import { useMemo, useState } from 'react'
import { DataTable } from '@/components/data-table'
import type { DataTableColumn } from '@/components/data-table/data-table.type'
import { DialogExclusaoBolsaEstudante } from '@/components/dialog-exclusao-bolsa-estudante'
import { formatBrazilianCurrency, formatCalendarDate } from '@/helpers/formatters.helper'
import {
  listStudentScholarships,
  type StudentScholarship,
} from '@/helpers/student-records.helper'
import { CustomChip } from '@/components'
import { MenuAcoesBolsaEstudante } from './menu-acoes-bolsa-estudante'
import type { StudentDetailedWithFullRelations } from '@/types'

const NOT_INFORMED = 'Não informado'

type BolsaRow = StudentScholarship

export interface DataGridBolsasProps {
  data: StudentDetailedWithFullRelations
  onView: (scholarship: BolsaRow) => void
  onEdit: (scholarship: BolsaRow) => void
  onDelete: (scholarshipId: number) => void
}

function DataGridBolsas({ data, onView, onEdit, onDelete }: DataGridBolsasProps) {
  const scholarships = useMemo(() => listStudentScholarships(data), [data])
  const [deletingScholarship, setDeletingScholarship] =
    useState<BolsaRow | null>(null)

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
        cell: (row) => formatCalendarDate(row.scholarship_starts_at),
        csv: (row) => formatCalendarDate(row.scholarship_starts_at)
      },
      {
        id: 'scholarshipEndsAt',
        header: 'Data de Término da Bolsa',
        width: 200,
        cell: (row) => formatCalendarDate(row.scholarship_ends_at),
        csv: (row) => formatCalendarDate(row.scholarship_ends_at)
      },
      {
        id: 'extensionEndsAt',
        header: 'Data de Extensão da Bolsa',
        width: 210,
        cell: (row) =>
          row.extension_ends_at ? formatCalendarDate(row.extension_ends_at) : NOT_INFORMED,
        csv: (row) => (row.extension_ends_at ? formatCalendarDate(row.extension_ends_at) : null)
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
        width: 96,
        cell: (row) => (
          <MenuAcoesBolsaEstudante
            scholarship={row}
            onView={onView}
            onEdit={onEdit}
            onDelete={setDeletingScholarship}
          />
        )
      }
    ],
    [onView, onEdit]
  )

  return (
    <div>
      <DataTable data={scholarships} columns={columns} csvFileName="bolsas" />

      {deletingScholarship && (
        <DialogExclusaoBolsaEstudante
          onSubmit={onDelete}
          item={deletingScholarship}
          isOpen={Boolean(deletingScholarship)}
          onClose={() => setDeletingScholarship(null)}
        />
      )}
    </div>
  )
}

export { DataGridBolsas }
