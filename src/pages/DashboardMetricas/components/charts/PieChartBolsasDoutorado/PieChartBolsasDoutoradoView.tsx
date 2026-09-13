import Chart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'
import { MdPieChart } from 'react-icons/md'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import type { CountByAgencyAndCourse } from '../../../../../api/scholarship'
import type { ScholarshipStatus } from '../../../../../types'

export interface PieChartBolsasDoutoradoViewProps {
  className?: string
  data: CountByAgencyAndCourse[string]
  total?: number
  isLoading: boolean
  scholarshipStatus?: ScholarshipStatus
}

function PieChartBolsasDoutoradoView(props: PieChartBolsasDoutoradoViewProps) {
  const { data, total, scholarshipStatus } = props

  const options: ApexOptions = {
    labels:  Object.keys(data),
    series: Object.keys(data).map(chave => parseInt(String(data[chave].count))),
    dataLabels: {
      enabled: true,
      formatter: function(_val, opts) {
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
          const total: number = opts.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
          const percentage = (val / total) * 100;
          return percentage.toPrecision(2) + "%";
        }
      },
      style: {
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif'
      }
    }
  }

  const series = Object.keys(data).map(chave => parseInt(String(data[chave].count)))

  return (
    <Card className={props.className}>
      <CardContent className="p-6">
        <div className="flex flex-row items-start justify-between gap-6">
          <div className="mb-4 flex flex-col gap-2">
            <h3 className="mb-4 text-2xl font-bold text-foreground">
              {`Bolsas de Doutorado (${scholarshipStatus ? 'Finalizadas' : 'Ativas'})`}
            </h3>
            <p className="mb-4 text-center text-2xl text-foreground">
              {`Total: ${total} Bolsas`}
            </p>
          </div>
          <Avatar className="h-14 w-14 shrink-0">
            <AvatarFallback className="bg-gray-400 text-white">
              <MdPieChart className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
        </div>
        <Chart options={options} series={series} type="pie" height={350} />
      </CardContent>
    </Card>
  )
}

export { PieChartBolsasDoutoradoView }
