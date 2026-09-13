import { Link } from 'react-router-dom'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { getUserFromLocalStorage } from '@/helpers/auth-user'
import EmbedNotificationMenu from './embed-notification-menu'
import UserMenu from './user-menu'

export default function MenuAppBar() {
  const user = getUserFromLocalStorage()

  return (
    <header className="sticky top-0 z-10 shrink-0 border-b border-[#d1d3d8] bg-white text-sm font-semibold">
      <div className="flex min-h-16 items-center justify-between gap-2 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="text-[#323a52]" />
          <Link to="/dashboard" className="md:hidden">
            <img src="/assets/pgcomp_1.png" alt="Logo" className="w-28" />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <EmbedNotificationMenu user={user} />
          <UserMenu user={user} />
        </div>
      </div>
    </header>
  )
}
