import { useState } from 'react'
import { Icon, IconButton, Tooltip } from '@mui/material'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import type {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams
} from '@mui/x-data-grid'
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

/** Linha da grade: a bolsa achatada com os dados do estudante e da matricula. */
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
  const scholarships = data.enrollments.flatMap(enrollment =>
    enrollment.scholarships.map(scholarship => ({
      ...scholarship,
      student_id: data.id,
      student_email: data.email,
      enrollment_id: enrollment.id,
      enrollment_number: enrollment.enrollment_number.trim(),
      enrollment_program: enrollment.enrollment_program,
    }))
  )

  const [pageSize, setPageSize] = useState(5)

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

  const columns: GridColDef[] = [
    {
      field: 'enrollmentNumber',
      headerName: 'Matrícula',
      width: 120,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, BolsaRow>) => (
        <p className="overflow-auto">{params.row.enrollment_number.trim()}</p>
      ),
      valueGetter: (params: GridValueGetterParams<unknown, BolsaRow>) => params.row.enrollment_number.trim()
    },
    {
      field: 'enrollmentProgram',
      headerName: 'Curso',
      width: 135,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, BolsaRow>) => (
        <CustomChip value={params.row.enrollment_program} type="program" />
      ),
      valueGetter: (params: GridValueGetterParams<unknown, BolsaRow>) => params.row.enrollment_program
    },
    {
      field: 'agencyName',
      headerName: 'Agência de Fomento',
      width: 120,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, BolsaRow>) => (
        <CustomChip value={params.row.agency?.name ?? ''} type="agency" />
      ),
      valueGetter: (params: GridValueGetterParams<unknown, BolsaRow>) => params.row.agency?.name
    },
    {
      field: 'status',
      headerName: 'Situação da Bolsa',
      width: 170,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, BolsaRow>) => (
        <CustomChip value={params.row.status} type="status" />
      ),
      valueGetter: (params: GridValueGetterParams<unknown, BolsaRow>) => params.row.status
    },
    {
      field: 'salary',
      headerName: 'Valor da Bolsa',
      width: 120,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, BolsaRow>) => formatBrazilianCurrency(params.row.salary),
      valueGetter: (params: GridValueGetterParams<unknown, BolsaRow>) => formatBrazilianCurrency(params.row.salary)
    },
    {
      field: 'scholarshipStartsAt',
      headerName: 'Data de Início da Bolsa',
      width: 180,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, BolsaRow>) => formatDate(params.row.scholarship_starts_at),
      valueGetter: (params: GridValueGetterParams<unknown, BolsaRow>) => new Date(params.row.scholarship_starts_at)
    },
    {
      field: 'scholarshipEndsAt',
      headerName: 'Data de Término da Bolsa',
      width: 200,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, BolsaRow>) => formatDate(params.row.scholarship_ends_at),
      valueGetter: (params: GridValueGetterParams<unknown, BolsaRow>) => new Date(params.row.scholarship_ends_at)
    },
    {
      field: 'extensionEndsAt',
      headerName: 'Data de Extensão da Bolsa',
      width: 210,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, BolsaRow>) =>
        params.row.extension_ends_at ? formatDate(params.row.extension_ends_at) : NOT_INFORMED,
      valueGetter: (params: GridValueGetterParams<unknown, BolsaRow>) =>
        params.row.extension_ends_at ? new Date(params.row.extension_ends_at) : null
    },
    {
      field: 'allocationName',
      headerName: 'Alocação',
      width: 160,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, BolsaRow>) => (
        <p className="overflow-auto">{params.row.allocation? params.row.allocation.name : NOT_INFORMED}</p>
      ),
      valueGetter: (params: GridValueGetterParams<unknown, BolsaRow>) => params.row.allocation?.name
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 180,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, BolsaRow>) => (
        <div className="flex items-center gap-x-2 overflow-auto">
          <Tooltip title="Editar Bolsa">
            <IconButton onClick={() => handleDialogForUpdateOpen(params.row)}>
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
      <div style={{ height: 'auto', width: '100%', backgroundColor: 'white' }}>
        <DataGrid
          rows={scholarships}
          columns={columns}
          disableColumnMenu
          isRowSelectable={() => false}
          autoHeight
          pagination
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 25, 50]}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
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
    </div>
  )
}

export { DataGridBolsas }
