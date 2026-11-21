import { useMemo, useState } from 'react'
import { DataTable } from '@/components/data-table'
import type { DataTableColumn } from '@/components/data-table/data-table.type'
import { DialogExclusaoMatricula } from '@/components/dialog-exclusao-matricula'
import { DialogInclusaoBolsa } from '@/components/dialog-inclusao-bolsa'
import type { InclusaoBolsaSubmitValues } from '@/components/dialog-inclusao-bolsa'
import { formatPhone, formatCalendarDate } from '@/helpers/formatters.helper'
import {
  hasOngoingScholarship,
  ONGOING_SCHOLARSHIP_BLOCKED,
} from '@/helpers/student-records.helper'
import { CustomChip } from '@/components'
import { MenuAcoesMatricula } from './menu-acoes-matricula'
import type {
  EnrollmentDetailedWithFullRelations,
  IdentifiedFilterOption,
  StudentDetailedWithFullRelations
} from '@/types'

const NOT_INFORMED = 'Não informado'

type MatriculaRow = EnrollmentDetailedWithFullRelations

export interface DataGridMatriculasProps {
  data: StudentDetailedWithFullRelations
  agencies: IdentifiedFilterOption[]
  allocations: IdentifiedFilterOption[]
  onCreateScholarship: (data: InclusaoBolsaSubmitValues) => void
  onView: (enrollment: MatriculaRow) => void
  onEdit: (enrollment: MatriculaRow) => void
  onDelete: (enrollmentId: number) => void
}

function DataGridMatriculas({
  data,
  agencies,
  allocations,
  onCreateScholarship,
  onView,
  onEdit,
  onDelete,
}: DataGridMatriculasProps) {
  const [addingScholarshipTo, setAddingScholarshipTo] =
    useState<MatriculaRow | null>(null)
  const [deletingEnrollment, setDeletingEnrollment] =
    useState<MatriculaRow | null>(null)
  const addScholarshipDisabledReason = hasOngoingScholarship(data)
    ? ONGOING_SCHOLARSHIP_BLOCKED
    : undefined

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
        cell: (row) => formatCalendarDate(row.enrollment_date),
        csv: (row) => formatCalendarDate(row.enrollment_date)
      },
      {
        id: 'defensePredictionDate',
        header: 'Previsão de Defesa',
        width: 160,
        cell: (row) => formatCalendarDate(row.defense_prediction_date),
        csv: (row) => formatCalendarDate(row.defense_prediction_date)
      },
      {
        id: 'actions',
        header: 'Ações',
        width: 96,
        cell: (row) => (
          <MenuAcoesMatricula
            enrollment={row}
            addScholarshipDisabledReason={addScholarshipDisabledReason}
            onView={onView}
            onEdit={onEdit}
            onAddScholarship={setAddingScholarshipTo}
            onDelete={setDeletingEnrollment}
          />
        )
      }
    ],
    [addScholarshipDisabledReason, onView, onEdit]
  )

  return (
    <div>
      <DataTable data={data.enrollments} columns={columns} csvFileName="matriculas" />

      {addingScholarshipTo && (
        <DialogInclusaoBolsa
          isOpen={Boolean(addingScholarshipTo)}
          onClose={() => setAddingScholarshipTo(null)}
          onSubmit={onCreateScholarship}
          agencies={agencies}
          allocations={allocations}
          enrollment={addingScholarshipTo}
        />
      )}

      {deletingEnrollment && (
        <DialogExclusaoMatricula
          onSubmit={onDelete}
          item={deletingEnrollment}
          isOpen={Boolean(deletingEnrollment)}
          onClose={() => setDeletingEnrollment(null)}
        />
      )}
    </div>
  )
}

export { DataGridMatriculas }
