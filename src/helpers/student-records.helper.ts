import { formDateToApi } from '@/helpers/formatters.helper'
import type { CreateScholarshipPayload } from '@/services/scholarship'
import type {
  EnrollmentDetailedWithFullRelations,
  EnrollmentProgram,
  ScholarshipDetailedWithFullRelations,
  StudentDetailedWithFullRelations,
} from '@/types'

/** Bolsa do estudante com a matrícula a que pertence. */
export interface StudentScholarship
  extends ScholarshipDetailedWithFullRelations {
  enrollment_id: number
  enrollment_number: string
  enrollment_program: EnrollmentProgram
}

export const ONGOING_SCHOLARSHIP_BLOCKED =
  'Não é possível adicionar uma nova bolsa, pois você já possui uma bolsa em andamento.'

export function listStudentScholarships(
  student: StudentDetailedWithFullRelations
): StudentScholarship[] {
  return student.enrollments.flatMap(enrollment =>
    enrollment.scholarships.map(scholarship => ({
      ...scholarship,
      enrollment_id: enrollment.id,
      enrollment_number: enrollment.enrollment_number.trim(),
      enrollment_program: enrollment.enrollment_program,
    }))
  )
}

export function findStudentEnrollment(
  student: StudentDetailedWithFullRelations,
  enrollmentId: number
): EnrollmentDetailedWithFullRelations | null {
  return student.enrollments.find(({ id }) => id === enrollmentId) ?? null
}

export function findStudentScholarship(
  student: StudentDetailedWithFullRelations,
  scholarshipId: number
): StudentScholarship | null {
  return (
    listStudentScholarships(student).find(({ id }) => id === scholarshipId) ??
    null
  )
}

/** O estudante só pode ter uma bolsa em andamento ou estendida por vez. */
export function hasOngoingScholarship(
  student: StudentDetailedWithFullRelations
): boolean {
  return student.enrollments.some(enrollment =>
    enrollment.scholarships.some(
      ({ status }) => status === 'ON_GOING' || status === 'EXTENDED'
    )
  )
}

/** "R$ 1.234,56" vira 1234.56. */
export function parseSalary(value: string): number {
  return Number(value.replace(/[^\d,]/g, '').replace(',', '.'))
}

export interface NewScholarshipValues {
  enrollment_number: string
  agency_name: string
  allocation_name: string
  scholarship_starts_at: string
  scholarship_ends_at: string
  salary: string
}

/** Payload do POST de bolsa a partir do formulário de inclusão. */
export function toCreateScholarshipPayload(
  values: NewScholarshipValues,
  studentEmail: string
): CreateScholarshipPayload {
  return {
    ...values,
    student_email: studentEmail,
    scholarship_starts_at: formDateToApi(values.scholarship_starts_at),
    scholarship_ends_at: formDateToApi(values.scholarship_ends_at),
    salary: parseSalary(values.salary),
  }
}
