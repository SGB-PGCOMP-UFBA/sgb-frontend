import DesktopSidebar from './Desktop'
import MobileSidebar from './Mobile'
import { getUserFromLocalStorage } from '../../utils/auth-user'

export default function Sidebar() {
  const user = getUserFromLocalStorage()

  const links = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      path: '/dashboard',
      availableRoles: ['ADMIN']
    },
    {
      name: 'Bolsas',
      icon: 'work',
      path: '/bolsas',
      availableRoles: ['ADMIN']
    },
    {
      name: 'Estudantes',
      icon: 'school',
      path: '/estudantes',
      availableRoles: ['ADMIN']
    },
    {
      name: 'Orientadores',
      icon: 'people',
      path: '/orientadores',
      availableRoles: ['ADMIN']
    },
    {
      name: 'Orientandos',
      icon: 'people',
      path: '/orientandos',
      availableRoles: ['ADVISOR']
    }
  ]

  return (
    <>
      <div className="sticky top-0 hidden md:block">
        <DesktopSidebar links={links} user={user} />
      </div>
      <div className="md:hidden">
        <MobileSidebar links={links} user={user} />
      </div>
    </>
  )
}
