import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Icon, IconButton, Tooltip } from '@mui/material'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import { formatDate, formatPhone } from '../../../helpers/formatters'
import { CustomChip } from '../../../components'
import { DialogExclusaoBolsa } from './DialogExclusaoBolsa'
import { DialogEdicaoBolsista } from './DialogEdicaoBolsista'
import './styles.css';

const NOT_INFORMED = 'Não informado'

function DataGridBolsistas(props) {
  const { data, metadata, onEdit, onDelete } = props

  const [paginationModel, setPaginationModel] = useState({
    pageSize: metadata.itemsPerPage,
    page: metadata.currentPage - 1
  })

  const handlePaginationChange = (newPaginationModel) => {
    setPaginationModel({
      page: newPaginationModel.currentPage - 1,
      pageSize: newPaginationModel.itemsPerPage
    })

    props.setPage(newPaginationModel.currentPage)
    props.setSize(newPaginationModel.itemsPerPage)
  }

  const [selectedScholarship, setSelectedScholarship] = useState(null)
  const [isDialogForDeleteOpen, setIsDialogForDeleteOpen] = useState(false)
  const [isDialogForEditionOpen, setIsDialogForEditionOpen] = useState(false)

  const handleDialogForDeleteClose = () => {
    setSelectedScholarship(null)
    setIsDialogForDeleteOpen(false)
  }

  const handleDialogForDeleteOpen = (value) => {
    setSelectedScholarship(value)
    setIsDialogForDeleteOpen(true)
  }

  const handleDialogForEditionClose = () => {
    setSelectedScholarship(null)
    setIsDialogForEditionOpen(false)
  }

  const handleDialogForEditionOpen = (value) => {
    setSelectedScholarship(value)
    setIsDialogForEditionOpen(true)
  }

  const columns = [
    {
      field: 'enrollmentNumber',
      headerName: 'Matrícula',
      width: 100,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <p className="overflow-auto">{params.row.enrollment.enrollment_number}</p>
      ),
      valueGetter: (params) => params.row.enrollment.enrollment_number
    },
    {
      field: 'enrollmentProgram',
      headerName: 'Curso',
      width: 140,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <CustomChip value={params.row.enrollment.enrollment_program} type="program" />
      ),
      valueGetter: (params) => params.row.enrollment.enrollment_program
    },
    {
      field: 'studentName',
      headerName: 'Nome do Bolsista',
      width: 220,
      filterable: false,
      sortable: false,
      renderCell: (params) =>
        <p className="custom-scrollbar whitespace-nowrap overflow-x-auto">{params.row.student.name}</p>,
      valueGetter: (params) => params.row.student.name
    },
    {
      field: 'student_phone_number',
      headerName: 'Telefone do Bolsista',
      width: 130,
      filterable: false,
      sortable: false,
      renderCell: (params) => ( params.row.student.phone_number ?
        <a
          href={`https://wa.me/${params.row.student.phone_number}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 underline"
        >
          {formatPhone(params.row.student.phone_number)}
        </a>
        : <p className="overflow-auto">{NOT_INFORMED}</p>
      ),
      valueGetter: (params) => params.row.student.phone_number
    },
    {
      field: 'student_email',
      headerName: 'E-mail do Bolsista',
      width: 200,
      filterable: false,
      sortable: false,
      renderCell: (params) =>
        <p className="custom-scrollbar whitespace-nowrap overflow-x-auto">{ params.row.student.email ? params.row.student.email : NOT_INFORMED }</p>,
      valueGetter: (params) => params.row.student.email
    },
    {
      field: 'agencyName',
      headerName: 'Agência',
      width: 140,
      filterable: false,
      sortable: false,
      renderCell: (params) => <CustomChip value={params.row.agency.name} type="agency" />,
      valueGetter: (params) => params.row.agency.name
    },
    {
      field: 'advisorName',
      headerName: 'Nome do Orientador',
      width: 220,
      filterable: false,
      sortable: false,
      renderCell: (params) =>
        <p className="custom-scrollbar whitespace-nowrap overflow-x-auto">{params.row.advisor.name}</p>,
      valueGetter: (params) => params.row.advisor.name
    },
    {
      field: 'active',
      headerName: 'Status',
      width: 170,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <CustomChip value={params.row.status} type="status" />
      ),
      valueGetter: (params) => (params.row.status)
    },
    {
      field: 'enrollmentDate',
      headerName: 'Data da Matrícula',
      width: 100,
      filterable: false,
      sortable: false,
      renderCell: (params) => formatDate(params.row.enrollment.enrollment_date),
      valueGetter: (params) => new Date(params.row.enrollment.enrollment_date)
    },
    {
      field: 'defensePredictionDate',
      headerName: 'Previsão de Defesa',
      width: 100,
      filterable: false,
      sortable: false,
      renderCell: (params) => formatDate(params.row.enrollment.defense_prediction_date),
      valueGetter: (params) => new Date(params.row.enrollment.defense_prediction_date)
    },
    {
      field: 'scholarshipStartsAt',
      headerName: 'Início da Bolsa',
      width: 100,
      filterable: false,
      sortable: false,
      renderCell: (params) => formatDate(params.row.scholarship_starts_at),
      valueGetter: (params) => new Date(params.row.scholarship_starts_at)
    },
    {
      field: 'scholarshipEndsAt',
      headerName: 'Término da Bolsa',
      width: 100,
      filterable: false,
      sortable: false,
      renderCell: (params) => formatDate(params.row.scholarship_ends_at),
      valueGetter: (params) => new Date(params.row.scholarship_ends_at)
    },
    {
      field: 'extensionEndsAt',
      headerName: 'Extenção da Bolsa',
      width: 100,
      filterable: false,
      sortable: false,
      renderCell: (params) =>
        params.row.extension_ends_at ? formatDate(params.row.extension_ends_at) : 'N/A',
      valueGetter: (params) =>
        params.row.extension_ends_at ? new Date(params.row.extension_ends_at) : null
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 130,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <div className="flex items-center gap-x-2 overflow-auto">
          <Tooltip title="Atualizar Bolsista">
            <IconButton onClick={() => handleDialogForEditionOpen(params.row)}>
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
      <div>
        <DataGrid
          rows={data}
          columns={columns}
          autoHeight
          disableColumnMenu
          isRowSelectable={() => false}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          pagination
          paginationMode="server"
          page={paginationModel.page}
          pageSize={paginationModel.pageSize}
          rowCount={metadata.totalItems}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          onPageChange={(newPage) => handlePaginationChange({ currentPage: newPage + 1, itemsPerPage: paginationModel.pageSize })}
          onPageSizeChange={(newPageSize) => handlePaginationChange({ currentPage: 1, itemsPerPage: newPageSize })}
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
            item={selectedScholarship}
            isOpen={isDialogForDeleteOpen}
            onSubmit={onDelete}
            onClose={handleDialogForDeleteClose}
          />
        )}

        {selectedScholarship && (
          <DialogEdicaoBolsista
            item={selectedScholarship}
            isOpen={isDialogForEditionOpen}
            onSubmit={onEdit}
            onClose={handleDialogForEditionClose}
            filterOptions={props.filterOptions}
          />
        )}
      </div>
    </div>
  )
}

DataGridBolsistas.prototypes = {
  data: PropTypes.node,
  filterOptions: PropTypes.node,
  metadata: PropTypes.node,
  onEdit: PropTypes.node,
  onDelete: PropTypes.node
}

export { DataGridBolsistas }
