import { useMemo } from 'react'
import { GraduationCap } from 'lucide-react'
import { DataTable } from '@/components/data-table'
import type { DataTableColumn } from '@/components/data-table/data-table.type'
import { formatCpf, formatPhone } from '@/helpers/formatters.helper'
import { MenuAcoesOrientando } from './menu-acoes-orientando'
import type { StudentDetailedWithFullRelations } from '@/types'

const NOT_INFORMED = 'Não informado'

export type OrientandoRow = StudentDetailedWithFullRelations

export interface DataGridOrientandosProps {
  data: OrientandoRow[]
  onView: (student: OrientandoRow) => void
}

function DataGridOrientandos({ data, onView }: DataGridOrientandosProps) {
  const columns = useMemo<DataTableColumn<OrientandoRow>[]>(
    () => [
      {
        id: 'name',
        header: 'Nome completo',
        width: 300,
        cell: (row) => (
          <div className="flex items-center gap-x-2 overflow-hidden">
            <GraduationCap className="!size-6" />
            {row.name}
          </div>
        ),
        csv: (row) => row.name
      },
      {
        id: 'email',
        header: 'E-mail',
        width: 250,
        cell: (row) => <p className="overflow-auto">{row.email ? row.email : NOT_INFORMED}</p>,
        csv: (row) => row.email
      },
      {
        id: 'tax_id',
        header: 'CPF',
        width: 150,
        cell: (row) => <p className="overflow-auto">{row.tax_id ? formatCpf(row.tax_id) : NOT_INFORMED}</p>,
        csv: (row) => row.tax_id
      },
      {
        id: 'phone_number',
        header: 'Celular',
        width: 150,
        cell: (row) => (row.phone_number ?
          <a
            href={`https://wa.me/${row.phone_number}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500"
          >
            {formatPhone(row.phone_number)}
          </a>
          : <p className="overflow-auto">{NOT_INFORMED}</p>
        ),
        csv: (row) => row.phone_number
      },
      {
        id: 'link_to_lattes',
        header: 'Link do Lattes',
        width: 120,
        cell: (row) => (
          <a
            href={`${row.link_to_lattes}`}
            target="_blank"
            rel="noreferrer"
            className="center text-blue-500"
          >
            Lattes
          </a>
        ),
        csv: (row) => row.link_to_lattes
      },
      {
        id: 'scholarships_amount',
        header: 'Quantidade de Bolsas',
        width: 150,
        cell: (row) => row.enrollments.reduce((acc, enrollment) => {
          return acc + enrollment.scholarships.length;
        }, 0)
      },
      {
        id: 'actions',
        header: 'Ações',
        width: 96,
        cell: (row) => <MenuAcoesOrientando student={row} onView={onView} />
      }
    ],
    [onView]
  )

  return (
    <div>
      <DataTable data={data} columns={columns} csvFileName="orientandos" />
    </div>
  )
}

export { DataGridOrientandos }
