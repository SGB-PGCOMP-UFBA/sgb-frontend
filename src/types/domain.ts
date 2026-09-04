/**
 * Tipos de dominio do SGB, derivados do backend (sgb-backend).
 *
 * IMPORTANTE: estes tipos descrevem o que a API *retorna* — ou seja, a saida dos
 * mappers em `src/modules/<x>/mapper/*.mapper.ts` — e nao as entidades TypeORM.
 * Um mapper `simplified` devolve menos campos que um `detailed`, entao a variante
 * escolhida aqui precisa casar com o endpoint que esta sendo consumido.
 *
 * Datas trafegam como string ISO 8601 no JSON, nunca como `Date`.
 */

/** Data/hora serializada em ISO 8601, como chega do JSON. */
export type DateString = string

/* -------------------------------------------------------------------------- */
/* Enums                                                                       */
/* -------------------------------------------------------------------------- */

/** Espelha `core/enums/StatusEnum` no backend. */
export type ScholarshipStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'FINISHED'
  | 'ON_GOING'
  | 'EXTENDED'

/** Espelha `core/enums/ProgramEnum` no backend. */
export type EnrollmentProgram = 'MESTRADO' | 'DOUTORADO'

/** Espelha `core/enums/AgencyEnum` no backend. */
export type AgencyName = 'CAPES' | 'CNPQ' | 'FAPESB' | 'OUTRAS'

/**
 * `ADVISOR_WITH_ADMIN_PRIVILEGES` nao existe como coluna: o AdvisorMapper o
 * deriva de `has_admin_privileges` na hora de responder.
 */
export type UserRole =
  | 'ADMIN'
  | 'ADVISOR'
  | 'ADVISOR_WITH_ADMIN_PRIVILEGES'
  | 'STUDENT'

export type UserStatus = 'ACTIVE' | 'INACTIVE'

/* -------------------------------------------------------------------------- */
/* Student                                                                     */
/* -------------------------------------------------------------------------- */

export interface StudentSimplified {
  id: number
  role: UserRole
  created_at: DateString
  updated_at: DateString
}

export interface StudentDetailed extends StudentSimplified {
  name: string
  email: string
  link_to_lattes: string
  tax_id: string
  phone_number: string
}

export interface StudentDetailedWithRelations extends StudentDetailed {
  enrollments: EnrollmentDetailed[]
}

export interface StudentDetailedWithFullRelations extends StudentDetailed {
  enrollments: EnrollmentDetailedWithFullRelations[]
}

/* -------------------------------------------------------------------------- */
/* Advisor                                                                     */
/* -------------------------------------------------------------------------- */

export interface AdvisorSimplified {
  id: number
  role: UserRole
  status: UserStatus
  created_at: DateString
  updated_at: DateString
}

export interface AdvisorDetailed extends AdvisorSimplified {
  /** O mapper normaliza string vazia para `null`. */
  tax_id: string | null
  /** O mapper normaliza string vazia para `null`. */
  phone_number: string | null
  name: string
  email: string
  enrollmentsCount: number
  has_admin_privileges: boolean
}

export interface AdvisorDetailedWithRelations extends AdvisorDetailed {
  enrollments: EnrollmentDetailed[]
}

/* -------------------------------------------------------------------------- */
/* Agency                                                                      */
/* -------------------------------------------------------------------------- */

export interface AgencySimplified {
  id: number
  name: string
  description: string
  created_at: DateString
  updated_at: DateString
}

export interface AgencyDetailed extends AgencySimplified {
  scholarshipsSinceBeginning: number
  masters_degree_awarded_scholarships: number
  masters_degree_allocated_scholarships: number
  doctorate_degree_awarded_scholarships: number
  doctorate_degree_allocated_scholarships: number
}

export interface AgencyDetailedWithRelations extends AgencyDetailed {
  scholarships: ScholarshipDetailed[]
}

/* -------------------------------------------------------------------------- */
/* Allocation                                                                  */
/* -------------------------------------------------------------------------- */

export interface AllocationSimplified {
  id: number
  name: string
  created_at: DateString
  updated_at: DateString
}

export interface AllocationDetailed extends AllocationSimplified {
  scholarshipsSinceBeginning: number
  masters_degree_awarded_scholarships: number
  masters_degree_allocated_scholarships: number
  doctorate_degree_awarded_scholarships: number
  doctorate_degree_allocated_scholarships: number
}

export interface AllocationDetailedWithRelations extends AllocationDetailed {
  scholarships: ScholarshipDetailed[]
}

/* -------------------------------------------------------------------------- */
/* Enrollment                                                                  */
/* -------------------------------------------------------------------------- */

export interface EnrollmentSimplified {
  id: number
  student_id: number
  advisor_id: number
  created_at: DateString
  updated_at: DateString
}

export interface EnrollmentDetailed extends EnrollmentSimplified {
  enrollment_date: DateString
  enrollment_number: string
  enrollment_program: EnrollmentProgram
  defense_prediction_date: DateString | null
}

export interface EnrollmentDetailedWithRelations extends EnrollmentDetailed {
  advisor: AdvisorDetailed | null
  student: StudentDetailed | null
  scholarships: ScholarshipDetailed[]
}

export interface EnrollmentDetailedWithFullRelations extends EnrollmentDetailed {
  advisor: AdvisorDetailed | null
  scholarships: ScholarshipDetailedWithFullRelations[]
}

/* -------------------------------------------------------------------------- */
/* Scholarship                                                                 */
/* -------------------------------------------------------------------------- */

export interface ScholarshipSimplified {
  id: number
  agency_id: number
  /** Nulo enquanto a bolsa nao foi alocada a uma cota. */
  allocation_id: number | null
  enrollment_id: number
  status: ScholarshipStatus
  created_at: DateString
  updated_at: DateString
}

export interface ScholarshipDetailed extends ScholarshipSimplified {
  scholarship_starts_at: DateString
  scholarship_ends_at: DateString
  extension_ends_at: DateString | null
  salary: number | null
}

/**
 * `detailedWithRelations` nao herda de `ScholarshipDetailed`: o mapper omite
 * `agency_id`, `allocation_id` e `enrollment_id`, trocando-os pelos objetos.
 */
export interface ScholarshipDetailedWithRelations {
  id: number
  status: ScholarshipStatus
  scholarship_starts_at: DateString
  scholarship_ends_at: DateString
  extension_ends_at: DateString | null
  salary: number | null
  created_at: DateString
  updated_at: DateString
  agency: AgencySimplified | null
  allocation: AllocationSimplified | null
  enrollment: EnrollmentDetailed | null
  student: StudentDetailed | null
  advisor: AdvisorDetailed | null
}

/** Igual ao anterior, porem sem `enrollment`, `student` e `advisor`. */
export interface ScholarshipDetailedWithFullRelations {
  id: number
  status: ScholarshipStatus
  scholarship_starts_at: DateString
  scholarship_ends_at: DateString
  extension_ends_at: DateString | null
  salary: number | null
  created_at: DateString
  updated_at: DateString
  agency: AgencySimplified | null
  allocation: AllocationSimplified | null
}
