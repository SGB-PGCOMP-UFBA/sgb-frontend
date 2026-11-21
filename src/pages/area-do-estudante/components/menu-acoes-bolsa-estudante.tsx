import { Eye, Pencil, Trash2 } from 'lucide-react'
import {
  ActionMenu,
  ActionMenuItem,
  ActionMenuSeparator,
} from '@/components/action-menu'
import type { StudentScholarship } from '@/helpers/student-records.helper'

export interface MenuAcoesBolsaEstudanteProps {
  scholarship: StudentScholarship
  onView: (scholarship: StudentScholarship) => void
  onEdit: (scholarship: StudentScholarship) => void
  onDelete: (scholarship: StudentScholarship) => void
}

function MenuAcoesBolsaEstudante({
  scholarship,
  onView,
  onEdit,
  onDelete,
}: MenuAcoesBolsaEstudanteProps) {
  const agency = scholarship.agency?.name ?? 'sem agência'

  return (
    <ActionMenu label={`Ações para a bolsa ${agency}`}>
      <ActionMenuItem
        icon={Eye}
        label='Ver detalhes'
        onSelect={() => onView(scholarship)}
      />
      <ActionMenuItem
        icon={Pencil}
        label='Editar'
        onSelect={() => onEdit(scholarship)}
      />
      <ActionMenuSeparator />
      <ActionMenuItem
        icon={Trash2}
        label='Excluir'
        destructive
        onSelect={() => onDelete(scholarship)}
      />
    </ActionMenu>
  )
}

export { MenuAcoesBolsaEstudante }
