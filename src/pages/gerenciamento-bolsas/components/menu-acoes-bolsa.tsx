import { Eye, GraduationCap, Pencil, Trash2, UserRound } from 'lucide-react'
import {
  ActionMenu,
  ActionMenuItem,
  ActionMenuSeparator,
} from '@/components/action-menu'
import type { ScholarshipDetailedWithRelations } from '@/types'

const NO_ADVISOR = 'Bolsa sem orientador vinculado.'
const NO_STUDENT = 'Bolsa sem bolsista vinculado.'

export interface MenuAcoesBolsaProps {
  scholarship: ScholarshipDetailedWithRelations
  onView: (scholarship: ScholarshipDetailedWithRelations) => void
  onViewUser: (userId: number) => void
  onEdit: (scholarship: ScholarshipDetailedWithRelations) => void
  onDelete: (scholarship: ScholarshipDetailedWithRelations) => void
}

function MenuAcoesBolsa({
  scholarship,
  onView,
  onViewUser,
  onEdit,
  onDelete,
}: MenuAcoesBolsaProps) {
  const { student, advisor } = scholarship

  return (
    <ActionMenu label={`Ações para a bolsa de ${student?.name ?? 'bolsista'}`}>
      <ActionMenuItem
        icon={Eye}
        label='Ver detalhes'
        onSelect={() => onView(scholarship)}
      />
      <ActionMenuItem
        icon={GraduationCap}
        label='Ver bolsista'
        disabledReason={student ? undefined : NO_STUDENT}
        onSelect={() => student && onViewUser(student.id)}
      />
      <ActionMenuItem
        icon={UserRound}
        label='Ver orientador'
        disabledReason={advisor ? undefined : NO_ADVISOR}
        onSelect={() => advisor && onViewUser(advisor.id)}
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

export { MenuAcoesBolsa }
