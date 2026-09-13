import { useNavigate } from 'react-router-dom'
import { LogOut, Settings } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { removeUserFromLocalStorage } from '@/helpers/auth-user'
import type { StoredUser } from '@/helpers/auth-user'

export interface UserMenuProps {
  user: StoredUser | null
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
}

export default function UserMenu(props: UserMenuProps) {
  const { user } = props
  const navigate = useNavigate()

  const handleRedirectToSettings = () => {
    navigate('/configuracoes', { replace: true })
  }

  const handleLogout = () => {
    removeUserFromLocalStorage()
    navigate('/', { replace: true })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="account of current user"
          className="h-12 w-12 rounded-full"
        >
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-[#1c253f] text-white">
              {getInitials(user ? user.name : '')}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <div className="px-5 py-2 text-left">
          <p className="text-base">{user ? user.name : ''}</p>
          <p className="break-words text-sm text-muted-foreground">
            {user ? user.email : ''}
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleRedirectToSettings}>
          <Settings />
          Configurações
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
