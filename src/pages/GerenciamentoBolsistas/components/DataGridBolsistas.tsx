import { useMemo, useState } from 'react'
import { ActionIconButton } from '@/components/action-icon-button'
import type { PaginationState } from '@tanstack/react-table'
import { Pencil, Trash2 } from 'lucide-react'
import { DataTable } from '@/components/data-table'
import type { DataTableColumn } from '@/components/data-table/types'
import { formatDate, formatPhone } from '@/helpers/formatters'
import { CustomChip } from '@/components'
import { DialogExclusaoBolsa } from './DialogExclusaoBolsa'
import { DialogEdicaoBolsista } from './DialogEdicaoBolsista'
import type { EdicaoBolsistaSubmitValues } from './DialogEdicaoBolsista'
import type { ScholarshipFilterOptions } from '@/pages/GerenciamentoBolsistas/GerenciamentoBolsistas'
import type {
  PageMeta,
  ScholarshipDetailedWithRelations
} from '@/types'
import './styles.css';

const NOT_INFORMED = 'Não informado'

export interface DataGridBolsistasProps {
  page: number
  setPage: (page: number) => void
  size: number
  setSize: (size: number) => void
  data: ScholarshipDetailedWithRelations[] | undefined
  filterOptions: ScholarshipFilterOptions
  metadata: PageMeta | undefined
  onEdit: (data: EdicaoBolsistaSubmitValues) => Promise<false | void>
  onDelete: (scholarshipId: number) => void
}

function DataGridBolsistas(props: DataGridBolsistasProps) {
  const { data, metadata, onEdit, onDelete } = props

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
  const [isDialogForEditionOpen, setIsDialogForEditionOpen] = useState(false)

  const handleDialogForDeleteClose = () => {
    setSelectedScholarship(null)
    setIsDialogForDeleteOpen(false)
  }

  const handleDialogForDeleteOpen = (value: ScholarshipDetailedWithRelations) => {
    setSelectedScholarship(value)
    setIsDialogForDeleteOpen(true)
  }

  const handleDialogForEditionClose = () => {
    setSelectedScholarship(null)
    setIsDialogForEditionOpen(false)
  }

  const handleDialogForEditionOpen = (value: ScholarshipDetailedWithRelations) => {
    setSelectedScholarship(value)
    setIsDialogForEditionOpen(true)
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
        cell: (row) => formatDate(row.scholarship_starts_at),
        csv: (row) => formatDate(row.scholarship_starts_at)
      },
      {
        id: 'scholarshipEndsAt',
        header: 'Término da Bolsa',
        width: 100,
        cell: (row) => formatDate(row.scholarship_ends_at),
        csv: (row) => formatDate(row.scholarship_ends_at)
      },
      {
        id: 'extensionEndsAt',
        header: 'Extensão da Bolsa',
        width: 100,
        cell: (row) => (row.extension_ends_at ? formatDate(row.extension_ends_at) : 'N/A'),
        csv: (row) => (row.extension_ends_at ? formatDate(row.extension_ends_at) : null)
      },
      {
        id: 'enrollmentDate',
        header: 'Data da Matrícula',
        width: 100,
        cell: (row) => formatDate(row.enrollment?.enrollment_date ?? 0),
        csv: (row) => formatDate(row.enrollment?.enrollment_date ?? 0)
      },
      {
        id: 'defensePredictionDate',
        header: 'Previsão de Defesa',
        width: 100,
        cell: (row) => formatDate(row.enrollment?.defense_prediction_date ?? 0),
        csv: (row) => formatDate(row.enrollment?.defense_prediction_date ?? 0)
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
        id: 'student_email',
        header: 'E-mail',
        width: 200,
        cell: (row) => (
          <p className="custom-scrollbar whitespace-nowrap overflow-x-auto">
            {row.student?.email ? row.student.email : NOT_INFORMED}
          </p>
        ),
        csv: (row) => row.student?.email
      },
      {
        id: 'student_phone_number',
        header: 'Celular',
        width: 130,
        cell: (row) => (row.student?.phone_number ?
          <a
            href={`https://wa.me/${row.student.phone_number}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500"
          >
            {formatPhone(row.student.phone_number)}
          </a>
          : <p className="overflow-auto">{NOT_INFORMED}</p>
        ),
        csv: (row) => row.student?.phone_number
      },
      {
        id: 'link_to_lattes',
        header: 'Link do Lattes',
        width: 100,
        cell: (row) => (
          <a
            href={`${row.student?.link_to_lattes}`}
            target="_blank"
            rel="noreferrer"
            className="custom-scrollbar whitespace-nowrap overflow-x-auto center text-blue-500"
          >
            Lattes
          </a>
        ),
        csv: (row) => row.student?.link_to_lattes
      },
      {
        id: 'actions',
        header: 'Ações',
        width: 130,
        cell: (row) => (
          <div className="flex items-center gap-x-2 overflow-auto">
            <ActionIconButton
              label="Editar Bolsista"
              icon={Pencil}
              onClick={() => handleDialogForEditionOpen(row)}
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
      <div>
        <DataTable
          data={data ?? []}
          columns={columns}
          csvFileName="bolsistas"
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

        {selectedScholarship && (
          <DialogEdicaoBolsista
            item={selectedScholarship}
            isOpen={isDialogForEditionOpen}
            onSubmit={onEdit}
            onClose={handleDialogForEditionClose}
            filterOptions={props.filterOptions}
          />
        )}
      </div>
    </div>
  )
}

export { DataGridBolsistas }
