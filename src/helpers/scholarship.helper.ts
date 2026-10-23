import { formatCalendarDate, parseDate } from '@/helpers/formatters.helper'
import type { UpdateEnrollmentPayload } from '@/services/enrollment'
import type { UpdateScholarshipPayload } from '@/services/scholarship'
import type {
  EnrollmentProgram,
  ScholarshipDetailedWithRelations,
  ScholarshipFilters,
  ScholarshipStatus,
} from '@/types'

/**
 * Mesma regra do back (`occupiesSlot`): toda bolsa que nao foi finalizada
 * ainda ocupa a cota e impede excluir o bolsista ou o orientador.
 */
export function isActiveScholarship(scholarship: {
  status: ScholarshipStatus
}): boolean {
  return scholarship.status !== 'FINISHED'
}

export function filterActiveScholarships<
  T extends { status: ScholarshipStatus }
>(scholarships: T[]): T[] {
  return scholarships.filter(isActiveScholarship)
}

interface ScholarshipPeriod {
  scholarship_starts_at: string
  scholarship_ends_at: string
  extension_ends_at: string | null
}

/** "01/03/2024 a 28/02/2026", usando o fim da extensao quando houver. */
export function formatScholarshipPeriod(
  scholarship: ScholarshipPeriod
): string {
  const end = scholarship.extension_ends_at ?? scholarship.scholarship_ends_at

  return `${formatCalendarDate(
    scholarship.scholarship_starts_at
  )} a ${formatCalendarDate(end)}`
}

/** Campos do formulario de edicao da bolsa, como chegam do `FormData`. */
export interface ScholarshipFormValues {
  agency_id: string
  allocation_id: string
  salary: string
  scholarship_starts_at: string
  scholarship_ends_at: string
  extension_ends_at: string
  enrollment_program: EnrollmentProgram
  enrollment_date: string
  defense_prediction_date: string
  advisor_email: string
}

export interface ScholarshipUpdatePayloads {
  enrollmentId: number
  enrollment: UpdateEnrollmentPayload
  scholarship: UpdateScholarshipPayload
}

/** "R$ 2.100,50" -> 2100.5 */
function parseMoney(value: string): number {
  const normalized = value.replace(/[^\d,]/g, '').replace(',', '.')
  return normalized ? Number(normalized) : 0
}

/**
 * Monta as atualizacoes de matricula e de bolsa a partir do formulario. O
 * bolsista nao muda: o back localiza a matricula e a bolsa pelo e-mail dele.
 */
export function toScholarshipUpdatePayloads(
  scholarship: ScholarshipDetailedWithRelations,
  values: ScholarshipFormValues
): ScholarshipUpdatePayloads | null {
  const { enrollment, student } = scholarship
  if (!enrollment || !student) return null

  return {
    enrollmentId: enrollment.id,
    enrollment: {
      student_email: student.email,
      advisor_email: values.advisor_email,
      enrollment_program: values.enrollment_program,
      enrollment_date: parseDate(values.enrollment_date),
      defense_prediction_date: parseDate(values.defense_prediction_date),
    },
    scholarship: {
      enrollment_id: enrollment.id,
      student_email: student.email,
      agency_id: values.agency_id,
      allocation_id: values.allocation_id || null,
      salary: parseMoney(values.salary),
      scholarship_starts_at: parseDate(values.scholarship_starts_at),
      scholarship_ends_at: parseDate(values.scholarship_ends_at),
      extension_ends_at: parseDate(values.extension_ends_at),
    },
  }
}

/** Filtros da pagina de bolsas, todos sempre preenchidos. */
export type ScholarshipListFilters = Required<ScholarshipFilters>

/** Tudo em "Todos" e sem busca: a pagina abre sem esconder nenhuma bolsa. */
export const DEFAULT_SCHOLARSHIP_LIST_FILTERS: ScholarshipListFilters = {
  scholarshipStatus: 'ALL',
  agencyName: 'ALL',
  advisorName: 'ALL',
  programName: 'ALL',
  allocationName: 'ALL',
  orderBy: 'DAT_TERMINO_DESC',
  studentName: '',
}

/** Nome de cada filtro na URL, ex.: /bolsas?status=ON_GOING&orientador=Ana */
const SCHOLARSHIP_LIST_PARAMS: Record<keyof ScholarshipListFilters, string> = {
  studentName: 'bolsista',
  advisorName: 'orientador',
  scholarshipStatus: 'status',
  agencyName: 'agencia',
  programName: 'curso',
  allocationName: 'alocacao',
  orderBy: 'ordem',
}

const STATUS_VALUES = ['INACTIVE', 'ON_GOING', 'EXTENDED', 'FINISHED']
const PROGRAM_VALUES = ['MESTRADO', 'DOUTORADO']

/** Status ou curso que nao existem caem no padrao, em vez de quebrar a busca. */
function isAccepted(key: keyof ScholarshipListFilters, value: string) {
  if (key === 'scholarshipStatus') return STATUS_VALUES.includes(value)
  if (key === 'programName') return PROGRAM_VALUES.includes(value)
  return true
}

export function readScholarshipListFilters(
  params: URLSearchParams
): ScholarshipListFilters {
  const filters = { ...DEFAULT_SCHOLARSHIP_LIST_FILTERS }

  for (const [key, param] of Object.entries(SCHOLARSHIP_LIST_PARAMS)) {
    const name = key as keyof ScholarshipListFilters
    const value = params.get(param)
    if (value && isAccepted(name, value)) filters[name] = value
  }

  return filters
}

/**
 * Filtros -> search params. So entra o que difere do padrao, para o link
 * ficar curto; a busca por nome vai como foi digitada.
 */
export function toScholarshipListParams(
  filters: Partial<ScholarshipListFilters>
): URLSearchParams {
  const params = new URLSearchParams()

  for (const [key, param] of Object.entries(SCHOLARSHIP_LIST_PARAMS)) {
    const name = key as keyof ScholarshipListFilters
    const value = filters[name]
    if (
      value &&
      value.trim() &&
      value !== DEFAULT_SCHOLARSHIP_LIST_FILTERS[name]
    ) {
      params.set(param, value)
    }
  }

  return params
}

/** Link pronto para a pagina de bolsas com os filtros informados. */
export function buildScholarshipListUrl(
  filters: Partial<ScholarshipListFilters>
): string {
  const query = toScholarshipListParams(filters).toString()
  return query ? `/bolsas?${query}` : '/bolsas'
}
