import { useState } from 'react'
import { Icon, IconButton, Tooltip } from '@mui/material'
import { DataGrid, ptBR, GridToolbar } from '@mui/x-data-grid'
import Loading from '../../../components/Loading'
import { formatDate, formatPhone } from '../../../utils/formatters'
import { DialogExclusaoEstudante } from './DialogExclusaoEstudante'
import { DialogEdicaoEstudante } from './DialogEdicaoEstudante'

function DataGridEstudantes({ students, isLoading, onUpdate, onDelete }) {
  const [isDialogForUpdateOpen, setIsDialogForUpdateOpen] = useState(false)
  const [isDialogForDeleteOpen, setIsDialogForDeleteOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [pageSize, setPageSize] = useState(5)

  const handleDialogForDeleteClose = () => {
    setSelectedStudent(null)
    setIsDialogForDeleteOpen(false)
  }

  const handleDialogForDeleteOpen = (data) => {
    setSelectedStudent(data)
    setIsDialogForDeleteOpen(true)
  }

  const handleDialogForUpdateClose = () => {
    setSelectedStudent(null)
    setIsDialogForUpdateOpen(false)
  }

  const handleDialogForUpdateOpen = (data) => {
    setSelectedStudent(data)
    setIsDialogForUpdateOpen(true)
  }

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
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 180,
      renderCell: (params) => (
        <div className="flex items-center gap-x-2 overflow-auto">
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
      {isLoading ? (
        <Loading />
      ) : (
        <div style={{ height: 'auto', width: '100%', backgroundColor: 'white' }}>
          <DataGrid
            rows={students}
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
      )}

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
    </div>
  )
}

export { DataGridEstudantes }
