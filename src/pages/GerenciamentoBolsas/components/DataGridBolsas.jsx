import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Icon, IconButton, Tooltip } from '@mui/material'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import { formatDate } from '../../../helpers/formatters'
import { CustomChip } from '../../../components'
import { DialogExclusaoBolsa } from './DialogExclusaoBolsa'
import { DialogContatoBolsista } from './DialogContatoBolsista'

function DataGridBolsas(props) {
  const { data, onDelete } = props

  const [pageSize, setPageSize] = useState(10)
  const [selectedScholarship, setSelectedScholarship] = useState(null)
  const [isDialogForDeleteOpen, setIsDialogForDeleteOpen] = useState(false)
  const [isDialogForContactOpen, setIsDialogForContactOpen] = useState(false)

  const handleDialogForDeleteClose = () => {
    setSelectedScholarship(null)
    setIsDialogForDeleteOpen(false)
  }

  const handleDialogForDeleteOpen = (value) => {
    setSelectedScholarship(value)
    setIsDialogForDeleteOpen(true)
  }

  const handleDialogForContactClose = () => {
    setSelectedScholarship(null)
    setIsDialogForContactOpen(false)
  }

  const handleDialogForContactOpen = (value) => {
    setSelectedScholarship(value)
    setIsDialogForContactOpen(true)
  }

  const columns = [
    {
      field: 'studentName',
      headerName: 'Estudante',
      width: 300,
      renderCell: (params) => params.row.student.name,
      valueGetter: (params) => params.row.student.name
    },
    {
      field: 'enrollmentDate',
      headerName: 'Data da matrícula',
      width: 150,
      filterable: false,
      renderCell: (params) => formatDate(params.row.enrollment.enrollment_date)
    },
    {
      field: 'enrollmentNumber',
      headerName: 'Matrícula',
      width: 150,
      renderCell: (params) => (
        <p className="overflow-auto">{params.row.enrollment.enrollment_number}</p>
      ),
      valueGetter: (params) => params.row.enrollment.enrollment_number
    },
    {
      field: 'enrollmentProgram',
      headerName: 'Curso',
      width: 130,
      renderCell: (params) => (
        <CustomChip value={params.row.enrollment.enrollment_program} type="program" />
      ),
      valueGetter: (params) => params.row.enrollment.enrollment_program
    },
    {
      field: 'defensePredictionDate',
      headerName: 'Previsão de defesa',
      width: 150,
      renderCell: (params) => formatDate(params.row.enrollment.defense_prediction_date)
    },
    {
      field: 'advisorName',
      headerName: 'Orientador',
      width: 300,
      renderCell: (params) => <p className="overflow-auto">{params.row.advisor.name}</p>,
      valueGetter: (params) => params.row.advisor.name
    },
    {
      field: 'agencyName',
      headerName: 'Agência',
      width: 130,
      renderCell: (params) => <CustomChip value={params.row.agency.name} type="agency" />,
      valueGetter: (params) => params.row.agency.name
    },
    {
      field: 'scholarshipStartsAt',
      headerName: 'Início da bolsa',
      width: 150,
      filterable: false,
      renderCell: (params) => formatDate(params.row.scholarship_starts_at)
    },
    {
      field: 'scholarshipEndsAt',
      headerName: 'Término da bolsa',
      width: 150,
      filterable: false,
      renderCell: (params) => formatDate(params.row.scholarship_ends_at)
    },
    {
      field: 'extensionEndsAt',
      headerName: 'Bolsa extendida até',
      width: 150,
      filterable: false,
      renderCell: (params) =>
        params.row.extension_ends_at ? formatDate(params.row.extension_ends_at) : 'N/A'
    },
    {
      field: 'active',
      headerName: 'Status',
      width: 170,
      renderCell: (params) => (
        <CustomChip value={params.row.status} type="status" />
      ),
      valueGetter: (params) => (params.row.status)
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 130,
      filterable: false,
      renderCell: (params) => (
        <div className="flex items-center gap-x-2 overflow-auto">
          <Tooltip title="Abrir Informações de Contato do Bolsista">
            <IconButton onClick={() => handleDialogForContactOpen(params.row)}>
              <Icon sx={{ fontSize: 28 }}>contact_page</Icon>
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
      <div>
        <DataGrid
          rows={data}
          columns={columns}
          autoHeight
          isRowSelectable={() => false}
          pagination
          pageSize={pageSize}
          disableColumnMenu
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 25, 50]}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        />

        {selectedScholarship && (
          <DialogExclusaoBolsa
            isOpen={isDialogForDeleteOpen}
            item={selectedScholarship}
            onClose={handleDialogForDeleteClose}
            onSubmit={onDelete}
          />
        )}

        {selectedScholarship && (
          <DialogContatoBolsista
            isOpen={isDialogForContactOpen}
            item={selectedScholarship}
            onClose={handleDialogForContactClose}
          />
        )}
      </div>
    </div>
  )
}

DataGridBolsas.prototypes = {
  data: PropTypes.node,
  onDelete: PropTypes.node
}

export { DataGridBolsas }
