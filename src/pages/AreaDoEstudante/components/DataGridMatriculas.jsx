import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Icon, IconButton, Tooltip } from '@mui/material'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import { formatDate, formatPhone } from '../../../helpers/formatters'
import { CustomChip } from '../../../components'
import { DialogExclusaoMatricula } from './DialogExclusaoMatricula'
import { DialogInclusaoBolsa } from './DialogInclusaoBolsa'
import { DialogEdicaoMatricula } from './DialogEdicaoMatricula'

const NOT_INFORMED = 'Não informado'

function DataGridMatriculas(props) {
  const { data } = props
  const enrollments = data.enrollments.flatMap(enrollment => ({
    ...enrollment,
    student_email: data.email,
  })
  )
  const hasOnGoingScholarship = enrollments.some(enrollment => enrollment.scholarships.some(scholarship => scholarship.status === 'ON_GOING' || scholarship.status === 'EXTENDED'))

  const [pageSize, setPageSize] = useState(5)

  const [selectedEnrollment, setSelectedEnrollment] = useState(null)
  const [isDialogForScholarshipCreateOpen, setIsDialogForScholarshipCreateOpen] = useState(false)
  const [isDialogForEnrollmentUpdateOpen, setIsDialogForEnrollmentUpdateOpen] = useState(false)
  const [isDialogForEnrollmentDeleteOpen, setIsDialogForEnrollmentDeleteOpen] = useState(false)

  const handleDialogForScholarshipCreateClose = () => {
    setSelectedEnrollment(null)
    setIsDialogForScholarshipCreateOpen(false)
  }

  const handleDialogForScholarshipCreateOpen = (value) => {
    setSelectedEnrollment(value)
    setIsDialogForScholarshipCreateOpen(true)
  }

  const handleDialogForUpdateClose = () => {
    setSelectedEnrollment(null)
    setIsDialogForEnrollmentUpdateOpen(false)
  }

  const handleDialogForUpdateOpen = (value) => {
    setSelectedEnrollment(value)
    setIsDialogForEnrollmentUpdateOpen(true)
  }

  const handleDialogForDeleteClose = () => {
    setSelectedEnrollment(null)
    setIsDialogForEnrollmentDeleteOpen(false)
  }

  const handleDialogForDeleteOpen = (value) => {
    setSelectedEnrollment(value)
    setIsDialogForEnrollmentDeleteOpen(true)
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
      field: 'advisorName',
      headerName: 'Nome do Orientador',
      width: 250,
      filterable: false,
      sortable: false,
      renderCell: (params) =>
        <p className="custom-scrollbar whitespace-nowrap overflow-x-auto">{params.row.advisor.name}</p>,
      valueGetter: (params) => params.row.advisor.name
    },
    {
      field: 'advisorEmail',
      headerName: 'E-mail do Orientador',
      width: 190,
      filterable: false,
      sortable: false,
      renderCell: (params) =>
        <p className="custom-scrollbar whitespace-nowrap overflow-x-auto">{params.row.advisor.email}</p>,
      valueGetter: (params) => params.row.advisor.email
    },
    {
      field: 'advisorPhoneNumber',
      headerName: 'Celular do Orientador',
      width: 170,
      filterable: false,
      sortable: false,
      renderCell: (params) => (params.row.advisor.phone_number ?
        <a
          href={`https://wa.me/${params.row.advisor.phone_number}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500"
        >
          {formatPhone(params.row.advisor.phone_number)}
        </a>
        : <p className="overflow-auto">{NOT_INFORMED}</p>
      ),
      valueGetter: (params) => params.row.advisor.phone_number
    },
    {
      field: 'advisorStatus',
      headerName: 'Situação do Orientador',
      width: 180,
      filterable: false,
      sortable: false,
      renderCell: (params) =>
        <p className="custom-scrollbar whitespace-nowrap overflow-x-auto">{params.row.advisor.status === 'ACTIVE' ? 'Em exercício' : 'Inativo'}</p>,
      valueGetter: (params) => params.row.advisor.email
    },
    {
      field: 'enrollmentDate',
      headerName: 'Data da Matrícula',
      width: 150,
      filterable: false,
      sortable: false,
      renderCell: (params) => formatDate(params.row.enrollment_date),
      valueGetter: (params) => new Date(params.row.enrollment_date)
    },
    {
      field: 'defensePredictionDate',
      headerName: 'Previsão de Defesa',
      width: 160,
      filterable: false,
      sortable: false,
      renderCell: (params) => formatDate(params.row.defense_prediction_date),
      valueGetter: (params) => new Date(params.row.defense_prediction_date)
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 180,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <div className="flex items-center gap-x-2 overflow-auto">
          <Tooltip title={hasOnGoingScholarship ? "Não é possível adicionar uma nova bolsa, pois você já possui uma bolsa em andamento." : "Adicionar Bolsa"}>
            <span style={{ cursor: hasOnGoingScholarship ? 'not-allowed' : 'pointer' }}>
              <IconButton
                onClick={() => handleDialogForScholarshipCreateOpen(params.row)}
                disabled={hasOnGoingScholarship}
              >
                <Icon sx={{ fontSize: 28, color: hasOnGoingScholarship ? 'grey' : '#2e7d32' }}>bookmark_add</Icon>
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Editar Matrícula">
            <IconButton onClick={() => handleDialogForUpdateOpen(params.row)}>
              <Icon sx={{ fontSize: 28 }}>edit</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir Matrícula">
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
          rows={enrollments}
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

        {isDialogForScholarshipCreateOpen && (
          <DialogInclusaoBolsa
            isOpen={isDialogForScholarshipCreateOpen}
            onClose={handleDialogForScholarshipCreateClose}
            onSubmit={props.onCreateScholarship}
            agencies={props.agencies}
            allocations={props.allocations}
            enrollment={selectedEnrollment}
          />
        )}

        {selectedEnrollment && (
          <DialogEdicaoMatricula
            onSubmit={props.onUpdate}
            item={selectedEnrollment}
            advisors={props.advisors}
            isOpen={isDialogForEnrollmentUpdateOpen}
            onClose={handleDialogForUpdateClose}
          />
        )}

        {selectedEnrollment && (
          <DialogExclusaoMatricula
            onSubmit={props.onDelete}
            item={selectedEnrollment}
            isOpen={isDialogForEnrollmentDeleteOpen}
            onClose={handleDialogForDeleteClose}
          />
        )}
      </div>
    </div>
  )
}

DataGridMatriculas.propTypes = {
  advisors: PropTypes.node.isRequired,
  agencies: PropTypes.node.isRequired,
  data: PropTypes.node.isRequired,
  onCreateScholarship: PropTypes.node,
  onUpdate: PropTypes.node,
  onDelete: PropTypes.node,
}

export { DataGridMatriculas }
