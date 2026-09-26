import type { UserRole } from './domain.type'

export interface PageMeta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

export interface Page<T> {
  items: T[]
  meta: PageMeta
}

export interface FilterOption {
  key: string
  value: string
}

export interface IdentifiedFilterOption extends FilterOption {
  id: number
}

export interface AdvisorFilterOption extends IdentifiedFilterOption {
  email: string
}

export interface ScholarshipFilters {
  scholarshipStatus?: string
  agencyName?: string
  advisorName?: string
  programName?: string
  allocationName?: string
  orderBy?: string
  studentName?: string
}

export interface FieldChangeEvent {
  target: { name: string; value: string }
}

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

export interface LoginResponse {
  link_to_lattes?: string
}
