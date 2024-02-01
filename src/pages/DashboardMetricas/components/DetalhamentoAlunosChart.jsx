import PropTypes from 'prop-types'
import Chart from 'react-apexcharts'
import { Avatar, Card, CardContent, Stack, Typography, Icon } from '@mui/material'

function DetalhamentoAlunosChart(props) {
  const { sx } = props

  const options = {
    // configurações do gráfico
  }

  const series = [44, 55, 13, 43, 22]

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1} marginBottom={2}>
            <Typography color="text.primary" fontWeight="bold" variant="h5" marginBottom={2}>
              BOLSAS POR ALUNO
            </Typography>
          </Stack>
          <Avatar
            className="bg-gray-400 !bg-gray-400"
            sx={{
              height: 56,
              width: 56
            }}
          >
            <Icon sx={{ fontSize: 32 }}>incomplete_circle</Icon>
          </Avatar>
        </Stack>
        <Chart options={options} series={series} type="pie" height={350} />
      </CardContent>
    </Card>
  )
}

DetalhamentoAlunosChart.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.node,
  value: PropTypes.string.isRequired
}

export { DetalhamentoAlunosChart }
