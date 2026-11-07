import { Pie, PieChart } from 'recharts'
import { MdPieChart } from 'react-icons/md'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import type { EnrollmentProgram } from '@/types'
import { ChartCard } from '@/pages/dashboard-metricas/components/charts/chart-card'
import {
  agencyChartConfig,
  formatPercent,
  programChartConfig,
  sumCounts,
  type PieSlice,
} from '@/pages/dashboard-metricas/components/charts/chart-data.util'

export interface PieChartBolsasPorProgramaViewProps {
  program: EnrollmentProgram
  isFinished: boolean
  slices: PieSlice[]
  isLoading: boolean
  className?: string
}

function PieChartBolsasPorProgramaView(props: PieChartBolsasPorProgramaViewProps) {
  const { program, isFinished, slices, isLoading, className } = props
  const total = sumCounts(slices)
  const subtitle = `${isFinished ? 'Finalizadas' : 'Ativas'} · ${total} bolsas`

  return (
    <ChartCard
      className={className}
      title={String(programChartConfig[program].label)}
      subtitle={subtitle}
      icon={MdPieChart}
      isLoading={isLoading}
    >
      {total === 0 ? (
        <p className='flex h-[280px] items-center justify-center text-muted-foreground'>
          Nenhuma bolsa encontrada
        </p>
      ) : (
        <ChartContainer config={agencyChartConfig} className='mx-auto h-[280px] w-full'>
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  nameKey='agency'
                  formatter={(value, name) => (
                    <div className='flex w-full items-center justify-between gap-4'>
                      <span className='text-muted-foreground'>
                        {agencyChartConfig[name as keyof typeof agencyChartConfig]?.label ?? name}
                      </span>
                      <span className='font-mono font-medium tabular-nums text-foreground'>
                        {formatPercent(Number(value), total)}
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Pie
              data={slices}
              dataKey='count'
              nameKey='agency'
              outerRadius='72%'
              label={{ fontSize: 14, fill: 'hsl(var(--foreground))' }}
              labelLine={false}
              isAnimationActive={false}
            />
            <ChartLegend content={<ChartLegendContent nameKey='agency' />} />
          </PieChart>
        </ChartContainer>
      )}
    </ChartCard>
  )
}

export { PieChartBolsasPorProgramaView }
