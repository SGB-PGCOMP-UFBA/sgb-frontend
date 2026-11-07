import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'
import { MdBarChart } from 'react-icons/md'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import type { AgencyName } from '@/types'
import { ChartCard } from '@/pages/dashboard-metricas/components/charts/chart-card'
import {
  ENROLLMENT_PROGRAMS,
  programChartConfig,
  type HistogramRow,
} from '@/pages/dashboard-metricas/components/charts/chart-data.util'

export interface ColumnChartHistogramaBolsasViewProps {
  rows: HistogramRow[]
  isLoading: boolean
  agencyName?: AgencyName
  className?: string
}

function ColumnChartHistogramaBolsasView(props: ColumnChartHistogramaBolsasViewProps) {
  const { rows, isLoading, agencyName, className } = props
  const subtitle = agencyName ?? 'Todas as agências'

  return (
    <ChartCard
      className={className}
      title='Bolsas alocadas por ano'
      subtitle={subtitle}
      icon={MdBarChart}
      isLoading={isLoading}
    >
      {rows.length === 0 ? (
        <p className='flex h-[300px] items-center justify-center text-muted-foreground'>
          Nenhuma bolsa encontrada
        </p>
      ) : (
        <ChartContainer config={programChartConfig} className='h-[300px] w-full'>
          <BarChart data={rows} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis dataKey='year' tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={32} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            {ENROLLMENT_PROGRAMS.map(program => (
              <Bar
                key={program}
                dataKey={program}
                stackId='bolsas'
                fill={`var(--color-${program})`}
                isAnimationActive={false}
              >
                <LabelList
                  dataKey={program}
                  position='center'
                  fontSize={12}
                  fill='hsl(var(--primary-foreground))'
                  formatter={(value: number) => (value > 0 ? value : '')}
                />
              </Bar>
            ))}
          </BarChart>
        </ChartContainer>
      )}
    </ChartCard>
  )
}

export { ColumnChartHistogramaBolsasView }
