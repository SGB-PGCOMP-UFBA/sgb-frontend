import type { UserRole } from './domain'

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

export interface ListUpdatesFromImport {
  student_name?: string
  student_email?: string
  description: string
}

export interface ImportDataResponse {
  errors?: ImportError[]
  listUpdatesFromImport?: ListUpdatesFromImport[]
  pendingScholarships?: unknown[]
}

export interface LoginResponse {
  link_to_lattes?: string
}
