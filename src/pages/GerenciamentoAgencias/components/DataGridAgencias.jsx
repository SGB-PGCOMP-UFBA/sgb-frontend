import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Icon, IconButton, Tooltip } from '@mui/material'
import { DataGrid, ptBR, GridToolbar } from '@mui/x-data-grid'
import { formatDate } from '../../../utils/formatters'
import { DialogExclusaoAgencia } from './DialogExclusaoAgencia'
import { DialogEdicaoAgencia } from './DialogEdicaoAgencia'

function DataGridAgencias(props) {
  const { data, onUpdate, onDelete } = props
  const [isDialogForUpdateOpen, setIsDialogForUpdateOpen] = useState(false)
  const [isDialogForDeleteOpen, setIsDialogForDeleteOpen] = useState(false)
  const [selectedAgency, setSelectedAgency] = useState(null)
  const [pageSize, setPageSize] = useState(5)

  const handleDialogForDeleteClose = () => {
    setSelectedAgency(null)
    setIsDialogForDeleteOpen(false)
  }

  const handleDialogForDeleteOpen = (value) => {
    setSelectedAgency(value)
    setIsDialogForDeleteOpen(true)
  }

  const handleDialogForUpdateClose = () => {
    setSelectedAgency(null)
    setIsDialogForUpdateOpen(false)
  }

  const handleDialogForUpdateOpen = (value) => {
    setSelectedAgency(value)
    setIsDialogForUpdateOpen(true)
  }

  const hasScholarships = (agency) => {
    return agency.scholarshipsCount > 0
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
            <IconButton onClick={() => handleDialogForUpdateOpen(params.row)}>
              <Icon sx={{ fontSize: 28 }}>edit</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip
            title={
              hasScholarships(params.row)
                ? 'Não é possível excluir esta agência!'
                : 'Excluir Agência'
            }
          >
            <span>
              <IconButton
                onClick={() => handleDialogForDeleteOpen(params.row)}
                disabled={hasScholarships(params.row)}
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

      {selectedAgency && (
        <DialogExclusaoAgencia
          isOpen={isDialogForDeleteOpen}
          item={selectedAgency}
          onClose={handleDialogForDeleteClose}
          onSubmit={onDelete}
        />
      )}

      {selectedAgency && (
        <DialogEdicaoAgencia
          isOpen={isDialogForUpdateOpen}
          item={selectedAgency}
          onClose={handleDialogForUpdateClose}
          onSubmit={onUpdate}
        />
      )}
    </div>
  )
}

DataGridAgencias.prototypes = {
  data: PropTypes.node,
  onUpdate: PropTypes.node,
  onDelete: PropTypes.node
}

export { DataGridAgencias }
