import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Button, Icon, IconButton, Tooltip } from '@mui/material'
import { School } from '@mui/icons-material'
import { DataGrid, ptBR, GridToolbar } from '@mui/x-data-grid'
import { formatDate, formatPhone } from '../../../helpers/formatters'
import { DialogExclusaoEstudante } from './DialogExclusaoEstudante'
import { DialogEdicaoEstudante } from './DialogEdicaoEstudante'
import { DialogResetarSenhaEstudante } from './DialogResetarSenhaEstudante'
import StudentProfileView from '../../../components/views/StudentProfileView'

function DataGridEstudantes(props) {
  const { data, onUpdate, onDelete, onResetPassword } = props
  const [isDialogForUpdateOpen, setIsDialogForUpdateOpen] = useState(false)
  const [isDialogForDeleteOpen, setIsDialogForDeleteOpen] = useState(false)
  const [isDialogForPasswordResetOpen, setIsDialogForPasswordResetOpen] = useState(false)
  const [isDialogForVisualizationOpen, setIsDialogForVisualizationOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [pageSize, setPageSize] = useState(10)

  const handleDialogForDeleteClose = () => {
    setSelectedStudent(null)
    setIsDialogForDeleteOpen(false)
  }

  const handleDialogForDeleteOpen = (value) => {
    setSelectedStudent(value)
    setIsDialogForDeleteOpen(true)
  }

  const handleDialogForUpdateClose = () => {
    setSelectedStudent(null)
    setIsDialogForUpdateOpen(false)
  }

  const handleDialogForUpdateOpen = (value) => {
    setSelectedStudent(value)
    setIsDialogForUpdateOpen(true)
  }

  const handleDialogForPasswordResetClose = () => {
    setSelectedStudent(null)
    setIsDialogForPasswordResetOpen(false)
  }

  const handleDialogForPasswordResetOpen = (value) => {
    setSelectedStudent(value)
    setIsDialogForPasswordResetOpen(true)
  }

  const handleCloseStudentProfileView = () => {
    setSelectedStudent(null)
    setIsDialogForVisualizationOpen(false)
  }

  const handleOpenStudentProfileView = (value) => {
    setSelectedStudent(value)
    setIsDialogForVisualizationOpen(true)
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Nome completo',
      width: 360,
      maxWidth: 400,
      renderCell: (params) => (
        <div className="flex items-center gap-x-2 overflow-hidden">
          <Button
            variant="text"
            color="inherit"
            sx={{ textTransform: 'none' }}
            startIcon={<School />}
            onClick={() => handleOpenStudentProfileView(params.row)}
          >
            {params.row.name}
          </Button>
        </div>
      ),
      valueGetter: (params) => params.row.name
    },
    {
      field: 'email',
      headerName: 'E-mail',
      width: 250,
      renderCell: (params) => <p className="overflow-auto">{params.row.email}</p>,
      valueGetter: (params) => params.row.email
    },
    {
      field: 'tax_id',
      headerName: 'CPF',
      width: 150,
      renderCell: (params) => <p className="overflow-auto">{params.row.tax_id}</p>,
      valueGetter: (params) => params.row.tax_id
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
      ),
      valueGetter: (params) => params.row.phone_number
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
      ),
      valueGetter: (params) => params.row.link_to_lattes
    },
    {
      field: 'created_at',
      headerName: 'Cadastrado Em',
      width: 150,
      filterable: false,
      renderCell: (params) => formatDate(params.row.created_at)
    },
    {
      field: 'updated_at',
      headerName: 'Atualizado Em',
      width: 150,
      filterable: false,
      renderCell: (params) => formatDate(params.row.updated_at)
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 175,
      filterable: false,
      renderCell: (params) => (
        <div className="flex items-center gap-x-2 overflow-auto">
          <Tooltip title="Resetar Senha do Estudante">
            <IconButton onClick={() => handleDialogForPasswordResetOpen(params.row)}>
              <Icon sx={{ fontSize: 28 }}>lock_reset</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar Estudante">
            <IconButton onClick={() => handleDialogForUpdateOpen(params.row)}>
              <Icon sx={{ fontSize: 28 }}>edit</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir Estudante">
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

      {selectedStudent && (
        <DialogExclusaoEstudante
          isOpen={isDialogForDeleteOpen}
          item={selectedStudent}
          onClose={handleDialogForDeleteClose}
          onSubmit={onDelete}
        />
      )}

      {selectedStudent && (
        <DialogEdicaoEstudante
          isOpen={isDialogForUpdateOpen}
          item={selectedStudent}
          onClose={handleDialogForUpdateClose}
          onSubmit={onUpdate}
        />
      )}

      {selectedStudent && (
        <DialogResetarSenhaEstudante
          isOpen={isDialogForPasswordResetOpen}
          item={selectedStudent}
          onClose={handleDialogForPasswordResetClose}
          onSubmit={onResetPassword}
        />
      )}

      {selectedStudent && (
        <StudentProfileView
          item={selectedStudent}
          isOpen={isDialogForVisualizationOpen}
          onClose={handleCloseStudentProfileView}
        />
      )}
    </div>
  )
}

DataGridEstudantes.prototypes = {
  data: PropTypes.node,
  onUpdate: PropTypes.node,
  onDelete: PropTypes.node
}

export { DataGridEstudantes }
