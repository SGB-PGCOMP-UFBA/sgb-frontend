import { useState } from 'react'
import { Button, Icon, IconButton, Tooltip } from '@mui/material'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import type {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams
} from '@mui/x-data-grid'
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

/** Linha da grade: a matricula do estudante acrescida do e-mail dele. */
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
  const enrollments = data.enrollments.flatMap(enrollment => ({
    ...enrollment,
    student_email: data.email,
  })
  )
  const hasOnGoingScholarship = enrollments.some(enrollment => enrollment.scholarships.some(scholarship => scholarship.status === 'ON_GOING' || scholarship.status === 'EXTENDED'))

  const [pageSize, setPageSize] = useState(5)

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

  const columns: GridColDef[] = [
    {
      field: 'enrollmentNumber',
      headerName: 'Matrícula',
      width: 120,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, MatriculaRow>) => (
        <p className="overflow-auto">{params.row.enrollment_number.trim()}</p>
      ),
      valueGetter: (params: GridValueGetterParams<unknown, MatriculaRow>) => params.row.enrollment_number.trim()
    },
    {
      field: 'enrollmentProgram',
      headerName: 'Curso',
      width: 135,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, MatriculaRow>) => (
        <CustomChip value={params.row.enrollment_program} type="program" />
      ),
      valueGetter: (params: GridValueGetterParams<unknown, MatriculaRow>) => params.row.enrollment_program
    },
    {
      field: 'advisorName',
      headerName: 'Nome do Orientador',
      width: 250,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, MatriculaRow>) =>
        <p className="custom-scrollbar whitespace-nowrap overflow-x-auto">{params.row.advisor?.name}</p>,
      valueGetter: (params: GridValueGetterParams<unknown, MatriculaRow>) => params.row.advisor?.name
    },
    {
      field: 'advisorEmail',
      headerName: 'E-mail do Orientador',
      width: 190,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, MatriculaRow>) =>
        <p className="custom-scrollbar whitespace-nowrap overflow-x-auto">{params.row.advisor?.email}</p>,
      valueGetter: (params: GridValueGetterParams<unknown, MatriculaRow>) => params.row.advisor?.email
    },
    {
      field: 'advisorPhoneNumber',
      headerName: 'Celular do Orientador',
      width: 170,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, MatriculaRow>) => (params.row.advisor?.phone_number ?
        <a
          href={`https://wa.me/${params.row.advisor?.phone_number}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500"
        >
          {formatPhone(params.row.advisor?.phone_number)}
        </a>
        : <p className="overflow-auto">{NOT_INFORMED}</p>
      ),
      valueGetter: (params: GridValueGetterParams<unknown, MatriculaRow>) => params.row.advisor?.phone_number
    },
    {
      field: 'advisorStatus',
      headerName: 'Situação do Orientador',
      width: 180,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, MatriculaRow>) =>
        <p className="custom-scrollbar whitespace-nowrap overflow-x-auto">{params.row.advisor?.status === 'ACTIVE' ? 'Em exercício' : 'Inativo'}</p>,
      valueGetter: (params: GridValueGetterParams<unknown, MatriculaRow>) => params.row.advisor?.email
    },
    {
      field: 'enrollmentDate',
      headerName: 'Data da Matrícula',
      width: 150,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, MatriculaRow>) => formatDate(params.row.enrollment_date),
      valueGetter: (params: GridValueGetterParams<unknown, MatriculaRow>) => new Date(params.row.enrollment_date)
    },
    {
      field: 'defensePredictionDate',
      headerName: 'Previsão de Defesa',
      width: 160,
      filterable: false,
      sortable: false,
      /* `defense_prediction_date` e anulavel; `?? 0` mantem o comportamento
         anterior, em que `new Date(null)` caia em 01/01/1970. */
      renderCell: (params: GridRenderCellParams<unknown, MatriculaRow>) => formatDate(params.row.defense_prediction_date ?? 0),
      valueGetter: (params: GridValueGetterParams<unknown, MatriculaRow>) => new Date(params.row.defense_prediction_date ?? 0)
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 180,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, MatriculaRow>) => (
        <div className="flex w-full h-full items-center justify-center gap-x-1">
          <Tooltip title={hasOnGoingScholarship ? "Não é possível adicionar uma nova bolsa, pois você já possui uma bolsa em andamento." : "Adicionar Bolsa"}>
            <span style={{ cursor: hasOnGoingScholarship ? 'not-allowed' : 'pointer' }}>
              <Button
                size="small"
                color="primary"
                className="min-w-0 px-2 py-1 normal-case leading-tight"
                onClick={() => handleDialogForScholarshipCreateOpen(params.row)}
                disabled={hasOnGoingScholarship}
              >
                <span className='capitalize font-bold text-center'>Add<br/>Bolsa</span>
              </Button>
            </span>
          </Tooltip>
          <Tooltip title="Editar Matrícula">
            <IconButton onClick={() => handleDialogForUpdateOpen(params.row)}>
              <Icon sx={{ fontSize: 28 }}>edit</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir Matrícula">
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
          rows={enrollments}
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
    </div>
  )
}

export { DataGridMatriculas }
