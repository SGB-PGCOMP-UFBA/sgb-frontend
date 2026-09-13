import { useMemo, useState } from 'react'
import { ActionIconButton } from '@/components/action-icon-button'
import { Pencil, Trash2 } from 'lucide-react'
import { DataTable } from '@/components/data-table'
import type { DataTableColumn } from '@/components/data-table/types'
import { formatDate } from '../../../helpers/formatters'
import { DialogExclusaoAlocacao } from './DialogExclusaoAlocacao'
import { DialogEdicaoAlocacao } from './DialogEdicaoAlocacao'
import type { InclusaoAlocacaoFormValues } from './DialogInclusaoAlocacao'
import type { UpdateAllocationPayload } from '../../../api/allocation'
import type { AllocationDetailed } from '../../../types'

export interface DataGridAllocacoesProps {
  data: AllocationDetailed[]
  onCreate: (values: InclusaoAlocacaoFormValues) => void
  onUpdate: (allocationId: number, allocation: UpdateAllocationPayload) => void
  onDelete: (allocationId: number) => void
}

function DataGridAllocacoes(props: DataGridAllocacoesProps) {
  const { data, onUpdate, onDelete } = props
  const [isDialogForUpdateOpen, setIsDialogForUpdateOpen] = useState(false)
  const [isDialogForDeleteOpen, setIsDialogForDeleteOpen] = useState(false)
  const [selectedAllocation, setSelectedAllocation] = useState<AllocationDetailed | null>(null)

  const handleDialogForDeleteClose = () => {
    setSelectedAllocation(null)
    setIsDialogForDeleteOpen(false)
  }

  const handleDialogForDeleteOpen = (value: AllocationDetailed) => {
    setSelectedAllocation(value)
    setIsDialogForDeleteOpen(true)
  }

  const handleDialogForUpdateClose = () => {
    setSelectedAllocation(null)
    setIsDialogForUpdateOpen(false)
  }

  const handleDialogForUpdateOpen = (value: AllocationDetailed) => {
    setSelectedAllocation(value)
    setIsDialogForUpdateOpen(true)
  }

  const hasScholarships = (agency: AllocationDetailed) => {
    return agency.doctorate_degree_allocated_scholarships > 0 ||
      agency.masters_degree_allocated_scholarships > 0 ||
      agency.scholarshipsSinceBeginning > 0
  }

  const columns = useMemo<DataTableColumn<AllocationDetailed>[]>(
    () => [
      {
        id: 'name',
        header: 'Nome da Alocação',
        minWidth: 300,
        cell: (row) => <p className="overflow-auto">{row.name}</p>,
        csv: (row) => row.name
      },
      {
        id: 'masters_degree_allocated_scholarships',
        header: 'Bolsas Alocadas no Mestrado',
        width: 150,
        align: 'center',
        cell: (row) => <p className="overflow-auto">{row.masters_degree_allocated_scholarships}</p>,
        csv: (row) => row.masters_degree_allocated_scholarships
      },
      {
        id: 'doctorate_degree_allocated_scholarships',
        header: 'Bolsas Alocadas no Doutorado',
        width: 150,
        align: 'center',
        cell: (row) => <p className="overflow-auto">{row.doctorate_degree_allocated_scholarships}</p>,
        csv: (row) => row.doctorate_degree_allocated_scholarships
      },
      {
        id: 'createdAt',
        header: 'Criado Em',
        width: 100,
        cell: (row) => formatDate(row.created_at)
      },
      {
        id: 'updatedAt',
        header: 'Atualizado Em',
        width: 120,
        cell: (row) => formatDate(row.updated_at)
      },
      {
        id: 'actions',
        header: 'Ações',
        width: 150,
        cell: (row) => (
          <div className="flex items-center gap-x-2 overflow-auto">
            <ActionIconButton
              label="Editar Alocação"
              icon={Pencil}
              onClick={() => handleDialogForUpdateOpen(row)}
            />
            <ActionIconButton
              label={'Excluir Alocação'}
              disabledReason={hasScholarships(row) ? 'Não é possível excluir esta alocação' : undefined}
              icon={Trash2}
              onClick={() => handleDialogForDeleteOpen(row)}
            />
          </div>
        )
      }
    ],
    []
  )

  return (
    <div>
      <DataTable data={data} columns={columns} csvFileName="alocacoes" />

      {selectedAllocation && (
        <DialogExclusaoAlocacao
          isOpen={isDialogForDeleteOpen}
          item={selectedAllocation}
          onClose={handleDialogForDeleteClose}
          onSubmit={onDelete}
        />
      )}

      {selectedAllocation && (
        <DialogEdicaoAlocacao
          isOpen={isDialogForUpdateOpen}
          item={selectedAllocation}
          onClose={handleDialogForUpdateClose}
          onSubmit={onUpdate}
        />
      )}
    </div>
  )
}

export { DataGridAllocacoes }
