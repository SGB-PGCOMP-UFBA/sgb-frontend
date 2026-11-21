import { useMemo, useState } from 'react'
import { DataTable } from '@/components/data-table'
import type { DataTableColumn } from '@/components/data-table/data-table.type'
import { DialogExclusaoAgencia } from '@/components/dialog-exclusao-agencia'
import { formatDate } from '@/helpers/formatters.helper'
import { MenuAcoesAgencia } from './menu-acoes-agencia'
import type { AgencyDetailed } from '@/types'

export interface DataGridAgenciasProps {
  data: AgencyDetailed[]
  onView: (agency: AgencyDetailed) => void
  onEdit: (agency: AgencyDetailed) => void
  onDelete: (agencyId: number) => void
}

function DataGridAgencias({
  data,
  onView,
  onEdit,
  onDelete,
}: DataGridAgenciasProps) {
  const [deletingAgency, setDeletingAgency] = useState<AgencyDetailed | null>(
    null
  )

  const columns = useMemo<DataTableColumn<AgencyDetailed>[]>(
    () => [
      {
        id: 'name',
        header: 'Nome da Agência',
        minWidth: 170,
        cell: row => <p className='overflow-auto'>{row.name}</p>,
        csv: row => row.name,
      },
      {
        id: 'description',
        header: 'Descrição',
        minWidth: 500,
        cell: row => <p className='overflow-auto'>{row.description}</p>,
        csv: row => row.description,
      },
      {
        id: 'masters_degree_awarded_scholarships',
        header: 'Bolsas Concedidas Para o Mestrado',
        width: 160,
        align: 'center',
        cell: row => (
          <p className='overflow-auto'>
            {row.masters_degree_awarded_scholarships}
          </p>
        ),
        csv: row => row.masters_degree_awarded_scholarships,
      },
      {
        id: 'masters_degree_allocated_scholarships',
        header: 'Bolsas Alocadas no Mestrado',
        width: 150,
        align: 'center',
        cell: row => (
          <p className='overflow-auto'>
            {row.masters_degree_allocated_scholarships}
          </p>
        ),
        csv: row => row.masters_degree_allocated_scholarships,
      },
      {
        id: 'doctorate_degree_awarded_scholarships',
        header: 'Bolsas Concedidas Para o Doutorado',
        width: 160,
        align: 'center',
        cell: row => (
          <p className='overflow-auto'>
            {row.doctorate_degree_awarded_scholarships}
          </p>
        ),
        csv: row => row.doctorate_degree_awarded_scholarships,
      },
      {
        id: 'doctorate_degree_allocated_scholarships',
        header: 'Bolsas Alocadas no Doutorado',
        width: 150,
        align: 'center',
        cell: row => (
          <p className='overflow-auto'>
            {row.doctorate_degree_allocated_scholarships}
          </p>
        ),
        csv: row => row.doctorate_degree_allocated_scholarships,
      },
      {
        id: 'createdAt',
        header: 'Criado Em',
        width: 100,
        cell: row => formatDate(row.created_at),
      },
      {
        id: 'updatedAt',
        header: 'Atualizado Em',
        width: 120,
        cell: row => formatDate(row.updated_at),
      },
      {
        id: 'actions',
        header: 'Ações',
        width: 96,
        cell: row => (
          <MenuAcoesAgencia
            agency={row}
            onView={onView}
            onEdit={onEdit}
            onDelete={setDeletingAgency}
          />
        ),
      },
    ],
    [onView, onEdit]
  )

  return (
    <div>
      <DataTable data={data} columns={columns} csvFileName='agencias' />

      {deletingAgency && (
        <DialogExclusaoAgencia
          isOpen={Boolean(deletingAgency)}
          item={deletingAgency}
          onClose={() => setDeletingAgency(null)}
          onSubmit={onDelete}
        />
      )}
    </div>
  )
}

export { DataGridAgencias }
