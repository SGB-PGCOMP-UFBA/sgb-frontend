import { Eye, Pencil, Trash2 } from 'lucide-react'
import {
  ActionMenu,
  ActionMenuItem,
  ActionMenuSeparator,
} from '@/components/action-menu'
import {
  AGENCY_DELETE_BLOCKED,
  hasLinkedScholarships,
} from '@/helpers/linked-scholarships.helper'
import type { AgencyDetailed } from '@/types'

export interface MenuAcoesAgenciaProps {
  agency: AgencyDetailed
  onView: (agency: AgencyDetailed) => void
  onEdit: (agency: AgencyDetailed) => void
  onDelete: (agency: AgencyDetailed) => void
}

function MenuAcoesAgencia({
  agency,
  onView,
  onEdit,
  onDelete,
}: MenuAcoesAgenciaProps) {
  return (
    <ActionMenu label={`Ações para ${agency.name}`}>
      <ActionMenuItem
        icon={Eye}
        label='Ver detalhes'
        onSelect={() => onView(agency)}
      />
      <ActionMenuItem
        icon={Pencil}
        label='Editar'
        onSelect={() => onEdit(agency)}
      />
      <ActionMenuSeparator />
      <ActionMenuItem
        icon={Trash2}
        label='Excluir'
        destructive
        disabledReason={
          hasLinkedScholarships(agency) ? AGENCY_DELETE_BLOCKED : undefined
        }
        onSelect={() => onDelete(agency)}
      />
    </ActionMenu>
  )
}

export { MenuAcoesAgencia }
