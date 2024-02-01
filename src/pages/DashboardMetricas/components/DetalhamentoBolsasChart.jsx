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
      categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007]
    }
  }

  const series = [
    {
      data: [44, 55, 41, 64, 22, 43, 21]
    },
    {
      data: [53, 32, 33, 52, 13, 44, 32]
    }
  ]

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1} marginBottom={2}>
            <Typography color="text.primary" fontWeight="bold" variant="h5" marginBottom={2}>
              BOLSAS POR CURSO E AGÊNCIA
            </Typography>
          </Stack>
          <Avatar
            className="bg-purple-400 !bg-purple-400"
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
