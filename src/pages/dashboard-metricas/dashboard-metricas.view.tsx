import type { ReactNode } from 'react'
import { MdDashboard } from 'react-icons/md'
import AppLayout from '@/components/app-layout'
import { PageHeader } from '@/components/page-header'
import { AgencyNames } from '@/constants/agency-names.constant'
import { CardBolsasAgencia } from './components/cards/card-bolsas-agencia'
import { ColumnChartHistogramaBolsas } from './components/charts/column-chart-histograma-bolsas'
import { PieChartBolsasPorPrograma } from './components/charts/pie-chart-bolsas-por-programa'
import { TableTotalBolsasPorAgencia } from './components/tables/table-total-bolsas-por-agencia'

function DashboardSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className='space-y-3'>
      <h2 className='text-sm font-semibold uppercase tracking-wide text-muted-foreground'>{title}</h2>
      {children}
    </section>
  )
}

function DashboardMetricasView() {
  return (
    <AppLayout className='space-y-0'>
      <PageHeader
        title='Dashboard'
        description='Gráficos e Métricas'
        icon={MdDashboard}
        iconBackgroundClassName='bg-red-400'
      />
      <div className='space-y-8'>
        <DashboardSection title='Visão geral'>
          <div className='grid gap-4 md:grid-cols-3'>
            <CardBolsasAgencia agency='CAPES' />
            <CardBolsasAgencia agency='CNPQ' />
            <CardBolsasAgencia agency='FAPESB' />
          </div>
          <TableTotalBolsasPorAgencia />
        </DashboardSection>

        <DashboardSection title='Distribuição por agência'>
          <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
            <PieChartBolsasPorPrograma program='MESTRADO' />
            <PieChartBolsasPorPrograma program='DOUTORADO' />
            <PieChartBolsasPorPrograma program='MESTRADO' scholarshipStatus='FINISHED' />
            <PieChartBolsasPorPrograma program='DOUTORADO' scholarshipStatus='FINISHED' />
          </div>
        </DashboardSection>

        <DashboardSection title='Histórico anual'>
          <div className='grid gap-4 lg:grid-cols-2'>
            <ColumnChartHistogramaBolsas />
            {Object.values(AgencyNames).map(agencyName => (
              <ColumnChartHistogramaBolsas key={agencyName} agencyName={agencyName} />
            ))}
          </div>
        </DashboardSection>
      </div>
    </AppLayout>
  )
}

export { DashboardMetricasView }
