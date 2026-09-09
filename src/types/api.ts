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

/* -------------------------------------------------------------------------- */
/* Importacao e exportacao de dados                                            */
/* -------------------------------------------------------------------------- */

/** Espelha `modules/data-manager/dto/import-error.dto.ts`. */
export interface ImportError {
  student_name?: string
  student_email?: string
  advisor_email?: string
  enrollment_number?: string
  enrollment_program?: string
  enrollment_date?: string
  agency_name?: string
  allocation_name?: string
  scholarship_start_date?: string
  scholarship_end_date?: string
  scholarship_status?: string
  description: string
}

/** Espelha `modules/data-manager/dto/list-updates.dto.ts`. */
export interface ListUpdatesFromImport {
  student_name?: string
  student_email?: string
  description: string
}

/**
 * `POST /v1/data-manager/import-data`. O backend responde `{ errors }` quando a
 * importacao falha na validacao das linhas, e `{ listUpdatesFromImport, ... }`
 * quando processa o arquivo — dai os dois lados serem opcionais.
 */
export interface ImportDataResponse {
  errors?: ImportError[]
  listUpdatesFromImport?: ListUpdatesFromImport[]
  pendingScholarships?: unknown[]
}

/* -------------------------------------------------------------------------- */
/* Navegacao                                                                   */
/* -------------------------------------------------------------------------- */

/** Item do menu lateral, filtrado pelo papel do usuario logado. */
export interface SidebarLink {
  name: string
  /** Nome do icone do Material Icons, renderizado por `<Icon>`. */
  icon: string
  path: string
  visible: boolean
  availableRoles: UserRole[]
}

/* -------------------------------------------------------------------------- */
/* Complementos do usuario armazenado                                          */
/* -------------------------------------------------------------------------- */

/**
 * O login nao devolve `link_to_lattes`, mas a Area do Estudante grava esse
 * campo no usuario do localStorage (`updateUserFromLocalStorage`) assim que
 * carrega os dados do estudante, e a tela de perfil (`LoggedUserSettings`) o le
 * de volta. Declarado por merge de interface para nao reescrever o bloco de
 * autenticacao acima; opcional porque so existe para estudantes, depois dessa
 * primeira carga.
 */
export interface LoginResponse {
  link_to_lattes?: string
}
