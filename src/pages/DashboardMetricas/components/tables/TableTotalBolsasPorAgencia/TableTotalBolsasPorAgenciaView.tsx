import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import type { AgencyDetailed } from '../../../../../types'

export interface TableTotalBolsasPorAgenciaViewProps {
  className?: string
  data: AgencyDetailed[]
}

function TableTotalBolsasPorAgenciaView(props: TableTotalBolsasPorAgenciaViewProps) {
  const { data, className } = props

  const getTotalAllocated = (row: AgencyDetailed) => {
    return Number(row.masters_degree_allocated_scholarships) + Number(row.doctorate_degree_allocated_scholarships)
  }

  const getTottalAwarded = (row: AgencyDetailed) => {
    return Number(row.masters_degree_awarded_scholarships) + Number(row.doctorate_degree_awarded_scholarships)
  }

  const getBalance = (row: AgencyDetailed) => {
    return getTottalAwarded(row) - getTotalAllocated(row)
  }

  return (
    <Card className={className}>
      <CardContent className="h-full p-6">
        <h3 className="mb-1 text-2xl font-bold text-foreground">
          Concessão de Bolsas
        </h3>
        <Table className="min-w-[650px] [&_td]:p-2 [&_th]:h-10 [&_th]:px-2">
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Modalidade</TableHead>
              <TableHead className="text-center">Concedidas Mestrado</TableHead>
              <TableHead className="text-center">Alocadas Mestrado</TableHead>
              <TableHead className="text-center">Concedidas Doutorado</TableHead>
              <TableHead className="text-center">Alocadas Doutorado</TableHead>
              <TableHead className="text-center">Total Concedidas</TableHead>
              <TableHead className="text-center">Total Alocadas</TableHead>
              <TableHead className="text-center">Bolsas Disponíveis</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="text-left font-bold">{row.name}</TableCell>
                <TableCell className="text-center">{row.masters_degree_awarded_scholarships}</TableCell>
                <TableCell className="text-center">{row.masters_degree_allocated_scholarships}</TableCell>
                <TableCell className="text-center">{row.doctorate_degree_awarded_scholarships}</TableCell>
                <TableCell className="text-center">{row.doctorate_degree_allocated_scholarships}</TableCell>
                <TableCell className="text-center">{getTottalAwarded(row)}</TableCell>
                <TableCell className="text-center">{getTotalAllocated(row)}</TableCell>
                <TableCell className="text-center">{getBalance(row)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export { TableTotalBolsasPorAgenciaView }
