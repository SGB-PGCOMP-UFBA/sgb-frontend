/**
 * Envelopes e contratos de transporte da API do SGB.
 * Os tipos de entidade ficam em `./domain`.
 */

import type { UserRole } from './domain'

/* -------------------------------------------------------------------------- */
/* Paginacao                                                                   */
/* -------------------------------------------------------------------------- */

/** Espelha `core/pagination/page-meta.dto.ts` no backend. */
export interface PageMeta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

/** Espelha `core/pagination/page.dto.ts` no backend. */
export interface Page<T> {
  items: T[]
  meta: PageMeta
}

/* -------------------------------------------------------------------------- */
/* Filtros                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Formato que os mappers `forFilter` devolvem para alimentar os <Select> da UI:
 * `key` e o valor enviado de volta para a API, `value` e o rotulo exibido.
 */
export interface FilterOption {
  key: string
  value: string
}

export interface IdentifiedFilterOption extends FilterOption {
  id: number
}

/** `AdvisorMapper.forFilter` acrescenta o e-mail. */
export interface AdvisorFilterOption extends IdentifiedFilterOption {
  email: string
}

/**
 * Espelha `modules/scholarship/filters/IScholarshipFilters.ts`.
 * `'ALL'` e o coringa aceito pelo backend em qualquer um dos campos.
 */
export interface ScholarshipFilters {
  scholarshipStatus?: string
  agencyName?: string
  advisorName?: string
  programName?: string
  allocationName?: string
  orderBy?: string
  studentName?: string
}

/* -------------------------------------------------------------------------- */
/* Autenticacao                                                                */
/* -------------------------------------------------------------------------- */

/** Corpo devolvido por `AuthService.login`. E o que vai para o localStorage. */
export interface LoginResponse {
  access_token: string
  id: number
  role: UserRole
  tax_id: string | null
  name: string
  email: string
  phone_number: string | null
}

export interface LoginRequest {
  email: string
  password: string
  role: UserRole
}
