import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Icon, IconButton, Tooltip } from '@mui/material'
import { DataGrid, ptBR, GridToolbar } from '@mui/x-data-grid'
import { formatDate } from '../../../utils/formatters'
import { CustomChip } from '../../../components'

function DataGridBolsas(props) {
  const [pageSize, setPageSize] = useState(5)
  const { data } = props

  const columns = [
    {
      field: 'row.student.name',
      headerName: 'Estudante',
      width: 300,
      renderCell: (params) => (
        <div className="flex items-center gap-x-2 overflow-hidden">
          <Icon sx={{ fontSize: 28 }}>school</Icon>
          {params.row.student.name}
        </div>
      )
    },
    {
      field: 'row.enrollment.enrollment_date',
      headerName: 'Data da matrícula',
      width: 150,
      renderCell: (params) => formatDate(params.row.enrollment.enrollment_date)
    },
    {
      field: 'row.enrollment.enrollment_number',
      headerName: 'Matrícula',
      width: 150,
      renderCell: (params) => (
        <p className="overflow-auto">{params.row.enrollment.enrollment_number}</p>
      )
    },
    {
      field: 'row.enrollment.enrollment_program',
      headerName: 'Programa',
      width: 150,
      renderCell: (params) => (
        <CustomChip value={params.row.enrollment.enrollment_program} type="program" />
      )
    },
    {
      field: 'row.enrollment.defense_prediction_date',
      headerName: 'Previsão de defesa',
      width: 150,
      renderCell: (params) => formatDate(params.row.enrollment.defense_prediction_date)
    },
    {
      field: 'row.advisor.name',
      headerName: 'Orientador',
      width: 300,
      renderCell: (params) => <p className="overflow-auto">{params.row.advisor.name}</p>
    },
    {
      field: 'row.agency.name',
      headerName: 'Agência',
      width: 150,
      renderCell: (params) => <CustomChip value={params.row.agency.name} type="agency" />
    },
    {
      field: 'scholarship_starts_at',
      headerName: 'Início da bolsa',
      width: 150,
      renderCell: (params) => formatDate(params.row.scholarship_starts_at)
    },
    {
      field: 'scholarship_ends_at',
      headerName: 'Término da bolsa',
      width: 150,
      renderCell: (params) => formatDate(params.row.scholarship_ends_at)
    },
    {
      field: 'extension_ends_at',
      headerName: 'Bolsa extendida até',
      width: 150,
      renderCell: (params) =>
        params.row.extension_ends_at ? formatDate(params.row.extension_ends_at) : 'N/A'
    },
    {
      field: 'row.active',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <CustomChip value={params.row.active ? 'Ativa' : 'Inativa'} type="status" />
      )
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 130,
      renderCell: () => (
        <div className="flex items-center gap-x-2 overflow-auto">
          <Tooltip title="Editar Bolsa">
            <IconButton onClick={() => {}}>
              <Icon sx={{ fontSize: 28 }}>edit</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir Bolsa">
            <IconButton onClick={() => {}}>
              <Icon sx={{ fontSize: 28 }}>delete</Icon>
            </IconButton>
          </Tooltip>
        </div>
      )
    }
  ]

  return (
    <DataGrid
      rows={data}
      columns={columns}
      disableColumnMenu
      autoHeight
      isRowSelectable={() => false}
      components={{ Toolbar: GridToolbar }}
      pagination
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[5, 10, 25, 50]}
      localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
    />
  )
}

DataGridBolsas.prototypes = {
  data: PropTypes.node
}

export { DataGridBolsas }
