import { MoreVertical } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export interface ActionMenuProps {
  /** Texto acessivel do botao, ex.: "Ações para Maria". */
  label: string
  children: React.ReactNode
}

/** Botao de tres pontinhos que abre o menu de acoes de uma linha. */
function ActionMenu({ label, children }: ActionMenuProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' aria-label={label}>
          <MoreVertical className='!size-5' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>{children}</DropdownMenuContent>
    </DropdownMenu>
  )
}

export interface ActionMenuItemProps {
  icon: LucideIcon
  label: string
  /** Quando presente, o item fica desabilitado e mostra o motivo. */
  disabledReason?: string
  destructive?: boolean
  onSelect: () => void
}

function ActionMenuItem({
  icon: Icon,
  label,
  disabledReason,
  destructive,
  onSelect,
}: ActionMenuItemProps) {
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

export { ActionMenu, ActionMenuItem }
