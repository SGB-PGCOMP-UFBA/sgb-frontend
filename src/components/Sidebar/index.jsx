import React, { useState } from 'react'
import DesktopSidebar from './Desktop'
import MobileSidebar from './Mobile'
import { getUserFromLocalStorage } from '../../helpers/auth-user'

export default function Sidebar() {
  const user = getUserFromLocalStorage()
  const [expandSidebar, setExpandSidebar] = useState(true)

  const handleExpandSidebar = () => {
    setExpandSidebar(!expandSidebar)
  }

  const links = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      path: '/dashboard',
      visible: true,
      availableRoles: ['ADMIN', 'ADVISOR_WITH_ADMIN_PRIVILEGES']
    },
    {
      name: 'Bolsistas',
      icon: 'work',
      path: '/bolsistas',
      visible: true,
      availableRoles: ['ADMIN', 'ADVISOR_WITH_ADMIN_PRIVILEGES']
    },
    {
      name: 'Orientadores',
      icon: 'people',
      path: '/orientadores',
      visible: true,
      availableRoles: ['ADMIN', 'ADVISOR_WITH_ADMIN_PRIVILEGES']
    },
    {
      name: 'Agências',
      icon: 'business',
      path: '/agencias',
      visible: true,
      availableRoles: ['ADMIN', 'ADVISOR_WITH_ADMIN_PRIVILEGES']
    },
    {
      name: 'Alocações',
      icon: 'location_on',
      path: '/alocacoes',
      visible: true,
      availableRoles: ['ADMIN', 'ADVISOR_WITH_ADMIN_PRIVILEGES']
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
      availableRoles: ['ADMIN', 'ADVISOR_WITH_ADMIN_PRIVILEGES']
    }
  ]

  const filteredLinks = links.filter(
    (link) => !link.availableRoles || (link.availableRoles.includes(user.role) && link.visible)
  )

  return (
    <>
      <div className="sticky top-0 hidden md:block" style={{ zIndex: 9999 }}>
        <DesktopSidebar links={filteredLinks} expandSidebar={expandSidebar} handleExpandSidebar={handleExpandSidebar} />
      </div>
      <div className="md:hidden">
        <MobileSidebar links={filteredLinks} expandSidebar={expandSidebar} handleExpandSidebar={handleExpandSidebar} />
      </div>
    </>
  )
}
