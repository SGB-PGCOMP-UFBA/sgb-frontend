import PropTypes from 'prop-types'
import { Card, CardContent } from '@mui/material'
import { DataGrid, ptBR } from '@mui/x-data-grid'

function TotalBolsasCard(props) {
  const { sx } = props

  const columns = [
    { field: 'id', headerName: 'Modalidade', width: 140, editable: false },
    { field: 'mestrado', headerName: 'Concedidas Mestrado', width: 200, editable: true },
    { field: 'doutorado', headerName: 'Concedidas Doutorado', width: 200, editable: true },
    { field: 'total', headerName: 'Total de Bolsas Concedidas', width: 200, editable: true }
  ]

  const rows = [
    { id: 'CAPES', mestrado: 13, doutorado: 18, total: 31},
    { id: 'FAPESB', mestrado: 11, doutorado: 15, total: 26},
    { id: 'CNPQ', mestrado: 11, doutorado: 15, total: 26}
  ]

  return (
    <Card sx={sx}>
      <CardContent className="h-full">
        <DataGrid
          rows={rows}
          columns={columns}
          density="compact"
          editMode="row"
          hideFooter
          hideFooterPagination
          hideFooterSelectedRowCount
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        />
      </CardContent>
    </Card>
  )
}

TotalBolsasCard.prototypes = {
  sx: PropTypes.node
}

export { TotalBolsasCard }
