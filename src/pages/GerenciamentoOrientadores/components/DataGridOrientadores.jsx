import { useState } from 'react'
import { Icon, IconButton, Tooltip } from '@mui/material'
import { DataGrid, ptBR, GridToolbar } from '@mui/x-data-grid'
import Loading from '../../../components/Loading'
import { formatDate, formatPhone } from '../../../utils/formatters'
import { DialogExclusaoOrientador } from './DialogExclusaoOrientador'
import { DialogEdicaoOrientador } from './DialogEdicaoOrientador'
import { DialogResetarSenhaOrientador } from './DialogResetarSenhaOrientador'

function DataGridOrientadores({ advisors, isLoading, onUpdate, onDelete, onResetPassword }) {
  const [isDialogForUpdateOpen, setIsDialogForUpdateOpen] = useState(false)
  const [isDialogForDeleteOpen, setIsDialogForDeleteOpen] = useState(false)
  const [isDialogForPasswordResetOpen, setIsDialogForPasswordResetOpen] = useState(false)
  const [selectedAdvisor, setSelectedAdvisor] = useState(null)

  const handleDialogForDeleteClose = () => {
    setSelectedAdvisor(null)
    setIsDialogForDeleteOpen(false)
  }

  const handleDialogForDeleteOpen = (data) => {
    setSelectedAdvisor(data)
    setIsDialogForDeleteOpen(true)
  }

  const handleDialogForUpdateClose = () => {
    setSelectedAdvisor(null)
    setIsDialogForUpdateOpen(false)
  }

  const handleDialogForUpdateOpen = (data) => {
    setSelectedAdvisor(data)
    setIsDialogForUpdateOpen(true)
  }

  const handleDialogForPasswordResetClose = () => {
    setSelectedAdvisor(null)
    setIsDialogForPasswordResetOpen(false)
  }

  const handleDialogForPasswordResetOpen = (data) => {
    setSelectedAdvisor(data)
    setIsDialogForPasswordResetOpen(true)
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Nome completo',
      width: 300,
      renderCell: (params) => (
        <div className="flex items-center gap-x-2 overflow-hidden">
          <Icon sx={{ fontSize: 28 }}>person</Icon>
          {params.row.name}
        </div>
      )
    },
    {
      field: 'email',
      headerName: 'E-mail',
      width: 250,
      renderCell: (params) => <p className="overflow-auto">{params.row.email}</p>
    },
    {
      field: 'tax_id',
      headerName: 'CPF',
      width: 150,
      renderCell: (params) => <p className="overflow-auto">{params.row.tax_id}</p>
    },
    {
      field: 'phone_number',
      headerName: 'Telefone',
      width: 150,
      renderCell: (params) => (
        <a
          href={`https://wa.me/${params.row.phone_number}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 underline"
        >
          {formatPhone(params.row.phone_number)}
        </a>
      )
    },
    {
      field: 'created_at',
      headerName: 'Cadastrado Em',
      width: 150,
      renderCell: (params) => formatDate(params.row.created_at)
    },
    {
      field: 'updated_at',
      headerName: 'Atualizado Em',
      width: 150,
      renderCell: (params) => formatDate(params.row.updated_at)
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 180,
      renderCell: (params) => (
        <div className="flex items-center gap-x-2 overflow-auto">
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
          <Tooltip title="Excluir Orientador">
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
      {isLoading ? (
        <Loading />
      ) : (
        <div style={{ height: 'auto', width: '100%', backgroundColor: 'white' }}>
          <DataGrid
            rows={advisors}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
            disableColumnMenu
            components={{ Toolbar: GridToolbar }}
            isRowSelectable={() => false}
            rowHeight={45}
            autoHeight
            disableDensitySelector
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          />
        </div>
      )}

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
    </div>
  )
}

export { DataGridOrientadores }
