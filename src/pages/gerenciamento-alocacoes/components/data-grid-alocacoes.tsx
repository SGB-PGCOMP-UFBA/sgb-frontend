import { useMemo, useState } from 'react'
import { DataTable } from '@/components/data-table'
import type { DataTableColumn } from '@/components/data-table/data-table.type'
import { DialogExclusaoAlocacao } from '@/components/dialog-exclusao-alocacao'
import { formatDate } from '@/helpers/formatters.helper'
import { MenuAcoesAlocacao } from './menu-acoes-alocacao'
import type { AllocationDetailed } from '@/types'

export interface DataGridAlocacoesProps {
  data: AllocationDetailed[]
  onView: (allocation: AllocationDetailed) => void
  onEdit: (allocation: AllocationDetailed) => void
  onDelete: (allocationId: number) => void
}

function DataGridAlocacoes({
  data,
  onView,
  onEdit,
  onDelete,
}: DataGridAlocacoesProps) {
  const [deletingAllocation, setDeletingAllocation] =
    useState<AllocationDetailed | null>(null)

  const columns = useMemo<DataTableColumn<AllocationDetailed>[]>(
    () => [
      {
        id: 'name',
        header: 'Nome da Alocação',
        minWidth: 300,
        cell: row => <p className='overflow-auto'>{row.name}</p>,
        csv: row => row.name,
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
          <MenuAcoesAlocacao
            allocation={row}
            onView={onView}
            onEdit={onEdit}
            onDelete={setDeletingAllocation}
          />
        ),
      },
    ],
    [onView, onEdit]
  )

  return (
    <div>
      <DataTable data={data} columns={columns} csvFileName='alocacoes' />

      {deletingAllocation && (
        <DialogExclusaoAlocacao
          isOpen={Boolean(deletingAllocation)}
          item={deletingAllocation}
          onClose={() => setDeletingAllocation(null)}
          onSubmit={onDelete}
        />
      )}
    </div>
  )
}

export { DataGridAlocacoes }
