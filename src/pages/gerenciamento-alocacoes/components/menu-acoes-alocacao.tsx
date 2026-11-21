import { Eye, Pencil, Trash2 } from 'lucide-react'
import {
  ActionMenu,
  ActionMenuItem,
  ActionMenuSeparator,
} from '@/components/action-menu'
import {
  ALLOCATION_DELETE_BLOCKED,
  hasLinkedScholarships,
} from '@/helpers/linked-scholarships.helper'
import type { AllocationDetailed } from '@/types'

export interface MenuAcoesAlocacaoProps {
  allocation: AllocationDetailed
  onView: (allocation: AllocationDetailed) => void
  onEdit: (allocation: AllocationDetailed) => void
  onDelete: (allocation: AllocationDetailed) => void
}

function MenuAcoesAlocacao({
  allocation,
  onView,
  onEdit,
  onDelete,
}: MenuAcoesAlocacaoProps) {
  return (
    <ActionMenu label={`Ações para ${allocation.name}`}>
      <ActionMenuItem
        icon={Eye}
        label='Ver detalhes'
        onSelect={() => onView(allocation)}
      />
      <ActionMenuItem
        icon={Pencil}
        label='Editar'
        onSelect={() => onEdit(allocation)}
      />
      <ActionMenuSeparator />
      <ActionMenuItem
        icon={Trash2}
        label='Excluir'
        destructive
        disabledReason={
          hasLinkedScholarships(allocation) ? ALLOCATION_DELETE_BLOCKED : undefined
        }
        onSelect={() => onDelete(allocation)}
      />
    </ActionMenu>
  )
}

export { MenuAcoesAlocacao }
