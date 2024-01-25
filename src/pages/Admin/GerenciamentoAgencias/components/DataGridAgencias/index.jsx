import { IconButton, Tooltip } from '@mui/material'

/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import Icon from '@mui/material/Icon'
import { DataGrid, ptBR, GridToolbar } from '@mui/x-data-grid'
import Loading from '../../../../../components/Loading'
import { formatDate } from '../../../../../utils/formatters'
import { useAppContext } from '../../../../../context/appContext'
import { DialogExclusaoAgencia } from '../DialogExclusaoAgencia'

export default function DataGridAgencias() {
  const { agencys, getAgencys, isLoading } = useAppContext()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [agencyForRemoving, setAgencyForRemoving] = useState(null)

  const handleDialogClose = () => {
    setAgencyForRemoving(null)
    setIsDialogOpen(false)
  }

  const handleDialogOpen = (data) => {
    setAgencyForRemoving(data)
    setIsDialogOpen(true)
  }

  useEffect(() => {
    getAgencys()
  }, [])

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

          {agencyForRemoving && (
            <DialogExclusaoAgencia
              isOpen={isDialogOpen}
              onClose={handleDialogClose}
              item={agencyForRemoving}
            />
          )}
        </div>
      )}
    </div>
  )
}
