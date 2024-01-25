import { IconButton, Tooltip } from '@mui/material'

/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import Icon from '@mui/material/Icon'
import { DataGrid, ptBR, GridToolbar } from '@mui/x-data-grid'
import Loading from '../../../../../components/Loading'
import { formatDate, formatPhone } from '../../../../../utils/formatters'
import { useAppContext } from '../../../../../context/appContext'

export default function DataGridOrientadores() {
  const { advisors, getAdvisors, isLoading } = useAppContext()

  useEffect(() => {
    getAdvisors()
  }, [])

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
            <IconButton>
              <Icon sx={{ fontSize: 28 }}>lock_reset</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar Orientador">
            <IconButton>
              <Icon sx={{ fontSize: 28 }}>edit</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir Orientador">
            <IconButton>
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
            GridCellParams={advisors.scholarship}
            isRowSelectable={() => false}
            rowHeight={45}
            autoHeight
            disableDensitySelector
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          />
        </div>
      )}
    </div>
  )
}
