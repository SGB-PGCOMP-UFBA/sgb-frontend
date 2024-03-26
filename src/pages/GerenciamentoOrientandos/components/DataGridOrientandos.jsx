import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Icon } from '@mui/material'
import { DataGrid, ptBR, GridToolbar } from '@mui/x-data-grid'
import { formatDate, formatPhone } from '../../../utils/formatters'

function DataGridOrientandos(props) {
  const { data } = props
  const [pageSize, setPageSize] = useState(5)

  const columns = [
    {
      field: 'name',
      headerName: 'Nome completo',
      width: 300,
      renderCell: (params) => (
        <div className="flex items-center gap-x-2 overflow-hidden">
          <Icon sx={{ fontSize: 28 }}>school</Icon>
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
      field: 'link_to_lattes',
      headerName: 'Lattes',
      width: 300,
      renderCell: (params) => (
        <a
          href={`${params.row.link_to_lattes}`}
          target="_blank"
          rel="noreferrer"
          className="center text-blue-500 underline"
        >
          {params.row.link_to_lattes}
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
    }
  ]

  return (
    <div>
      <div style={{ height: 'auto', width: '100%', backgroundColor: 'white' }}>
        <DataGrid
          rows={data}
          columns={columns}
          disableColumnMenu
          components={{ Toolbar: GridToolbar }}
          isRowSelectable={() => false}
          autoHeight
          pagination
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 25, 50]}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </div>
  )
}

DataGridOrientandos.prototypes = {
  data: PropTypes.node,
  onUpdate: PropTypes.node,
  onDelete: PropTypes.node,
  onResetPassword: PropTypes.node
}

export { DataGridOrientandos }
