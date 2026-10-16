import {
  Eye,
  MoreVertical,
  Pencil,
  Trash2,
  UserCheck,
  UserX,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { ManagedUser } from '@/types'

export interface MenuAcoesUsuarioProps {
  user: ManagedUser
  disabledReason?: string
  onView: (user: ManagedUser) => void
  onEdit: (user: ManagedUser) => void
  onToggleStatus: (user: ManagedUser) => void
  onDelete: (user: ManagedUser) => void
}

interface ActionItemProps {
  icon: LucideIcon
  label: string
  disabledReason?: string
  destructive?: boolean
  onSelect: () => void
}

function ActionItem({
  icon: Icon,
  label,
  disabledReason,
  destructive,
  onSelect,
}: ActionItemProps) {
  return (
    <DropdownMenuItem
      disabled={Boolean(disabledReason)}
      onSelect={onSelect}
      className={destructive ? 'text-red-600 focus:text-red-700' : undefined}
    >
      <Icon />
      <div className='flex flex-col'>
        <span>{label}</span>
        {disabledReason && (
          <span className='max-w-[220px] text-xs text-gray-500'>
            {disabledReason}
          </span>
        )}
      </div>
    </DropdownMenuItem>
  )
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
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          aria-label={`Ações para ${user.name}`}
        >
          <MoreVertical className='!size-5' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <ActionItem
          icon={Eye}
          label='Ver detalhes'
          onSelect={() => onView(user)}
        />
        <ActionItem
          icon={Pencil}
          label='Editar'
          disabledReason={disabledReason}
          onSelect={() => onEdit(user)}
        />
        {user.status && (
          <ActionItem
            icon={isActive ? UserX : UserCheck}
            label={isActive ? 'Inativar' : 'Ativar'}
            disabledReason={disabledReason}
            onSelect={() => onToggleStatus(user)}
          />
        )}
        <DropdownMenuSeparator />
        <ActionItem
          icon={Trash2}
          label='Excluir'
          destructive
          disabledReason={disabledReason}
          onSelect={() => onDelete(user)}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { MenuAcoesUsuario }
