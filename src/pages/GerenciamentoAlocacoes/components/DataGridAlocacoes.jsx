import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Icon, IconButton, Tooltip } from '@mui/material'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import { formatDate } from '../../../helpers/formatters'
import { DialogExclusaoAlocacao } from './DialogExclusaoAlocacao'
import { DialogEdicaoAlocacao } from './DialogEdicaoAlocacao'
import DataGridFooterBar from '../../../components/DataGrid/DataGridFooterBar'

function DataGridAllocacoes(props) {
  const { data, onUpdate, onDelete } = props
  const [isDialogForUpdateOpen, setIsDialogForUpdateOpen] = useState(false)
  const [isDialogForDeleteOpen, setIsDialogForDeleteOpen] = useState(false)
  const [selectedAllocation, setSelectedAllocation] = useState(null)
  const [pageSize, setPageSize] = useState(5)

  const handleDialogForDeleteClose = () => {
    setSelectedAllocation(null)
    setIsDialogForDeleteOpen(false)
  }

  const handleDialogForDeleteOpen = (value) => {
    setSelectedAllocation(value)
    setIsDialogForDeleteOpen(true)
  }

  const handleDialogForUpdateClose = () => {
    setSelectedAllocation(null)
    setIsDialogForUpdateOpen(false)
  }

  const handleDialogForUpdateOpen = (value) => {
    setSelectedAllocation(value)
    setIsDialogForUpdateOpen(true)
  }

  const hasScholarships = (agency) => {
    return agency.doctorate_degree_allocated_scholarships > 0 ||
      agency.masters_degree_allocated_scholarships > 0 ||
      agency.scholarshipsSinceBeginning > 0
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Nome da Alocação',
      minWidth: 300,
      filterable: false,
      sortable: false,
      renderCell: (params) => <p className="overflow-auto">{params.row.name}</p>,
      valueGetter: (params) => params.row.name
    },
    // {
    //   field: 'masters_degree_awarded_scholarships',
    //   headerName: 'Bolsas Concedidas Para o Mestrado',
    //   width: 160,
    //   align: 'center',
    //   filterable: false,
    //   sortable: false,
    //   renderCell: (params) => <p className="overflow-auto">{params.row.masters_degree_awarded_scholarships}</p>,
    //   valueGetter: (params) => params.row.masters_degree_awarded_scholarships
    // },
    {
      field: 'masters_degree_allocated_scholarships',
      headerName: 'Bolsas Alocadas no Mestrado',
      width: 150,
      align: 'center',
      filterable: false,
      sortable: false,
      renderCell: (params) => <p className="overflow-auto">{params.row.masters_degree_allocated_scholarships}</p>,
      valueGetter: (params) => params.row.masters_degree_allocated_scholarships
    },
    // {
    //   field: 'doctorate_degree_awarded_scholarships',
    //   headerName: 'Bolsas Concedidas Para o Doutorado',
    //   width: 160,
    //   align: 'center',
    //   filterable: false,
    //   sortable: false,
    //   renderCell: (params) => <p className="overflow-auto">{params.row.doctorate_degree_awarded_scholarships}</p>,
    //   valueGetter: (params) => params.row.doctorate_degree_awarded_scholarships
    // },
    {
      field: 'doctorate_degree_allocated_scholarships',
      headerName: 'Bolsas Alocadas no Doutorado',
      width: 150,
      align: 'center',
      filterable: false,
      sortable: false,
      renderCell: (params) => <p className="overflow-auto">{params.row.doctorate_degree_allocated_scholarships}</p>,
      valueGetter: (params) => params.row.doctorate_degree_allocated_scholarships
    },
    {
      field: 'createdAt',
      headerName: 'Criado Em',
      width: 100,
      filterable: false,
      sortable: false,
      renderCell: (params) => formatDate(params.row.created_at)
    },
    {
      field: 'updatedAt',
      headerName: 'Atualizado Em',
      width: 120,
      filterable: false,
      sortable: false,
      renderCell: (params) => formatDate(params.row.updated_at)
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 150,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <div className="flex items-center gap-x-2 overflow-auto">
          <Tooltip title="Editar Alocação">
            <IconButton onClick={() => handleDialogForUpdateOpen(params.row)}>
              <Icon sx={{ fontSize: 28 }}>edit</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip
            title={
              hasScholarships(params.row)
                ? 'Não é possível excluir esta alocação'
                : 'Excluir Alocação'
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

      {selectedAllocation && (
        <DialogExclusaoAlocacao
          isOpen={isDialogForDeleteOpen}
          item={selectedAllocation}
          onClose={handleDialogForDeleteClose}
          onSubmit={onDelete}
        />
      )}

      {selectedAllocation && (
        <DialogEdicaoAlocacao
          isOpen={isDialogForUpdateOpen}
          item={selectedAllocation}
          onClose={handleDialogForUpdateClose}
          onSubmit={onUpdate}
        />
      )}
    </div>
  )
}

DataGridAllocacoes.prototypes = {
  data: PropTypes.node,
  onUpdate: PropTypes.node,
  onDelete: PropTypes.node
}

export { DataGridAllocacoes }
