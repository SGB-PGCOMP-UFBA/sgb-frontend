import { ChevronDown, Download, FileText, FilterX, Search } from 'lucide-react'
import { MdDateRange } from 'react-icons/md'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import AppLayout from '@/components/app-layout'
import { DateField } from '@/components/date-field'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Loading from '@/components/loading'
import { DataGridQuadrienal } from './components/DataGridQuadrienal'
import type { AgencyScholarshipReport } from '@/api/scholarship'
import type { QuadrennialReportFormat } from '@/api/report'

export interface RelatorioQuadrienalViewProps {
  data?: AgencyScholarshipReport[]
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  size: number
  setSize: React.Dispatch<React.SetStateAction<number>>
  isLoading: boolean
  handleResetDates: () => void
  handleReportDownload: (format: QuadrennialReportFormat) => void
  startDate: Date | null
  endDate: Date | null
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>
  minEndDate: Date | null
  handleStartDateChange: (newDate: Date | null) => void
  generateScholarshipsReportByPeriod: () => void
}

function RelatorioQuadrienalView({
  data,
  isLoading,
  handleResetDates,
  handleReportDownload,
  startDate,
  endDate,
  setEndDate,
  minEndDate,
  handleStartDateChange,
  generateScholarshipsReportByPeriod,
}: RelatorioQuadrienalViewProps) {
  const onDownload = (format: QuadrennialReportFormat) => {
    handleReportDownload(format)
  }

  return (
    <AppLayout>
      <PageHeader
        title='Relatório Quadrienal'
        description='Relatório de Bolsas do Programa de Pós-Graduação em Computação Dentro do Período'
        icon={MdDateRange}
        iconBackgroundClassName='bg-orange-400'
        actions={
          <div className='hidden items-center gap-x-4 md:flex'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  id='export-button'
                  className='bg-sky-600 text-white hover:bg-sky-700'
                  disabled={!data || data.length === 0 || isLoading}
                >
                  <Download />
                  Exportar Relatório
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => onDownload('pdf')}>
                  <FileText /> Baixar em PDF
                </DropdownMenuItem>
                {/* <DropdownMenuItem onClick={() => onDownload('xlsx')}>
                  <Table2 /> Baixar em Excel (XLSX)
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        }
      />
      <div className='!mt-0 w-full rounded border border-gray-200 p-[0.6em]'>
        <div className='flex flex-col gap-4 md:flex-row md:items-end'>
          <DateField
            key={startDate ? 'start-date-set' : 'start-date-empty'}
            id='scholarship_starts_at'
            name='scholarship_starts_at'
            label='Data de Início da Bolsa'
            defaultValue={startDate}
            required
            onChange={handleStartDateChange}
            className='flex-1'
          />
          <DateField
            key={endDate ? 'end-date-set' : 'end-date-empty'}
            id='scholarship_ends_at'
            name='scholarship_ends_at'
            label='Data de Término da Bolsa'
            defaultValue={endDate}
            minDate={minEndDate ?? undefined}
            required
            onChange={setEndDate}
            className='flex-1'
          />
          <div className='flex gap-2'>
            <Button
              className='whitespace-nowrap'
              disabled={!startDate || !endDate || isLoading}
              onClick={generateScholarshipsReportByPeriod}
            >
              <Search />
              Gerar
            </Button>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='destructive'
                  aria-label='Resetar Filtros'
                  onClick={handleResetDates}
                >
                  <FilterX />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Resetar Filtros</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : data && data.length > 0 ? (
        <DataGridQuadrienal data={data} />
      ) : (
        <div className='rounded-lg border-2 border-dashed border-gray-200 py-20 text-center'>
          <p className='text-gray-400'>
            Nenhum dado disponível. Selecione as datas e clique em "Gerar
            Relatório".
          </p>
        </div>
      )}
    </AppLayout>
  )
}

export { RelatorioQuadrienalView }
