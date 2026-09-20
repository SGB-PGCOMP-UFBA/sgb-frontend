import { MdDashboard } from 'react-icons/md'
import AppLayout from '@/components/app-layout'
import { PageHeader } from '@/components/page-header'
import { PieChartBolsasMestrado } from './components/charts/pie-chart-bolsas-mestrado'
import { PieChartBolsasDoutorado } from './components/charts/pie-chart-bolsas-doutorado'
import { CardBolsasCapes } from './components/cards/card-bolsas-capes'
import { CardBolsasCnpq } from './components/cards/card-bolsas-cnpq'
import { CardBolsasFapesb } from './components/cards/card-bolsas-fapesb'
import { ColumnChartHistogramaBolsas } from './components/charts/column-chart-histograma-bolsas'
import { TableTotalBolsasPorAgencia } from './components/tables/table-total-bolsas-por-agencia'
import { AgencyNames } from '@/constants/agency-names.constant'

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
