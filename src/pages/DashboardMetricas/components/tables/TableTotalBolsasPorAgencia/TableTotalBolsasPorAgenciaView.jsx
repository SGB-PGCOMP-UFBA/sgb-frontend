import PropTypes from 'prop-types'
import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

function TableTotalBolsasPorAgenciaView(props) {
  const { data, sx } = props

  const getTotalAllocated = (row) => {
    return Number(row.masters_degree_allocated_scholarships) + Number(row.doctorate_degree_allocated_scholarships)
  }

  const getTottalAwarded = (row) => {
    return Number(row.masters_degree_awarded_scholarships) + Number(row.doctorate_degree_awarded_scholarships)
  }

  const getBalance = (row) => {
    return getTottalAwarded(row) - getTotalAllocated(row)
  }

  return (
    <Card sx={sx}>
      <CardContent className="h-full">
        <Typography color="text.primary" fontWeight="bold" variant="h5" marginBottom={0.4}>
          Concessão de Bolsas
        </Typography>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }} align="left">Modalidade</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Concedidas Mestrado</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Alocadas Mestrado</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Concedidas Doutorado</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Alocadas Doutorado</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Total Concedidas</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Total Alocadas</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Bolsas Disponíveis</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell sx={{ fontWeight: 'bold' }} align="left">{row.name}</TableCell>
                  <TableCell align="center">{row.masters_degree_awarded_scholarships}</TableCell>
                  <TableCell align="center">{row.masters_degree_allocated_scholarships}</TableCell>
                  <TableCell align="center">{row.doctorate_degree_awarded_scholarships}</TableCell>
                  <TableCell align="center">{row.doctorate_degree_allocated_scholarships}</TableCell>
                  <TableCell align="center">{getTottalAwarded(row)}</TableCell>
                  <TableCell align="center">{getTotalAllocated(row)}</TableCell>
                  <TableCell align="center">{getBalance(row)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

TableTotalBolsasPorAgenciaView.propTypes = {
  sx: PropTypes.node
}

export { TableTotalBolsasPorAgenciaView }
