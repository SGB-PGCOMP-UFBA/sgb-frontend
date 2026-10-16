import type { ManagedUserPayload } from '@/services/user'
import type { ManagedUser, UserRole } from '@/types'

export interface ManagedUserFormValues {
  name: string
  email: string
  tax_id?: string
  phone_number?: string
  link_to_lattes?: string
}

export const ONLY_ADMIN_MANAGES_ADMIN =
  'Apenas administradores podem gerenciar outros administradores.'

export const isStudentRole = (role: UserRole) => role === 'STUDENT'

export const isAdvisorRole = (role: UserRole) =>
  role === 'ADVISOR' || role === 'ADVISOR_WITH_ADMIN_PRIVILEGES'

const onlyDigits = (value: string) => value.replace(/\D/g, '')

const textOrNull = (value?: string) => {
  const trimmed = value?.trim()
  return trimmed ? trimmed : null
}

const digitsOrNull = (value?: string) =>
  value ? textOrNull(onlyDigits(value)) : null

/** Normaliza o formulário e manda `null` nos campos que não valem para o perfil. */
export function toManagedUserPayload(
  role: UserRole,
  values: ManagedUserFormValues
): ManagedUserPayload {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    tax_id: digitsOrNull(values.tax_id),
    phone_number: digitsOrNull(values.phone_number),
    link_to_lattes: isStudentRole(role)
      ? textOrNull(values.link_to_lattes)
      : null,
  }
}

/**
 * Mesma regra do backend: só administrador mexe em administrador. O próprio
 * usuário nem aparece na listagem, então não precisa de regra aqui.
 */
export function getManageDisabledReason(
  user: Pick<ManagedUser, 'role'>,
  loggedUserRole: UserRole | null | undefined
): string | undefined {
  return user.role === 'ADMIN' && loggedUserRole !== 'ADMIN'
    ? ONLY_ADMIN_MANAGES_ADMIN
    : undefined
}
