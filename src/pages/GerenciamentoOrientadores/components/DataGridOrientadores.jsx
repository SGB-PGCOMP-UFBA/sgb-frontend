import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Icon, IconButton, Tooltip } from '@mui/material'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import { formatCpf, formatPhone } from '../../../helpers/formatters'
import { DialogExclusaoOrientador } from './DialogExclusaoOrientador'
import { DialogEdicaoOrientador } from './DialogEdicaoOrientador'
import { DialogResetarSenhaOrientador } from './DialogResetarSenhaOrientador'
import { formatDate } from '../../../helpers/formatters'
import { CustomChip } from '../../../components'

const NOT_INFORMED = 'Não informado'

function DataGridOrientadores(props) {
  const { data, onUpdate, onDelete, onResetPassword } = props
  const [isDialogForUpdateOpen, setIsDialogForUpdateOpen] = useState(false)
  const [isDialogForDeleteOpen, setIsDialogForDeleteOpen] = useState(false)
  const [isDialogForPasswordResetOpen, setIsDialogForPasswordResetOpen] = useState(false)
  const [selectedAdvisor, setSelectedAdvisor] = useState(null)
  const [pageSize, setPageSize] = useState(10)

  const handleDialogForDeleteClose = () => {
    setSelectedAdvisor(null)
    setIsDialogForDeleteOpen(false)
  }

  const handleDialogForDeleteOpen = (value) => {
    setSelectedAdvisor(value)
    setIsDialogForDeleteOpen(true)
  }

  const handleDialogForUpdateClose = () => {
    setSelectedAdvisor(null)
    setIsDialogForUpdateOpen(false)
  }

  const handleDialogForUpdateOpen = (value) => {
    setSelectedAdvisor(value)
    setIsDialogForUpdateOpen(true)
  }

  const handleDialogForPasswordResetClose = () => {
    setSelectedAdvisor(null)
    setIsDialogForPasswordResetOpen(false)
  }

  const handleDialogForPasswordResetOpen = (value) => {
    setSelectedAdvisor(value)
    setIsDialogForPasswordResetOpen(true)
  }

  const hasEnrollments = (advisor) => {
    return advisor.enrollmentsCount > 0
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Nome completo',
      width: 300,
      renderCell: (params) =>
        <p className="overflow-auto">{ params.row.name ? params.row.name : NOT_INFORMED }</p>,
      valueGetter: (params) => params.row.name
    },
    {
      field: 'status',
      headerName: 'Situação',
      width: 110,
      renderCell: (params) => <CustomChip value={params.row.status} type="status" />,
      valueGetter: (params) => params.row.status
    },
    {
      field: 'email',
      headerName: 'E-mail',
      width: 250,
      renderCell: (params) =>
        <p className="overflow-auto">{ params.row.email ? params.row.email : NOT_INFORMED }</p>,
      valueGetter: (params) => params.row.email
    },
    {
      field: 'tax_id',
      headerName: 'CPF',
      width: 150,
      renderCell: (params) =>
        <p className="overflow-auto">{ params.row.tax_id ? formatCpf(params.row.tax_id) : NOT_INFORMED }</p>,
      valueGetter: (params) => params.row.tax_id
    },
    {
      field: 'phone_number',
      headerName: 'Telefone',
      width: 150,
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
      field: 'count_orientandos',
      headerName: 'Orientandos',
      align:'center',
      width: 130,
      renderCell: (params) => <p className="overflow-auto">{ params.row.enrollmentsCount }</p>,
      valueGetter: (params) => params.row.enrollmentsCount
    },
    {
      field: 'createdAt',
      headerName: 'Criado Em',
      width: 100,
      filterable: false,
      renderCell: (params) => formatDate(params.row.created_at)
    },
    {
      field: 'updatedAt',
      headerName: 'Atualizado Em',
      width: 120,
      filterable: false,
      renderCell: (params) => formatDate(params.row.updated_at)
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 180,
      filterable: false,
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
          isRowSelectable={() => false}
          autoHeight
          pagination
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 25, 50]}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
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
    </div>
  )
}

DataGridOrientadores.prototypes = {
  data: PropTypes.node,
  onUpdate: PropTypes.node,
  onDelete: PropTypes.node,
  onResetPassword: PropTypes.node
}

export { DataGridOrientadores }
