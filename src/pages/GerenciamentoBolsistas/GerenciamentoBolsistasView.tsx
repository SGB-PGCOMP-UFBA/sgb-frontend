import {
  Copy,
  Download,
  FilterX
} from 'lucide-react'
import { MdWork } from 'react-icons/md'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import AppLayout from '@/components/app-layout'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { DataGridBolsistas } from './components/DataGridBolsistas'
import Loading from '../../components/loading'
import type { EdicaoBolsistaSubmitValues } from './components/DialogEdicaoBolsista'
import type {
  ScholarshipFilterChangeEvent,
  ScholarshipFilterOptions,
  ScholarshipPageFilters
} from './GerenciamentoBolsistas'
import type { Page, ScholarshipDetailedWithRelations } from '../../types'

export interface GerenciamentoBolsistasViewProps {
  data: Partial<Page<ScholarshipDetailedWithRelations>>
  page: number
  setPage: (page: number) => void
  size: number
  setSize: (size: number) => void
  filters: ScholarshipPageFilters
  setFilters: (event: ScholarshipFilterChangeEvent) => void
  handleResetFilters: () => void
  filterOptions: ScholarshipFilterOptions
  isLoading: boolean
  onEditScholarship: (data: EdicaoBolsistaSubmitValues) => Promise<false | void>
  onDeleteScholarship: (scholarshipId: number) => void
  isDialogForFiltersOpen: boolean
  handleReportDownload: () => void
  handleDialogForFiltersOpen: () => void
  handleDialogForFiltersClose: () => void
  copyScholarshipStudentsEmails: () => void
}

function GerenciamentoBolsistasView(props: GerenciamentoBolsistasViewProps) {
  const { isLoading, data, onEditScholarship, onDeleteScholarship } = props

  const handleSelectChange = (name: string) => (value: string) => {
    props.setFilters({ target: { name, value } })
  }

  return (
    <AppLayout>
      <PageHeader
        title='Bolsistas'
        description='Listagem de Bolsistas do Programa de Pós-Graduação em Computação'
        icon={MdWork}
        iconBackgroundClassName='bg-green-400'
        actions={
          <div className='flex flex-wrap items-center gap-x-3 gap-y-2'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='outline'
                  aria-label='Baixar PDF com dados anuais'
                  className='rounded-lg font-semibold'
                  onClick={() => props.handleReportDownload()}
                >
                  <Download />
                  Relatório Anual
                </Button>
              </TooltipTrigger>
              <TooltipContent>Baixar PDF com dados anuais</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label='Copiar lista de e-mails das bolsas exibidas para o clipboard (separados por ,)'
                  className='rounded-lg bg-indigo-500 font-semibold text-white hover:bg-indigo-600'
                  onClick={() => props.copyScholarshipStudentsEmails()}
                >
                  <Copy />
                  Copiar e-mails
                </Button>
              </TooltipTrigger>
              <TooltipContent className='max-w-xs text-center'>
                Copiar lista de e-mails das bolsas exibidas para o clipboard (separados por ,)
              </TooltipContent>
            </Tooltip>
          </div>
        }
      />
      <div className='!mt-0 w-full rounded border border-gray-300 p-[0.6em]'>
        <div className='flex flex-col gap-4 md:flex-row'>
          <div className='w-full space-y-1.5'>
            <Label htmlFor='input-student-name'>Bolsista</Label>
            <Input
              id='input-student-name'
              name='studentName'
              placeholder='Digite o nome do bolsista'
              onChange={props.setFilters}
              value={props.filters.studentName}
            />
          </div>
          <div className='w-full space-y-1.5'>
            <Label htmlFor='select-order'>Ordenar por</Label>
            <Select
              value={props.filters.orderBy}
              onValueChange={handleSelectChange('orderBy')}
            >
              <SelectTrigger id='select-order'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='DAT_MATRICULA_ASC'>
                  Data da Matrícula ↓
                </SelectItem>
                <SelectItem value='DAT_MATRICULA_DESC'>
                  Data da Matrícula ↑
                </SelectItem>
                <SelectItem value='DAT_DEFESA_ASC'>
                  Previsão de Defesa ↓
                </SelectItem>
                <SelectItem value='DAT_DEFESA_DESC'>
                  Previsão de Defesa ↑
                </SelectItem>
                <SelectItem value='DAT_INICIO_ASC'>
                  Data de Início da Bolsa ↓
                </SelectItem>
                <SelectItem value='DAT_INICIO_DESC'>
                  Data de Início da Bolsa ↑
                </SelectItem>
                <SelectItem value='DAT_TERMINO_ASC'>
                  Data de Término da Bolsa ↓
                </SelectItem>
                <SelectItem value='DAT_TERMINO_DESC'>
                  Data de Término da Bolsa ↑
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='w-full space-y-1.5'>
            <Label htmlFor='select-course'>Curso</Label>
            <Select
              value={props.filters.programName}
              onValueChange={handleSelectChange('programName')}
            >
              <SelectTrigger id='select-course'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {props.filterOptions.programNameFilterList.map(course => (
                  <SelectItem key={course.key} value={course.key}>
                    {course.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='w-full space-y-1.5'>
            <Label htmlFor='select-agencia'>Agência</Label>
            <Select
              value={props.filters.agencyName}
              onValueChange={handleSelectChange('agencyName')}
            >
              <SelectTrigger id='select-agencia'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {props.filterOptions.agencyNameFilterList.map(agency => (
                  <SelectItem key={agency.key} value={agency.key}>
                    {agency.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='w-full space-y-1.5'>
            <Label htmlFor='select-status'>Situação da Bolsa</Label>
            <Select
              value={props.filters.scholarshipStatus}
              onValueChange={handleSelectChange('scholarshipStatus')}
            >
              <SelectTrigger id='select-status'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {props.filterOptions.scholarshipStatusFilterList.map(
                  status => (
                    <SelectItem key={status.key} value={status.key}>
                      {status.value}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
          <div className='w-full space-y-1.5'>
            <Label htmlFor='select-advisor'>Nome do Orientador</Label>
            <Select
              value={props.filters.advisorName}
              onValueChange={handleSelectChange('advisorName')}
            >
              <SelectTrigger id='select-advisor'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {props.filterOptions.advisorNameFilterList.map(advisor => (
                  <SelectItem key={advisor.key} value={advisor.key}>
                    {advisor.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='destructive'
                size='icon'
                aria-label='Resetar Filtros'
                className='shrink-0 self-end'
                onClick={() => props.handleResetFilters()}
              >
                <FilterX />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Resetar Filtros</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <DataGridBolsistas
          page={props.page}
          setPage={props.setPage}
          size={props.size}
          setSize={props.setSize}
          data={data.items}
          filterOptions={props.filterOptions}
          metadata={data.meta}
          onEdit={onEditScholarship}
          onDelete={onDeleteScholarship}
        />
      )}
    </AppLayout>
  )
}

export { GerenciamentoBolsistasView }
