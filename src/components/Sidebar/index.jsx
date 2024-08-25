import DesktopSidebar from './Desktop'
import MobileSidebar from './Mobile'
import { getUserFromLocalStorage } from '../../helpers/auth-user'

export default function Sidebar() {
  const user = getUserFromLocalStorage()

  const links = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      path: '/dashboard',
      visible: true,
      availableRoles: ['ADMIN']
    },
    {
      name: 'Bolsistas',
      icon: 'work',
      path: '/bolsistas',
      visible: true,
      availableRoles: ['ADMIN']
    },
    {
      name: 'Orientadores',
      icon: 'people',
      path: '/orientadores',
      visible: true,
      availableRoles: ['ADMIN']
    },
    {
      name: 'Agências',
      icon: 'business',
      path: '/agencias',
      visible: true,
      availableRoles: ['ADMIN']
    },
    {
      name: 'Orientandos',
      icon: 'people',
      path: '/orientandos',
      visible: true,
      availableRoles: ['ADVISOR']
    },
    {
      name: 'Área do Estudante',
      icon: 'school',
      path: '/area-do-estudante',
      visible: true,
      availableRoles: ['STUDENT']
    },
    {
      name: 'Gestão de Dados',
      icon: 'cloud',
      path: '/gestao-de-dados',
      visible: true,
      availableRoles: ['ADMIN']
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
