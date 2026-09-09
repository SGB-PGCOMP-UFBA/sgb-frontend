import { useState } from 'react'
import { Icon, IconButton, Tooltip } from '@mui/material'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import type {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams
} from '@mui/x-data-grid'
import { formatDate, formatPhone } from '../../../helpers/formatters'
import { CustomChip } from '../../../components'
import { DialogExclusaoBolsa } from './DialogExclusaoBolsa'
import { DialogEdicaoBolsista } from './DialogEdicaoBolsista'
import type { EdicaoBolsistaSubmitValues } from './DialogEdicaoBolsista'
import type { ScholarshipFilterOptions } from '../GerenciamentoBolsistas'
import type {
  PageMeta,
  ScholarshipDetailedWithRelations
} from '../../../types'
import './styles.css';

const NOT_INFORMED = 'Não informado'

export interface DataGridBolsistasProps {
  page: number
  setPage: (page: number) => void
  size: number
  setSize: (size: number) => void
  /** `undefined` enquanto a primeira pagina nao chega (ou quando ela falha). */
  data: ScholarshipDetailedWithRelations[] | undefined
  filterOptions: ScholarshipFilterOptions
  /** `undefined` no mesmo caso de `data`. */
  metadata: PageMeta | undefined
  /** Devolve `false` quando a atualizacao falha, e ai o dialogo fica aberto. */
  onEdit: (data: EdicaoBolsistaSubmitValues) => Promise<false | void>
  onDelete: (scholarshipId: number) => void
}

interface PaginationChange {
  currentPage: number
  itemsPerPage: number
}

function DataGridBolsistas(props: DataGridBolsistasProps) {
  const { data, metadata, onEdit, onDelete } = props

  /* `metadata` so falta enquanto a primeira pagina nao chega; ate la a
     paginacao parte do que a tela ja tem em `size`/`page`. */
  const [paginationModel, setPaginationModel] = useState({
    pageSize: metadata?.itemsPerPage ?? props.size,
    page: (metadata?.currentPage ?? props.page) - 1
  })

  const handlePaginationChange = (newPaginationModel: PaginationChange) => {
    setPaginationModel({
      page: newPaginationModel.currentPage - 1,
      pageSize: newPaginationModel.itemsPerPage
    })

    props.setPage(newPaginationModel.currentPage)
    props.setSize(newPaginationModel.itemsPerPage)
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

  const columns: GridColDef[] = [
    {
      field: 'enrollmentNumber',
      headerName: 'Matrícula',
      width: 110,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, ScholarshipDetailedWithRelations>) => (
        <p className="overflow-auto">{params.row.enrollment?.enrollment_number}</p>
      ),
      valueGetter: (params: GridValueGetterParams<unknown, ScholarshipDetailedWithRelations>) => params.row.enrollment?.enrollment_number
    },
    {
      field: 'enrollmentProgram',
      headerName: 'Curso',
      width: 135,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, ScholarshipDetailedWithRelations>) => (
        <CustomChip value={params.row.enrollment?.enrollment_program ?? ''} type="program" />
      ),
      valueGetter: (params: GridValueGetterParams<unknown, ScholarshipDetailedWithRelations>) => params.row.enrollment?.enrollment_program
    },
    {
      field: 'agencyName',
      headerName: 'Agência',
      width: 100,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, ScholarshipDetailedWithRelations>) => <CustomChip value={params.row.agency?.name ?? ''} type="agency" />,
      valueGetter: (params: GridValueGetterParams<unknown, ScholarshipDetailedWithRelations>) => params.row.agency?.name
    },
    {
      field: 'active',
      headerName: 'Status',
      width: 160,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, ScholarshipDetailedWithRelations>) => (
        <CustomChip value={params.row.status} type="status" />
      ),
      valueGetter: (params: GridValueGetterParams<unknown, ScholarshipDetailedWithRelations>) => (params.row.status)
    },
    {
      field: 'studentName',
      headerName: 'Nome do Bolsista',
      width: 260,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, ScholarshipDetailedWithRelations>) =>
        <p className="custom-scrollbar whitespace-nowrap overflow-x-auto">{params.row.student?.name}</p>,
      valueGetter: (params: GridValueGetterParams<unknown, ScholarshipDetailedWithRelations>) => params.row.student?.name
    },
    {
      field: 'advisorName',
      headerName: 'Nome do Orientador',
      width: 220,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, ScholarshipDetailedWithRelations>) =>
        <p className="custom-scrollbar whitespace-nowrap overflow-x-auto">{params.row.advisor?.name}</p>,
      valueGetter: (params: GridValueGetterParams<unknown, ScholarshipDetailedWithRelations>) => params.row.advisor?.name
    },
    {
      field: 'scholarshipStartsAt',
      headerName: 'Início da Bolsa',
      width: 100,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, ScholarshipDetailedWithRelations>) => formatDate(params.row.scholarship_starts_at),
      valueGetter: (params: GridValueGetterParams<unknown, ScholarshipDetailedWithRelations>) => new Date(params.row.scholarship_starts_at)
    },
    {
      field: 'scholarshipEndsAt',
      headerName: 'Término da Bolsa',
      width: 100,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, ScholarshipDetailedWithRelations>) => formatDate(params.row.scholarship_ends_at),
      valueGetter: (params: GridValueGetterParams<unknown, ScholarshipDetailedWithRelations>) => new Date(params.row.scholarship_ends_at)
    },
    {
      field: 'extensionEndsAt',
      headerName: 'Extensão da Bolsa',
      width: 100,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, ScholarshipDetailedWithRelations>) =>
        params.row.extension_ends_at ? formatDate(params.row.extension_ends_at) : 'N/A',
      valueGetter: (params: GridValueGetterParams<unknown, ScholarshipDetailedWithRelations>) =>
        params.row.extension_ends_at ? new Date(params.row.extension_ends_at) : null
    },
    {
      field: 'enrollmentDate',
      headerName: 'Data da Matrícula',
      width: 100,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, ScholarshipDetailedWithRelations>) => formatDate(params.row.enrollment?.enrollment_date ?? 0),
      valueGetter: (params: GridValueGetterParams<unknown, ScholarshipDetailedWithRelations>) => new Date(params.row.enrollment?.enrollment_date ?? 0)
    },
    {
      field: 'defensePredictionDate',
      headerName: 'Previsão de Defesa',
      width: 100,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, ScholarshipDetailedWithRelations>) => formatDate(params.row.enrollment?.defense_prediction_date ?? 0),
      valueGetter: (params: GridValueGetterParams<unknown, ScholarshipDetailedWithRelations>) => new Date(params.row.enrollment?.defense_prediction_date ?? 0)
    },
    {
      field: 'allocationName',
      headerName: 'Alocação',
      width: 130,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, ScholarshipDetailedWithRelations>) =>
        <p className="custom-scrollbar whitespace-nowrap overflow-x-auto" >
          {params.row.allocation?.name ? params.row.allocation.name : NOT_INFORMED}
        </p>,
      valueGetter: (params: GridValueGetterParams<unknown, ScholarshipDetailedWithRelations>) => params.row.allocation?.name
    },
    {
      field: 'student_email',
      headerName: 'E-mail',
      width: 200,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, ScholarshipDetailedWithRelations>) =>
        <p className="custom-scrollbar whitespace-nowrap overflow-x-auto">{ params.row.student?.email ? params.row.student.email : NOT_INFORMED }</p>,
      valueGetter: (params: GridValueGetterParams<unknown, ScholarshipDetailedWithRelations>) => params.row.student?.email
    },
    {
      field: 'student_phone_number',
      headerName: 'Celular',
      width: 130,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, ScholarshipDetailedWithRelations>) => ( params.row.student?.phone_number ?
        <a
          href={`https://wa.me/${params.row.student.phone_number}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500"
        >
          {formatPhone(params.row.student.phone_number)}
        </a>
        : <p className="overflow-auto">{NOT_INFORMED}</p>
      ),
      valueGetter: (params: GridValueGetterParams<unknown, ScholarshipDetailedWithRelations>) => params.row.student?.phone_number
    },
    {
      field: 'link_to_lattes',
      headerName: 'Link do Lattes',
      width: 100,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, ScholarshipDetailedWithRelations>) => (
        <a
          href={`${params.row.student?.link_to_lattes}`}
          target="_blank"
          rel="noreferrer"
          className="custom-scrollbar whitespace-nowrap overflow-x-auto center text-blue-500"
        >
          Lattes
        </a>
      ),
      valueGetter: (params: GridValueGetterParams<unknown, ScholarshipDetailedWithRelations>) => params.row.student?.link_to_lattes
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 130,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, ScholarshipDetailedWithRelations>) => (
        <div className="flex items-center gap-x-2 overflow-auto">
          <Tooltip title="Editar Bolsista">
            <IconButton onClick={() => handleDialogForEditionOpen(params.row)}>
              <Icon sx={{ fontSize: 28 }}>edit</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir Bolsa">
            <IconButton onClick={() => handleDialogForDeleteOpen(params.row)}>
              <Icon sx={{ fontSize: 28 }}>delete</Icon>
            </IconButton>
          </Tooltip>
        </div>
      )
    }
  ]

  return (
    <div>
      <div>
        <DataGrid
          rows={data ?? []}
          columns={columns}
          autoHeight
          disableColumnMenu
          isRowSelectable={() => false}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          pagination
          paginationMode="server"
          page={paginationModel.page}
          pageSize={paginationModel.pageSize}
          rowCount={metadata?.totalItems ?? 0}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          onPageChange={(newPage) => handlePaginationChange({ currentPage: newPage + 1, itemsPerPage: paginationModel.pageSize })}
          onPageSizeChange={(newPageSize) => handlePaginationChange({ currentPage: 1, itemsPerPage: newPageSize })}
          sx={{
            '.MuiDataGrid-columnSeparator': {
              display: 'none',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold',
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              lineHeight: '1.2',
              overflow: 'visible',
            },
            '& .MuiDataGrid-columnHeader': {
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              lineHeight: '1.2',
              overflow: 'visible',
            },
            '& .MuiDataGrid-cell': {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          }}
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
