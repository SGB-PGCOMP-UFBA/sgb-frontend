import PropTypes from 'prop-types'
import Chart from 'react-apexcharts'
import { Avatar, Card, CardContent, Stack, Typography, Icon } from '@mui/material'

function DetalhamentoBolsasChart(props) {
  const { sx } = props

  const options = {
    chart: {
      type: 'bar',
      height: 430
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: 'top'
        }
      }
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: '12px',
        colors: ['#fff']
      },
      background: {
        enabled: true,
        foreColor: '#000000',
        padding: 4,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#fff',
        opacity: 0.9,
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45
        }
      }
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['#fff']
    },
    tooltip: {
      shared: true,
      intersect: false
    },
    xaxis: {
      categories: ['CAPES', 'FAPESB', 'CNPQ']
    },
    labels: ['Alunos Bolsistas', 'Alunos Não Bolsistas']
  }

  const series = [
    {
      name: 'Mestrado',
      data: [2, 0, 15]
    },
    {
      name: 'Doutorado',
      data: [1, 0, 4]
    }
  ]

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1} marginBottom={2}>
            <Typography color="text.primary" fontWeight="bold" variant="h5" marginBottom={2}>
              BOLSAS ATIVAS POR CURSO E AGÊNCIA
            </Typography>
          </Stack>
          <Avatar
            className="bg-green-400 !bg-green-400"
            sx={{
              height: 56,
              width: 56
            }}
          >
            <Icon sx={{ fontSize: 32 }}>bar_chart</Icon>
          </Avatar>
        </Stack>
        <Chart options={options} series={series} type="bar" height={350} />
      </CardContent>
    </Card>
  )
}

DetalhamentoBolsasChart.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.node,
  value: PropTypes.string.isRequired
}

export { DetalhamentoBolsasChart }
