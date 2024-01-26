import { useState } from 'react'
import { Icon, IconButton, Tooltip } from '@mui/material'
import { DataGrid, ptBR, GridToolbar } from '@mui/x-data-grid'
import Loading from '../../../components/Loading'
import { formatDate } from '../../../utils/formatters'
import { DialogExclusaoAgencia } from './DialogExclusaoAgencia'

function DataGridAgencias({ agencys, isLoading, onRemoveAgency }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedAgency, setSelectedAgency] = useState(null)

  const handleDialogClose = () => {
    setSelectedAgency(null)
    setIsDialogOpen(false)
  }

  const handleDialogOpen = (data) => {
    setSelectedAgency(data)
    setIsDialogOpen(true)
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Nome da Agência',
      minWidth: 200,
      renderCell: (params) => (
        <div className="flex items-center gap-x-2 overflow-hidden">
          <Icon sx={{ fontSize: 28 }}>business</Icon>
          {params.row.name}
        </div>
      )
    },
    {
      field: 'description',
      headerName: 'Descrição',
      minWidth: 600,
      renderCell: (params) => <p className="overflow-auto">{params.row.description}</p>
    },
    {
      field: 'created_at',
      headerName: 'Criado Em',
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
          <Tooltip title="Editar Agência">
            <IconButton>
              <Icon sx={{ fontSize: 28 }}>edit</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir Agência">
            <IconButton onClick={() => handleDialogOpen(params.row)}>
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
            rows={agencys}
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

      {selectedAgency && (
        <DialogExclusaoAgencia
          isOpen={isDialogOpen}
          item={selectedAgency}
          onClose={handleDialogClose}
          onSubmit={onRemoveAgency}
        />
      )}
    </div>
  )
}

export { DataGridAgencias }
