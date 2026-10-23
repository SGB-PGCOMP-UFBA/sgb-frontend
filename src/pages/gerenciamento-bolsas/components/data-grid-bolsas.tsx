import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { PaginationState } from '@tanstack/react-table'
import { DataTable } from '@/components/data-table'
import type { DataTableColumn } from '@/components/data-table/data-table.type'
import { formatCalendarDate } from '@/helpers/formatters.helper'
import { CustomChip } from '@/components'
import { DialogExclusaoBolsa } from '@/components/dialog-exclusao-bolsa'
import { MenuAcoesBolsa } from './menu-acoes-bolsa'
import type {
  PageMeta,
  ScholarshipDetailedWithRelations
} from '@/types'
import './custom-scrollbar.css';

const NOT_INFORMED = 'Não informado'

export interface DataGridBolsasProps {
  page: number
  setPage: (page: number) => void
  size: number
  setSize: (size: number) => void
  data: ScholarshipDetailedWithRelations[] | undefined
  metadata: PageMeta | undefined
  onDelete: (scholarshipId: number) => void
}

function DataGridBolsas(props: DataGridBolsasProps) {
  const { data, metadata, onDelete } = props
  const navigate = useNavigate()

  const [paginationModel, setPaginationModel] = useState<PaginationState>({
    pageSize: metadata?.itemsPerPage ?? props.size,
    pageIndex: (metadata?.currentPage ?? props.page) - 1
  })

  const handlePaginationChange = (nextPagination: PaginationState) => {
    const hasPageSizeChanged = nextPagination.pageSize !== paginationModel.pageSize
    const currentPage = hasPageSizeChanged ? 1 : nextPagination.pageIndex + 1
    const itemsPerPage = nextPagination.pageSize

    setPaginationModel({
      pageIndex: currentPage - 1,
      pageSize: itemsPerPage
    })

    props.setPage(currentPage)
    props.setSize(itemsPerPage)
  }

  const [selectedScholarship, setSelectedScholarship] = useState<ScholarshipDetailedWithRelations | null>(null)
  const [isDialogForDeleteOpen, setIsDialogForDeleteOpen] = useState(false)

  const handleDialogForDeleteClose = () => {
    setSelectedScholarship(null)
    setIsDialogForDeleteOpen(false)
  }

  const handleDialogForDeleteOpen = (value: ScholarshipDetailedWithRelations) => {
    setSelectedScholarship(value)
    setIsDialogForDeleteOpen(true)
  }

  const columns = useMemo<DataTableColumn<ScholarshipDetailedWithRelations>[]>(
    () => [
      {
        id: 'enrollmentNumber',
        header: 'Matrícula',
        width: 110,
        cell: (row) => <p className="overflow-auto">{row.enrollment?.enrollment_number}</p>,
        csv: (row) => row.enrollment?.enrollment_number
      },
      {
        id: 'enrollmentProgram',
        header: 'Curso',
        width: 135,
        cell: (row) => <CustomChip value={row.enrollment?.enrollment_program ?? ''} type="program" />,
        csv: (row) => row.enrollment?.enrollment_program
      },
      {
        id: 'agencyName',
        header: 'Agência',
        width: 100,
        cell: (row) => <CustomChip value={row.agency?.name ?? ''} type="agency" />,
        csv: (row) => row.agency?.name
      },
      {
        id: 'active',
        header: 'Status',
        width: 160,
        cell: (row) => <CustomChip value={row.status} type="status" />,
        csv: (row) => row.status
      },
      {
        id: 'studentName',
        header: 'Nome do Bolsista',
        width: 260,
        cell: (row) => (
          <p className="custom-scrollbar whitespace-nowrap overflow-x-auto">{row.student?.name}</p>
        ),
        csv: (row) => row.student?.name
      },
      {
        id: 'advisorName',
        header: 'Nome do Orientador',
        width: 220,
        cell: (row) => (
          <p className="custom-scrollbar whitespace-nowrap overflow-x-auto">{row.advisor?.name}</p>
        ),
        csv: (row) => row.advisor?.name
      },
      {
        id: 'scholarshipStartsAt',
        header: 'Início da Bolsa',
        width: 100,
        cell: (row) => formatCalendarDate(row.scholarship_starts_at),
        csv: (row) => formatCalendarDate(row.scholarship_starts_at)
      },
      {
        id: 'scholarshipEndsAt',
        header: 'Término da Bolsa',
        width: 100,
        cell: (row) => formatCalendarDate(row.scholarship_ends_at),
        csv: (row) => formatCalendarDate(row.scholarship_ends_at)
      },
      {
        id: 'extensionEndsAt',
        header: 'Extensão da Bolsa',
        width: 100,
        cell: (row) => (row.extension_ends_at ? formatCalendarDate(row.extension_ends_at) : 'N/A'),
        csv: (row) => (row.extension_ends_at ? formatCalendarDate(row.extension_ends_at) : null)
      },
      {
        id: 'enrollmentDate',
        header: 'Data da Matrícula',
        width: 100,
        cell: (row) => formatCalendarDate(row.enrollment?.enrollment_date),
        csv: (row) => formatCalendarDate(row.enrollment?.enrollment_date)
      },
      {
        id: 'defensePredictionDate',
        header: 'Previsão de Defesa',
        width: 100,
        cell: (row) => formatCalendarDate(row.enrollment?.defense_prediction_date),
        csv: (row) => formatCalendarDate(row.enrollment?.defense_prediction_date)
      },
      {
        id: 'allocationName',
        header: 'Alocação',
        width: 130,
        cell: (row) => (
          <p className="custom-scrollbar whitespace-nowrap overflow-x-auto">
            {row.allocation?.name ? row.allocation.name : NOT_INFORMED}
          </p>
        ),
        csv: (row) => row.allocation?.name
      },
      {
        id: 'actions',
        header: 'Ações',
        width: 80,
        cell: (row) => (
          <MenuAcoesBolsa
            scholarship={row}
            onView={(scholarship) => navigate(`/bolsas/${scholarship.id}`)}
            onViewUser={(userId) => navigate(`/usuarios/${userId}`)}
            onEdit={(scholarship) =>
              navigate(`/bolsas/${scholarship.id}`, {
                state: { startEditing: true }
              })
            }
            onDelete={handleDialogForDeleteOpen}
          />
        )
      }
    ],
    [navigate]
  )

  return (
    <div>
      <div>
        <DataTable
          data={data ?? []}
          columns={columns}
          csvFileName="bolsas"
          manualPagination
          rowCount={metadata?.totalItems ?? 0}
          pagination={paginationModel}
          onPaginationChange={handlePaginationChange}
          pageSizeOptions={[5, 10, 25, 50, 100]}
        />

        {selectedScholarship && (
          <DialogExclusaoBolsa
            item={selectedScholarship}
            isOpen={isDialogForDeleteOpen}
            onSubmit={onDelete}
            onClose={handleDialogForDeleteClose}
          />
        )}
      </div>
    </div>
  )
}

export { DataGridBolsas }
