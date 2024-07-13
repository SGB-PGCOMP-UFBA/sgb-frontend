import PropTypes from 'prop-types'
import { Card, CardContent, Typography } from '@mui/material'
import { DataGrid, ptBR } from '@mui/x-data-grid'

function TableTotalBolsasPorAgenciaView(props) {
  const { sx } = props

  const columns = [
    { field: 'id', headerName: 'Modalidade', width: 140, editable: false, headerAlign: 'center', align: 'center' },
    { field: 'mestrado', headerName: 'Concedidas Mestrado', width: 200, editable: true, headerAlign: 'center', align: 'center' },
    { field: 'doutorado', headerName: 'Concedidas Doutorado', width: 200, editable: true, headerAlign: 'center', align: 'center' },
    { field: 'total_concedidas', headerName: 'Total Concedidas', width: 150, editable: false, headerAlign: 'center', align: 'center' },
    { field: 'total_alocadas', headerName: 'Total Alocadas', width: 150, editable: false, headerAlign: 'center', align: 'center' },
    { field: 'saldo', headerName: 'Saldo', width: 100, editable: false, headerAlign: 'center', align: 'center' }
  ]

  const rows = [
    { id: 'CAPES', mestrado: 14, doutorado: 12, total_concedidas: 26, total_alocadas: 21, saldo: 5},
    { id: 'FAPESB', mestrado: 8, doutorado: 4, total_concedidas: 12, total_alocadas: 7, saldo: 5},
    { id: 'CNPQ', mestrado: 4, doutorado: 2, total_concedidas: 6, total_alocadas: 3, saldo: 3}
  ]

  return (
    <Card sx={sx}>
      <CardContent className="h-full">
        <Typography color="text.primary" fontWeight="bold" variant="h5" marginBottom={0.4}>
          Concessão de Bolsas
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          density="compact"
          disableColumnMenu
          editMode="row"
          hideFooter
          hideFooterPagination
          hideFooterSelectedRowCount
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          sx={{
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold',
            },
            '.MuiDataGrid-columnSeparator': {
              display: 'none',
            },
            '&.MuiDataGrid-root': {
              border: 'none',
            },
          }}
        />
      </CardContent>
    </Card>
  )
}

TableTotalBolsasPorAgenciaView.prototypes = {
  sx: PropTypes.node
}

export { TableTotalBolsasPorAgenciaView }
