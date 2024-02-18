import PropTypes from 'prop-types'
import Chart from 'react-apexcharts'
import { Avatar, Card, CardContent, Stack, Typography, Icon } from '@mui/material'

function DetalhamentoAlunosChart(props) {
  const { sx, data } = props

  const options = {
    labels: ['Alunos Bolsistas', 'Alunos Não Bolsistas']
  }

  const series = [
    parseInt(data.studentswithscholarship, 10),
    parseInt(data.studentswithoutscholarship, 10)
  ]

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
  sx: PropTypes.node,
  data: PropTypes.node.isRequired
}

export { DetalhamentoAlunosChart }
