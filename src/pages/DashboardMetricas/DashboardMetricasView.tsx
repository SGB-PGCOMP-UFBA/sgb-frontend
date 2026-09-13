import { MdDashboard } from 'react-icons/md'
import AppLayout from '@/components/app-layout'
import { PageHeader } from '@/components/page-header'
import { PieChartBolsasMestrado } from './components/charts/PieChartBolsasMestrado'
import { PieChartBolsasDoutorado } from './components/charts/PieChartBolsasDoutorado'
import { CardBolsasCapes } from './components/cards/CardBolsasCapes'
import { CardBolsasCnpq } from './components/cards/CardBolsasCnpq'
import { CardBolsasFapesb } from './components/cards/CardBolsasFapesb'
import { ColumnChartHistogramaBolsas } from './components/charts/ColumnChartHistogramaBolsas'
import { TableTotalBolsasPorAgencia } from './components/tables/TableTotalBolsasPorAgencia'
import { AgencyNames } from '@/constants/AgencyNames'

function DashboardMetricasView() {
  return (
    <AppLayout className="space-y-0">
      <PageHeader
        title="Dashboard"
        description="Gráficos e Métricas"
        icon={MdDashboard}
        iconBackgroundClassName="bg-red-400"
      />
      <div className="flex items-center justify-center">
        <div className="grid w-full grid-cols-12">
          <div className="col-span-12 mb-4 pr-4 sm:col-span-6 lg:col-span-2">
            <CardBolsasCapes className="h-full" />
          </div>
          <div className="col-span-12 mb-4 pr-4 sm:col-span-6 lg:col-span-2">
            <CardBolsasCnpq className="h-full" />
          </div>
          <div className="col-span-12 mb-4 pr-4 sm:col-span-6 lg:col-span-2">
            <CardBolsasFapesb className="h-full" />
          </div>
          <div className="col-span-12 mb-4 pr-4 sm:col-span-6 lg:col-span-6">
            <TableTotalBolsasPorAgencia className="h-full" />
          </div>
          <div className="col-span-12 mb-4 pr-4 md:col-span-6 lg:col-span-3">
            <PieChartBolsasMestrado className="h-full" />
          </div>
          <div className="col-span-12 mb-4 pr-4 md:col-span-6 lg:col-span-3">
            <PieChartBolsasDoutorado className="h-full" />
          </div>
          <div className="col-span-12 mb-4 pr-4 md:col-span-6 lg:col-span-3">
            <PieChartBolsasMestrado className="h-full" scholarshipStatus={"FINISHED"} />
          </div>
          <div className="col-span-12 mb-4 pr-4 md:col-span-6 lg:col-span-3">
            <PieChartBolsasDoutorado className="h-full" scholarshipStatus={"FINISHED"} />
          </div>
          <div className="col-span-12 mb-4 pr-4 md:col-span-6 lg:col-span-6">
            <ColumnChartHistogramaBolsas className="h-full" />
          </div>
          {Object.values(AgencyNames).map((agencyName) => {
            return (
              <div
                key={`ColumnChartHistograma_${agencyName}`}
                className="col-span-12 mb-4 pr-4 md:col-span-6 lg:col-span-6"
              >
                <ColumnChartHistogramaBolsas className="h-full" agencyName={agencyName} />
              </div>
            )
          })}
        </div>
      </div>
    </AppLayout>
  )
}

export { DashboardMetricasView }
