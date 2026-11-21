import { Eye } from 'lucide-react'
import { ActionMenu, ActionMenuItem } from '@/components/action-menu'
import type { StudentDetailedWithFullRelations } from '@/types'

export interface MenuAcoesOrientandoProps {
  student: StudentDetailedWithFullRelations
  onView: (student: StudentDetailedWithFullRelations) => void
}

/** O orientador só consulta: matrícula e bolsa são mantidas pelo estudante. */
function MenuAcoesOrientando({ student, onView }: MenuAcoesOrientandoProps) {
  return (
    <ActionMenu label={`Ações para ${student.name}`}>
      <ActionMenuItem
        icon={Eye}
        label='Ver detalhes'
        onSelect={() => onView(student)}
      />
    </ActionMenu>
  )
}

export { MenuAcoesOrientando }
