import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { AgencyDetailed } from '@/types'

export interface TableTotalBolsasPorAgenciaViewProps {
  data: AgencyDetailed[]
  isLoading: boolean
  className?: string
}

function getTotalAllocated(row: AgencyDetailed) {
  return Number(row.masters_degree_allocated_scholarships) + Number(row.doctorate_degree_allocated_scholarships)
}

function getTotalAwarded(row: AgencyDetailed) {
  return Number(row.masters_degree_awarded_scholarships) + Number(row.doctorate_degree_awarded_scholarships)
}

function TableTotalBolsasPorAgenciaView(props: TableTotalBolsasPorAgenciaViewProps) {
  const { data, isLoading, className } = props

  return (
    <Card className={className}>
      <CardContent className='p-5'>
        <h3 className='mb-3 text-lg font-semibold text-foreground'>Concessão de Bolsas</h3>
        {isLoading ? (
          <Skeleton className='h-40 w-full' />
        ) : (
          <div className='overflow-x-auto'>
            <Table className='min-w-[640px] [&_td]:px-3 [&_td]:py-2.5 [&_th]:px-3'>
              <TableHeader>
                <TableRow>
                  <TableHead rowSpan={2} className='text-left align-bottom'>Agência</TableHead>
                  <TableHead colSpan={2} className='h-8 border-b text-center'>Mestrado</TableHead>
                  <TableHead colSpan={2} className='h-8 border-b text-center'>Doutorado</TableHead>
                  <TableHead colSpan={2} className='h-8 border-b text-center'>Total</TableHead>
                  <TableHead rowSpan={2} className='text-center align-bottom'>Disponíveis</TableHead>
                </TableRow>
                <TableRow>
                  <TableHead className='h-8 text-center'>Concedidas</TableHead>
                  <TableHead className='h-8 text-center'>Alocadas</TableHead>
                  <TableHead className='h-8 text-center'>Concedidas</TableHead>
                  <TableHead className='h-8 text-center'>Alocadas</TableHead>
                  <TableHead className='h-8 text-center'>Concedidas</TableHead>
                  <TableHead className='h-8 text-center'>Alocadas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='tabular-nums'>
                {data.map(row => {
                  const awarded = getTotalAwarded(row)
                  const allocated = getTotalAllocated(row)

                  return (
                    <TableRow key={row.id}>
                      <TableCell className='text-left font-semibold'>{row.name}</TableCell>
                      <TableCell className='text-center'>{row.masters_degree_awarded_scholarships}</TableCell>
                      <TableCell className='text-center'>{row.masters_degree_allocated_scholarships}</TableCell>
                      <TableCell className='text-center'>{row.doctorate_degree_awarded_scholarships}</TableCell>
                      <TableCell className='text-center'>{row.doctorate_degree_allocated_scholarships}</TableCell>
                      <TableCell className='text-center'>{awarded}</TableCell>
                      <TableCell className='text-center'>{allocated}</TableCell>
                      <TableCell className='text-center font-semibold'>{awarded - allocated}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export { TableTotalBolsasPorAgenciaView }
