import PropTypes from 'prop-types'
import Chart from 'react-apexcharts'
import { Avatar, Card, CardContent, Stack, Typography, Icon } from '@mui/material'

function ColumnChartHistogramaBolsasView(props) {
  const { data, agencyName } = props

  const chartTitle = `Histórico de Bolsas Alocadas por Ano ${agencyName? '- ' + agencyName : ''}`

  const years = Object.keys(data)
  const programs = ['MESTRADO', 'DOUTORADO']

  const series = programs.map(program => {
    return {
      name: program,
      data: Object.keys(data).map(year => parseInt(data[year][program]))
    };
  });

  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      height: 430,
      toolbar: {
        show: false
      }
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
      offsetX: -2,
      style: {
        fontSize: '16px',
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
      intersect: false,
      style: {
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif'
      }
    },
    xaxis: {
      categories: years
    }
  }

  return (
    <Card sx={props.sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1} marginBottom={2}>
            <Typography color="text.primary" fontWeight="bold" variant="h5" marginBottom={2}>
              {chartTitle}
            </Typography>
          </Stack>
          <Avatar
            className="bg-gray-400 !bg-gray-400"
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

ColumnChartHistogramaBolsasView.propTypes = {
  sx: PropTypes.node,
  data: PropTypes.node.isRequired,
  isLoading: PropTypes.bool.isRequired,
  agencyName: PropTypes.string,
}

export { ColumnChartHistogramaBolsasView }
