import PropTypes from 'prop-types'
import Chart from 'react-apexcharts'
import { Avatar, Card, CardContent, Stack, Typography, Icon } from '@mui/material'

function PieChartBolsasMestradoView(props) {
  const { data } = props

  const options = {
    labels:  Object.keys(data),
    series: Object.keys(data).map(chave => parseInt(data[chave].count)),
    dataLabels: {
      enabled: true,
      formatter: function(val, opts) {
        return opts.w.globals.series[opts.seriesIndex];
      },
      style: {
        fontSize: '16px',
        fontFamily: 'Helvetica, Arial, sans-serif'
      }
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function(val, opts) {
          var total = opts.globals.seriesTotals.reduce((a, b) => a + b, 0);
          var percentage = (val / total) * 100;
          return percentage.toPrecision(4) + "%";
        }
      },
      style: {
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif'
      }
    }
  }

  const series = Object.keys(data).map(chave => parseInt(data[chave].count))

  return (
    <Card sx={props.sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1} marginBottom={2}>
            <Typography color="text.primary" fontWeight="bold" variant="h5" marginBottom={2}>
              Bolsas de Mestrado (Ativas)
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

PieChartBolsasMestradoView.prototypes = {
  sx: PropTypes.node,
  data: PropTypes.node.isRequired,
  isLoading: PropTypes.bool.isRequired
}

export { PieChartBolsasMestradoView }
