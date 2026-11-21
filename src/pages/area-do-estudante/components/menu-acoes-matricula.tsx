import { CirclePlus, Eye, Pencil, Trash2 } from 'lucide-react'
import {
  ActionMenu,
  ActionMenuItem,
  ActionMenuSeparator,
} from '@/components/action-menu'
import type { EnrollmentDetailedWithFullRelations } from '@/types'

export interface MenuAcoesMatriculaProps {
  enrollment: EnrollmentDetailedWithFullRelations
  /** Motivo de não poder incluir bolsa, quando já há uma em andamento. */
  addScholarshipDisabledReason?: string
  onView: (enrollment: EnrollmentDetailedWithFullRelations) => void
  onEdit: (enrollment: EnrollmentDetailedWithFullRelations) => void
  onAddScholarship: (enrollment: EnrollmentDetailedWithFullRelations) => void
  onDelete: (enrollment: EnrollmentDetailedWithFullRelations) => void
}

function MenuAcoesMatricula({
  enrollment,
  addScholarshipDisabledReason,
  onView,
  onEdit,
  onAddScholarship,
  onDelete,
}: MenuAcoesMatriculaProps) {
  return (
    <ActionMenu
      label={`Ações para a matrícula ${enrollment.enrollment_number.trim()}`}
    >
      <ActionMenuItem
        icon={Eye}
        label='Ver detalhes'
        onSelect={() => onView(enrollment)}
      />
      <ActionMenuItem
        icon={Pencil}
        label='Editar'
        onSelect={() => onEdit(enrollment)}
      />
      <ActionMenuItem
        icon={CirclePlus}
        label='Adicionar bolsa'
        disabledReason={addScholarshipDisabledReason}
        onSelect={() => onAddScholarship(enrollment)}
      />
      <ActionMenuSeparator />
      <ActionMenuItem
        icon={Trash2}
        label='Excluir'
        destructive
        onSelect={() => onDelete(enrollment)}
      />
    </ActionMenu>
  )
}

export { MenuAcoesMatricula }
