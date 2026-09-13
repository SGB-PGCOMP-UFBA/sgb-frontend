import type { IconType } from 'react-icons'
import {
  MdBusiness,
  MdCloud,
  MdDashboard,
  MdDateRange,
  MdLocationOn,
  MdPeople,
  MdSchool,
  MdWork
} from 'react-icons/md'
import type { UserRole } from '@/types'

export interface SidebarLink {
  name: string
  icon: IconType
  path: string
  visible: boolean
  availableRoles: UserRole[]
}

const ADMIN_ROLES: UserRole[] = ['ADMIN', 'ADVISOR_WITH_ADMIN_PRIVILEGES']

export const SIDEBAR_LINKS: SidebarLink[] = [
  {
    name: 'Dashboard',
    icon: MdDashboard,
    path: '/dashboard',
    visible: true,
    availableRoles: ADMIN_ROLES
  },
  {
    name: 'Bolsistas',
    icon: MdWork,
    path: '/bolsistas',
    visible: true,
    availableRoles: ADMIN_ROLES
  },
  {
    name: 'Quadrienal',
    icon: MdDateRange,
    path: '/quadrienal',
    visible: true,
    availableRoles: ADMIN_ROLES
  },
  {
    name: 'Orientadores',
    icon: MdPeople,
    path: '/orientadores',
    visible: true,
    availableRoles: ADMIN_ROLES
  },
  {
    name: 'Agências',
    icon: MdBusiness,
    path: '/agencias',
    visible: true,
    availableRoles: ADMIN_ROLES
  },
  {
    name: 'Alocações',
    icon: MdLocationOn,
    path: '/alocacoes',
    visible: true,
    availableRoles: ADMIN_ROLES
  },
  {
    name: 'Orientandos',
    icon: MdPeople,
    path: '/orientandos',
    visible: true,
    availableRoles: ['ADVISOR']
  },
  {
    name: 'Área do Estudante',
    icon: MdSchool,
    path: '/area-do-estudante',
    visible: true,
    availableRoles: ['STUDENT']
  },
  {
    name: 'Gestão de Dados',
    icon: MdCloud,
    path: '/gestao-de-dados',
    visible: true,
    availableRoles: ADMIN_ROLES
  }
]
