import { Eye, Pencil, Trash2, UserCheck, UserX } from 'lucide-react'
import {
  ActionMenu,
  ActionMenuItem,
  ActionMenuSeparator,
} from '@/components/action-menu'
import type { ManagedUser } from '@/types'

export interface MenuAcoesUsuarioProps {
  user: ManagedUser
  disabledReason?: string
  onView: (user: ManagedUser) => void
  onEdit: (user: ManagedUser) => void
  onToggleStatus: (user: ManagedUser) => void
  onDelete: (user: ManagedUser) => void
}

function MenuAcoesUsuario({
  user,
  disabledReason,
  onView,
  onEdit,
  onToggleStatus,
  onDelete,
}: MenuAcoesUsuarioProps) {
  const isActive = user.status === 'ACTIVE'

  return (
    <ActionMenu label={`Ações para ${user.name}`}>
      <ActionMenuItem
        icon={Eye}
        label='Ver detalhes'
        onSelect={() => onView(user)}
      />
      <ActionMenuItem
        icon={Pencil}
        label='Editar'
        disabledReason={disabledReason}
        onSelect={() => onEdit(user)}
      />
      {user.status && (
        <ActionMenuItem
          icon={isActive ? UserX : UserCheck}
          label={isActive ? 'Inativar' : 'Ativar'}
          disabledReason={disabledReason}
          onSelect={() => onToggleStatus(user)}
        />
      )}
      <ActionMenuSeparator />
      <ActionMenuItem
        icon={Trash2}
        label='Excluir'
        destructive
        disabledReason={disabledReason}
        onSelect={() => onDelete(user)}
      />
    </ActionMenu>
  )
}

export { MenuAcoesUsuario }
