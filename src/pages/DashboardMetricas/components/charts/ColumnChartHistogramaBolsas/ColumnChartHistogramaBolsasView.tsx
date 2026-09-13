import Chart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'
import { MdBarChart } from 'react-icons/md'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import type { CountByCourseAndYear } from '@/api/scholarship'
import type { AgencyName, EnrollmentProgram } from '@/types'

export interface ColumnChartHistogramaBolsasViewProps {
  className?: string
  data: CountByCourseAndYear
  isLoading: boolean
  agencyName?: AgencyName
}

function ColumnChartHistogramaBolsasView(props: ColumnChartHistogramaBolsasViewProps) {
  const { data, agencyName } = props

  const chartTitle = `Histórico de Bolsas Alocadas por Ano ${agencyName? '- ' + agencyName : ''}`

  const years = Object.keys(data)
  const programs: EnrollmentProgram[] = ['MESTRADO', 'DOUTORADO']

  const series = programs.map(program => {
    return {
      name: program,
      data: Object.keys(data).map(year => parseInt(String(data[year][program])))
    };
  });

  const options: ApexOptions = {
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
    <Card className={props.className}>
      <CardContent className="p-6">
        <div className="flex flex-row items-start justify-between gap-6">
          <div className="mb-4 flex flex-col gap-2">
            <h3 className="mb-4 text-2xl font-bold text-foreground">
              {chartTitle}
            </h3>
          </div>
          <Avatar className="h-14 w-14 shrink-0">
            <AvatarFallback className="bg-gray-400 text-white">
              <MdBarChart className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
        </div>
        <Chart options={options} series={series} type="bar" height={350} />
      </CardContent>
    </Card>
  )
}

export { ColumnChartHistogramaBolsasView }
