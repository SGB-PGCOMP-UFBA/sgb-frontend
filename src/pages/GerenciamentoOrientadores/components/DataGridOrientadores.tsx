import { useState } from 'react'
import { Icon, IconButton, Tooltip } from '@mui/material'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import type {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams
} from '@mui/x-data-grid'
import { formatCpf, formatPhone } from '../../../helpers/formatters'
import { DialogExclusaoOrientador } from './DialogExclusaoOrientador'
import { DialogEdicaoOrientador } from './DialogEdicaoOrientador'
import { DialogResetarSenhaOrientador } from './DialogResetarSenhaOrientador'
import { formatDate } from '../../../helpers/formatters'
import { CustomChip } from '../../../components'
import DataGridFooterBar from '../../../components/DataGrid/DataGridFooterBar'
import { DialogHabilitarPerfilAdministrador } from './DialogHabilitarPerfilAdministrador'
import type { InclusaoOrientadorFormValues } from './DialogInclusaoOrientador'
import type { UpdateAdvisorPayload } from '../../../api/advisor'
import type { ResetPasswordPayload } from '../../../api/password'
import type { AdvisorDetailed } from '../../../types'

const NOT_INFORMED = 'Não informado'

export interface DataGridOrientadoresProps {
  data: AdvisorDetailed[]
  /** Repassada pela View junto das demais acoes; esta grade nao a utiliza. */
  onCreate: (advisor: InclusaoOrientadorFormValues) => void
  onUpdate: (payload: UpdateAdvisorPayload) => void
  onDelete: (advisorId: number) => void
  onChangeProfile: (advisorId: number) => void
  onResetPassword: (payload: ResetPasswordPayload) => void
}

function DataGridOrientadores(props: DataGridOrientadoresProps) {
  const { data, onUpdate, onDelete, onResetPassword, onChangeProfile } = props
  const [isDialogForUpdateOpen, setIsDialogForUpdateOpen] = useState(false)
  const [isDialogForDeleteOpen, setIsDialogForDeleteOpen] = useState(false)
  const [isDialogForAdminProfileOpen, setIsDialogForAdminProfileOpen] = useState(false)
  const [isDialogForPasswordResetOpen, setIsDialogForPasswordResetOpen] = useState(false)
  const [selectedAdvisor, setSelectedAdvisor] = useState<AdvisorDetailed | null>(null)
  const [pageSize, setPageSize] = useState(5)

  const handleDialogForAdminProfileClose = () => {
    setSelectedAdvisor(null)
    setIsDialogForAdminProfileOpen(false)
  }

  const handleDialogForAdminProfileOpen = (value: AdvisorDetailed) => {
    setSelectedAdvisor(value)
    setIsDialogForAdminProfileOpen(true)
  }

  const handleDialogForDeleteClose = () => {
    setSelectedAdvisor(null)
    setIsDialogForDeleteOpen(false)
  }

  const handleDialogForDeleteOpen = (value: AdvisorDetailed) => {
    setSelectedAdvisor(value)
    setIsDialogForDeleteOpen(true)
  }

  const handleDialogForUpdateClose = () => {
    setSelectedAdvisor(null)
    setIsDialogForUpdateOpen(false)
  }

  const handleDialogForUpdateOpen = (value: AdvisorDetailed) => {
    setSelectedAdvisor(value)
    setIsDialogForUpdateOpen(true)
  }

  const handleDialogForPasswordResetClose = () => {
    setSelectedAdvisor(null)
    setIsDialogForPasswordResetOpen(false)
  }

  const handleDialogForPasswordResetOpen = (value: AdvisorDetailed) => {
    setSelectedAdvisor(value)
    setIsDialogForPasswordResetOpen(true)
  }

  const hasEnrollments = (advisor: AdvisorDetailed) => {
    return advisor.enrollmentsCount > 0
  }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome completo',
      width: 300,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, AdvisorDetailed>) =>
        <p className="overflow-auto">{ params.row.name ? params.row.name : NOT_INFORMED }</p>,
      valueGetter: (params: GridValueGetterParams<unknown, AdvisorDetailed>) => params.row.name
    },
    {
      field: 'status',
      headerName: 'Situação',
      width: 110,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, AdvisorDetailed>) => <CustomChip value={params.row.status} type="status" />,
      valueGetter: (params: GridValueGetterParams<unknown, AdvisorDetailed>) => params.row.status
    },
    {
      field: 'email',
      headerName: 'E-mail',
      width: 250,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, AdvisorDetailed>) =>
        <p className="overflow-auto">{ params.row.email ? params.row.email : NOT_INFORMED }</p>,
      valueGetter: (params: GridValueGetterParams<unknown, AdvisorDetailed>) => params.row.email
    },
    {
      field: 'tax_id',
      headerName: 'CPF',
      width: 150,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, AdvisorDetailed>) =>
        <p className="overflow-auto">{ params.row.tax_id ? formatCpf(params.row.tax_id) : NOT_INFORMED }</p>,
      valueGetter: (params: GridValueGetterParams<unknown, AdvisorDetailed>) => params.row.tax_id
    },
    {
      field: 'phone_number',
      headerName: 'Telefone',
      width: 150,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, AdvisorDetailed>) => ( params.row.phone_number ?
        <a
          href={`https://wa.me/${params.row.phone_number}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 underline"
        >
          {formatPhone(params.row.phone_number)}
        </a>
        : <p className="overflow-auto">{NOT_INFORMED}</p>
      ),
      valueGetter: (params: GridValueGetterParams<unknown, AdvisorDetailed>) => params.row.phone_number
    },
    {
      field: 'count_enrollments',
      headerName: 'Bolsistas Orientados',
      align:'center',
      width: 150,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, AdvisorDetailed>) => <p className="overflow-auto">{ params.row.enrollmentsCount }</p>,
      valueGetter: (params: GridValueGetterParams<unknown, AdvisorDetailed>) => params.row.enrollmentsCount
    },
    {
      field: 'createdAt',
      headerName: 'Criado Em',
      width: 100,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, AdvisorDetailed>) => formatDate(params.row.created_at)
    },
    {
      field: 'updatedAt',
      headerName: 'Atualizado Em',
      width: 120,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, AdvisorDetailed>) => formatDate(params.row.updated_at)
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 230,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<unknown, AdvisorDetailed>) => (
        <div className="flex items-center gap-x-2 overflow-auto">
          <Tooltip title={ params.row.has_admin_privileges ? "Desabilitar Perfil de Administrador" : "Habilitar Perfil de Administrador" }>
            <IconButton onClick={() => handleDialogForAdminProfileOpen(params.row)}>
              <Icon sx={{ fontSize: 28, color: params.row.has_admin_privileges ? '#3498db' : 'default'  }}>assignment_ind</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Resetar Senha do Orientador">
            <IconButton onClick={() => handleDialogForPasswordResetOpen(params.row)}>
              <Icon sx={{ fontSize: 28 }}>lock_reset</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar Orientador">
            <IconButton onClick={() => handleDialogForUpdateOpen(params.row)}>
              <Icon sx={{ fontSize: 28 }}>edit</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip
            title={
              hasEnrollments(params.row)
                ? 'Não é possível excluir este(a) orientador(a) pois ele possui bolsistas relacionados a ele.'
                : 'Excluir Orientador(a)'
            }
          >
            <span>
              <IconButton
                onClick={() => handleDialogForDeleteOpen(params.row)}
                disabled={hasEnrollments(params.row)}
              >
                <Icon sx={{ fontSize: 28 }}>delete</Icon>
              </IconButton>
            </span>
          </Tooltip>
        </div>
      )
    }
  ]

  return (
    <div>
      <div style={{ height: 'auto', width: '100%', backgroundColor: 'white' }}>
        <DataGrid
          rows={data}
          columns={columns}
          disableColumnMenu
          components={{ Footer: DataGridFooterBar }}
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
      </div>

      {selectedAdvisor && (
        <DialogExclusaoOrientador
          isOpen={isDialogForDeleteOpen}
          item={selectedAdvisor}
          onClose={handleDialogForDeleteClose}
          onSubmit={onDelete}
        />
      )}

      {selectedAdvisor && (
        <DialogEdicaoOrientador
          isOpen={isDialogForUpdateOpen}
          item={selectedAdvisor}
          onClose={handleDialogForUpdateClose}
          onSubmit={onUpdate}
        />
      )}

      {selectedAdvisor && (
        <DialogResetarSenhaOrientador
          isOpen={isDialogForPasswordResetOpen}
          item={selectedAdvisor}
          onClose={handleDialogForPasswordResetClose}
          onSubmit={onResetPassword}
        />
      )}

      {selectedAdvisor && (
        <DialogHabilitarPerfilAdministrador
          isOpen={isDialogForAdminProfileOpen}
          item={selectedAdvisor}
          onClose={handleDialogForAdminProfileClose}
          onSubmit={onChangeProfile}
        />
      )}
    </div>
  )
}

export { DataGridOrientadores }
