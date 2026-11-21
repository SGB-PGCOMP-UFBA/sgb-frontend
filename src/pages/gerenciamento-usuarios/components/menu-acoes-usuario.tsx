import {
  Eye,
  Pencil,
  ShieldCheck,
  ShieldOff,
  Trash2,
  UserCheck,
  UserX,
} from 'lucide-react'
import {
  ActionMenu,
  ActionMenuItem,
  ActionMenuSeparator,
} from '@/components/action-menu'
import { isAdvisorRole } from '@/helpers/managed-user.helper'
import type { ManagedUser } from '@/types'

export interface MenuAcoesUsuarioProps {
  user: ManagedUser
  disabledReason?: string
  onView: (user: ManagedUser) => void
  onEdit: (user: ManagedUser) => void
  onToggleStatus: (user: ManagedUser) => void
  onToggleAdminPrivileges: (user: ManagedUser) => void
  onDelete: (user: ManagedUser) => void
}

function MenuAcoesUsuario({
  user,
  disabledReason,
  onView,
  onEdit,
  onToggleStatus,
  onToggleAdminPrivileges,
  onDelete,
}: MenuAcoesUsuarioProps) {
  const isActive = user.status === 'ACTIVE'
  const isAdmin = user.role === 'ADVISOR_WITH_ADMIN_PRIVILEGES'

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
      {isAdvisorRole(user.role) && (
        <ActionMenuItem
          icon={isAdmin ? ShieldOff : ShieldCheck}
          label={
            isAdmin
              ? 'Desabilitar perfil de administrador'
              : 'Habilitar perfil de administrador'
          }
          disabledReason={disabledReason}
          onSelect={() => onToggleAdminPrivileges(user)}
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
