import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Icon } from '@mui/material'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import { formatCpf, formatDate, formatPhone } from '../../../helpers/formatters'
import DataGridFooterBar from '../../../components/DataGrid/DataGridFooterBar'

const NOT_INFORMED = 'Não informado'

function DataGridOrientandos(props) {
  const { data } = props
  const [pageSize, setPageSize] = useState(10)

  const columns = [
    {
      field: 'name',
      headerName: 'Nome completo',
      width: 300,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <div className="flex items-center gap-x-2 overflow-hidden">
          <Icon sx={{ fontSize: 28 }}>school</Icon>
          {params.row.name}
        </div>
      ),
      valueGetter: (params) => params.row.name
    },
    {
      field: 'email',
      headerName: 'E-mail',
      width: 250,
      filterable: false,
      sortable: false,
      renderCell: (params) =>
        <p className="overflow-auto">{ params.row.email ? params.row.email : NOT_INFORMED }</p>,
      valueGetter: (params) => params.row.email
    },
    {
      field: 'tax_id',
      headerName: 'CPF',
      width: 150,
      filterable: false,
      sortable: false,
      renderCell: (params) =>
        <p className="overflow-auto">{ params.row.tax_id ? formatCpf(params.row.tax_id) : NOT_INFORMED }</p>,
      valueGetter: (params) => params.row.tax_id
    },
    {
      field: 'phone_number',
      headerName: 'Telefone',
      width: 150,
      filterable: false,
      sortable: false,
      renderCell: (params) => ( params.row.phone_number ?
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
      valueGetter: (params) => params.row.phone_number
    },
    {
      field: 'link_to_lattes',
      headerName: 'Lattes',
      width: 300,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <a
          href={`${params.row.link_to_lattes}`}
          target="_blank"
          rel="noreferrer"
          className="center text-blue-500 underline"
        >
          {params.row.link_to_lattes}
        </a>
      ),
      valueGetter: (params) => params.row.link_to_lattes
    },
    {
      field: 'created_at',
      headerName: 'Cadastrado Em',
      width: 150,
      filterable: false,
      sortable: false,
      renderCell: (params) => formatDate(params.row.created_at)
    },
    {
      field: 'updated_at',
      headerName: 'Atualizado Em',
      width: 150,
      filterable: false,
      sortable: false,
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
