import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Icon, IconButton, Tooltip } from '@mui/material'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import { formatBrazilianCurrency, formatDate } from '../../../helpers/formatters'
import { CustomChip } from '../../../components'
import { DialogExclusaoBolsa } from './DialogExclusaoBolsa'

const NOT_INFORMED = 'Não informado'

function DataGridBolsas(props) {
  const { data } = props
  const scholarships = data.enrollments.flatMap(enrollment =>
    enrollment.scholarships.map(scholarship => ({
      ...scholarship,
      student_id: data.id,
      student_email: data.email,
      enrollment_id: enrollment.id,
      enrollment_number: enrollment.enrollment_number,
      enrollment_program: enrollment.enrollment_program,
    }))
  )

  const [pageSize, setPageSize] = useState(5)

  const [selectedScholarship, setSelectedScholarship] = useState(null)
  const [isDialogForScholarshipDeleteOpen, setIsDialogForScholarshipDeleteOpen] = useState(false)

  const handleDialogForDeleteClose = () => {
    setSelectedScholarship(null)
    setIsDialogForScholarshipDeleteOpen(false)
  }

  const handleDialogForDeleteOpen = (value) => {
    setSelectedScholarship(value)
    setIsDialogForScholarshipDeleteOpen(true)
  }

  const columns = [
    {
      field: 'enrollmentNumber',
      headerName: 'Matrícula',
      width: 120,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <p className="overflow-auto">{params.row.enrollment_number.trim()}</p>
      ),
      valueGetter: (params) => params.row.enrollment_number.trim()
    },
    {
      field: 'enrollmentProgram',
      headerName: 'Curso',
      width: 135,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <CustomChip value={params.row.enrollment_program} type="program" />
      ),
      valueGetter: (params) => params.row.enrollment_program
    },
    {
      field: 'agencyName',
      headerName: 'Agência de Fomento',
      width: 120,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <CustomChip value={params.row.agency.name} type="agency" />
      ),
      valueGetter: (params) => params.row.agency.name
    },
    {
      field: 'status',
      headerName: 'Situação da Bolsa',
      width: 170,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <CustomChip value={params.row.status} type="status" />
      ),
      valueGetter: (params) => params.row.status
    },
    {
      field: 'salary',
      headerName: 'Valor da Bolsa',
      width: 120,
      filterable: false,
      sortable: false,
      renderCell: (params) => formatBrazilianCurrency(params.row.salary),
      valueGetter: (params) => formatBrazilianCurrency(params.row.salary)
    },
    {
      field: 'scholarshipStartsAt',
      headerName: 'Data de Início da Bolsa',
      width: 180,
      filterable: false,
      sortable: false,
      renderCell: (params) => formatDate(params.row.scholarship_starts_at),
      valueGetter: (params) => new Date(params.row.scholarship_starts_at)
    },
    {
      field: 'scholarshipEndsAt',
      headerName: 'Data de Término da Bolsa',
      width: 200,
      filterable: false,
      sortable: false,
      renderCell: (params) => formatDate(params.row.scholarship_ends_at),
      valueGetter: (params) => new Date(params.row.scholarship_ends_at)
    },
    {
      field: 'extensionEndsAt',
      headerName: 'Data de Extenção da Bolsa',
      width: 210,
      filterable: false,
      sortable: false,
      renderCell: (params) =>
        params.row.extension_ends_at ? formatDate(params.row.extension_ends_at) : NOT_INFORMED,
      valueGetter: (params) =>
        params.row.extension_ends_at ? new Date(params.row.extension_ends_at) : null
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 180,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <div className="flex items-center gap-x-2 overflow-auto">
          <Tooltip title="Editar Bolsa">
            <IconButton onClick={() => {}}>
              <Icon sx={{ fontSize: 28 }}>edit</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir Bolsa">
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
          rows={scholarships}
          columns={columns}
          disableColumnMenu
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

        {selectedScholarship && (
          <DialogExclusaoBolsa
            onSubmit={props.onDelete}
            item={selectedScholarship}
            isOpen={isDialogForScholarshipDeleteOpen}
            onClose={handleDialogForDeleteClose}
          />
        )}
      </div>
    </div>
  )
}

DataGridBolsas.prototypes = {
  data: PropTypes.node,
  onUpdate: PropTypes.node,
  onDelete: PropTypes.node,
}

export { DataGridBolsas }
