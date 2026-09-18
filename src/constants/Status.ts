import type { FilterOption } from '@/types'
import type { ScholarshipStatus, UserStatus } from '@/types'

export const SCHOLARSHIP_STATUS_LABELS: Record<ScholarshipStatus, string> = {
  INACTIVE: 'Não iniciada',
  ON_GOING: 'Em andamento',
  EXTENDED: 'Prorrogada',
  FINISHED: 'Finalizada'
}

export const USER_STATUS_LABELS: Record<UserStatus, string> = {
  ACTIVE: 'Ativo',
  INACTIVE: 'Inativo'
}

export const ALL_FILTER_KEY = 'ALL'

export const SCHOLARSHIP_STATUS_FILTER_OPTIONS: FilterOption[] = (
  Object.keys(SCHOLARSHIP_STATUS_LABELS) as ScholarshipStatus[]
).map((key) => ({ key, value: SCHOLARSHIP_STATUS_LABELS[key] }))

export function getScholarshipStatusLabel(status: string): string {
  return SCHOLARSHIP_STATUS_LABELS[status as ScholarshipStatus] ?? status
}

export function getUserStatusLabel(status: string): string {
  return USER_STATUS_LABELS[status as UserStatus] ?? status
}
