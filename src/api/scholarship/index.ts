import type { AxiosResponse } from 'axios'
import { api } from '../../services/api'
import { buildHeaders } from '../utils/HeaderUtils'
import type {
  DateInput,
  EnrollmentProgram,
  FilterOption,
  Page,
  ScholarshipDetailedWithRelations,
  ScholarshipEditableStatus,
  ScholarshipFilters
} from '../../types'

const BASE_SCHOLARSHIP_API_PATH = `/v1/scholarship`

/**
 * Os formularios alimentam estes campos com `parseDate`, que devolve `null`
 * quando o texto digitado nao casa com dd/MM/yyyy. O `null` chega ao servidor e
 * o `@IsDate()` do DTO o rejeita com erro de validacao — que e o comportamento
 * atual da tela. O tipo admite `null` para descrever isso, em vez de esconder
 * o caso com um cast.
 */

/**
 * Espelha `CreateScholarshipDto` do backend. A bolsa e criada pelos NOMES da
 * agencia e da cota e pelo e-mail/matricula do estudante, nao por ids — e assim
 * que o servico resolve os quatro vinculos.
 */
export interface CreateScholarshipPayload {
  student_email: string
  enrollment_number: string
  /* O backend restringe com `@IsIn(['CAPES','CNPQ','FAPESB','OUTRAS'])`, mas o
     select e populado com os nomes reais das agencias cadastradas — uma agencia
     fora dessa lista e enviada e recusada na validacao. */
  agency_name: string
  allocation_name: string
  scholarship_starts_at: DateInput | null
  scholarship_ends_at: DateInput | null
  status?: ScholarshipEditableStatus
  extension_ends_at?: DateInput | null
  salary?: number | null
}

/**
 * Espelha `UpdateScholarshipDto`. Diferente da criacao, aqui a agencia e a cota
 * vao por id, e `enrollment_id`, `student_email` e `status` sao obrigatorios —
 * nao e um `Partial` de CreateScholarshipPayload.
 */
export interface UpdateScholarshipPayload {
  enrollment_id: number
  student_email: string
  status: ScholarshipEditableStatus
  /* O DTO do backend declara `agency_id: number` mas o decora com
     `@IsString()`, e os <Select> da UI enviam string. Os dois formatos passam
     pela validacao; o tipo reflete isso em vez de escolher um. */
  agency_id?: number | string
  allocation_id?: number | string | null
  scholarship_starts_at?: DateInput | null
  scholarship_ends_at?: DateInput | null
  extension_ends_at?: DateInput | null
  salary?: number | null
}

/** `{ [curso]: { [agencia]: { count } } }` */
export type CountByAgencyAndCourse = Record<
  string,
  Record<string, { count: number }>
>

/** `{ [agencia]: { [status]: { count } } }` */
export type CountByAgencyAndStatus = Record<
  string,
  Record<string, { count: number }>
>

/** `{ [ano]: { MESTRADO: n, DOUTORADO: n } }` */
export type CountByCourseAndYear = Record<
  string,
  Record<EnrollmentProgram, number>
>

export interface DegreeCount {
  masters: number
  phd: number
}

export interface AgencyScholarshipReport {
  agencyName: string
  scholarshipsTotal: number
  totalMasters: number
  totalPhd: number
  activeCount: DegreeCount
  inactiveCount: DegreeCount
  finishedCount: DegreeCount
  onGoingCount: DegreeCount
  extendedCount: DegreeCount
}

export const createScholarship = async (
  scholarship: CreateScholarshipPayload
): Promise<AxiosResponse<ScholarshipDetailedWithRelations>> => {
  return api.post(`${BASE_SCHOLARSHIP_API_PATH}`, scholarship, {
    headers: buildHeaders(),
  })
}

export const getScholarshipStatusFilterList = async (): Promise<
  AxiosResponse<FilterOption[]>
> => {
  return api.get(`${BASE_SCHOLARSHIP_API_PATH}/filter-list`, {
    headers: buildHeaders(),
  })
}

export const countScholarshipsGroupingByAgencyForCourse = async (
  programName?: string | null,
  scholarshipStatus: string | null = null
): Promise<AxiosResponse<CountByAgencyAndCourse>> => {
  let url = `${BASE_SCHOLARSHIP_API_PATH}/count/by-agency-and-course`

  if (programName) {
    url += `?programName=${encodeURIComponent(programName)}`
  }

  if (scholarshipStatus) {
    if (url.includes('?')) url += '&'
    else url += '?'
    url += `scholarshipStatus=${scholarshipStatus}`
  }

  return api.get(url, {
    headers: buildHeaders(),
  })
}

export const countScholarshipsGroupingByCourseAndYear = async (): Promise<
  AxiosResponse<CountByCourseAndYear>
> => {
  return api.get(`${BASE_SCHOLARSHIP_API_PATH}/count/by-course-and-year`, {
    headers: buildHeaders(),
  })
}

export const countScholarshipsGroupingByCourseAndYearFilteringByAgencyName =
  async (agencyName: string): Promise<AxiosResponse<CountByCourseAndYear>> => {
    return api.get(
      `${BASE_SCHOLARSHIP_API_PATH}/count/by-course-and-year/${agencyName}`,
      {
        headers: buildHeaders(),
      }
    )
  }

export const countScholarshipsGroupingByStatusForAgency = async (
  agencyName?: string | null
): Promise<AxiosResponse<CountByAgencyAndStatus>> => {
  let url = `${BASE_SCHOLARSHIP_API_PATH}/count/by-agency-and-status`

  if (agencyName) {
    url += `?agencyName=${encodeURIComponent(agencyName)}`
  }

  return api.get(url, {
    headers: buildHeaders(),
  })
}

export const getScholarships = async (
  page: number,
  limit: number,
  filters?: ScholarshipFilters
): Promise<AxiosResponse<Page<ScholarshipDetailedWithRelations>>> => {
  let url = `${BASE_SCHOLARSHIP_API_PATH}/paginated?page=${page}&limit=${limit}`

  if (filters) {
    if (filters.studentName) {
      url += `&studentName=${encodeURIComponent(filters.studentName)}`
    }
    if (filters.scholarshipStatus) {
      url += `&scholarshipStatus=${encodeURIComponent(
        filters.scholarshipStatus
      )}`
    }
    if (filters.agencyName) {
      url += `&agencyName=${encodeURIComponent(filters.agencyName)}`
    }
    if (filters.allocationName) {
      url += `&allocationName=${encodeURIComponent(filters.allocationName)}`
    }
    if (filters.advisorName) {
      url += `&advisorName=${encodeURIComponent(filters.advisorName)}`
    }
    if (filters.programName) {
      url += `&programName=${encodeURIComponent(filters.programName)}`
    }
    if (filters.orderBy) {
      url += `&orderBy=${encodeURIComponent(filters.orderBy)}`
    }
  }

  return api.get(url, {
    headers: buildHeaders(),
  })
}

export const updateScholarship = async (
  scholarshipId: number,
  scholarship: UpdateScholarshipPayload
): Promise<AxiosResponse<ScholarshipDetailedWithRelations>> => {
  return api.patch(
    `${BASE_SCHOLARSHIP_API_PATH}/${scholarshipId}`,
    scholarship,
    {
      headers: buildHeaders(),
    }
  )
}

export const deleteScholarship = async (
  scholarshipId: number
): Promise<AxiosResponse<void>> => {
  return api.delete(`${BASE_SCHOLARSHIP_API_PATH}/${scholarshipId}`, {
    headers: buildHeaders(),
  })
}

export const countScholarshipsAsReportBetweenDates = async (
  startDate: string,
  endDate: string
): Promise<AxiosResponse<AgencyScholarshipReport[]>> => {
  const url =
    BASE_SCHOLARSHIP_API_PATH +
    `/report/all-between-dates?` +
    `start_period=${startDate}` +
    `&end_period=${endDate}`

  return api.get(`${url}`, { headers: buildHeaders() })
}

/** Devolve os e-mails ja concatenados por virgula, prontos para copiar. */
export const copyFilteredScholarshipsStudentsEmails = async (
  filters?: ScholarshipFilters
): Promise<AxiosResponse<string>> => {
  let url = `${BASE_SCHOLARSHIP_API_PATH}/filtered-students-emails?`

  if (filters) {
    if (filters.scholarshipStatus) {
      url += `scholarshipStatus=${encodeURIComponent(
        filters.scholarshipStatus
      )}&`
    }
    if (filters.agencyName) {
      url += `agencyName=${encodeURIComponent(filters.agencyName)}&`
    }
    if (filters.allocationName) {
      url += `allocationName=${encodeURIComponent(filters.allocationName)}&`
    }
    if (filters.advisorName) {
      url += `advisorName=${encodeURIComponent(filters.advisorName)}&`
    }
    if (filters.programName) {
      url += `programName=${encodeURIComponent(filters.programName)}`
    }
    url = url.replace(/&$/, '')
  }

  return api.get(url, {
    headers: buildHeaders(),
  })
}
