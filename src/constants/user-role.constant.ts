import type { FilterOption, UserRole } from '@/types'

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: 'Administrador(a)',
  ADVISOR: 'Orientador(a)',
  ADVISOR_WITH_ADMIN_PRIVILEGES: 'Orientador(a) administrador(a)',
  STUDENT: 'Estudante',
}

export const USER_ROLE_FILTER_OPTIONS: FilterOption[] = (
  Object.keys(USER_ROLE_LABELS) as UserRole[]
).map(key => ({ key, value: USER_ROLE_LABELS[key] }))

export function getUserRoleLabel(role: string): string {
  return USER_ROLE_LABELS[role as UserRole] ?? role
}

export function isUserRole(value: unknown): value is UserRole {
  return (
    typeof value === 'string' &&
    Object.prototype.hasOwnProperty.call(USER_ROLE_LABELS, value)
  )
}
