import {
  findStudentEnrollment,
  findStudentScholarship,
  hasOngoingScholarship,
  listStudentScholarships,
  parseSalary,
  toCreateScholarshipPayload,
} from './student-records.helper'
import type {
  ScholarshipDetailedWithFullRelations,
  ScholarshipStatus,
  StudentDetailedWithFullRelations,
} from '@/types'

function scholarship(
  id: number,
  status: ScholarshipStatus
): ScholarshipDetailedWithFullRelations {
  return {
    id,
    status,
    scholarship_starts_at: '2024-03-01',
    scholarship_ends_at: '2026-02-28',
    extension_ends_at: null,
    salary: 2100,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    agency: null,
    allocation: null,
  }
}

function student(
  ...scholarshipsByEnrollment: ScholarshipDetailedWithFullRelations[][]
): StudentDetailedWithFullRelations {
  return {
    id: 7,
    name: 'Bia Estudante',
    email: 'bia@ufba.br',
    link_to_lattes: '',
    tax_id: '',
    phone_number: '',
    enrollments: scholarshipsByEnrollment.map((scholarships, index) => ({
      id: 40 + index,
      enrollment_number: ` 20240000${index} `,
      enrollment_program: 'MESTRADO',
      enrollment_date: '2024-03-01',
      defense_prediction_date: null,
      advisor: null,
      scholarships,
    })),
  } as unknown as StudentDetailedWithFullRelations
}

describe('student-records.helper', () => {
  it('lista as bolsas com a matrícula a que pertencem', () => {
    const rows = listStudentScholarships(
      student([scholarship(1, 'FINISHED')], [scholarship(2, 'ON_GOING')])
    )

    expect(rows).toEqual([
      expect.objectContaining({
        id: 1,
        enrollment_id: 40,
        enrollment_number: '202400000',
      }),
      expect.objectContaining({ id: 2, enrollment_id: 41 }),
    ])
  })

  it('acha a matrícula e a bolsa pelo id, ou devolve null', () => {
    const data = student([scholarship(1, 'FINISHED')])

    expect(findStudentEnrollment(data, 40)?.id).toBe(40)
    expect(findStudentEnrollment(data, 99)).toBeNull()
    expect(findStudentScholarship(data, 1)?.enrollment_id).toBe(40)
    expect(findStudentScholarship(data, 99)).toBeNull()
  })

  it.each([
    ['ON_GOING', true],
    ['EXTENDED', true],
    ['FINISHED', false],
  ] as const)('bolsa %s conta como em andamento: %s', (status, expected) => {
    expect(hasOngoingScholarship(student([scholarship(1, status)]))).toBe(
      expected
    )
  })

  it('converte o valor em reais digitado', () => {
    expect(parseSalary('R$ 1.234,56')).toBe(1234.56)
  })
  it('monta o payload de inclusão de bolsa com datas e valor da API', () => {
    expect(
      toCreateScholarshipPayload(
        {
          enrollment_number: '202400000',
          agency_name: 'CAPES',
          allocation_name: 'PGCOMP',
          scholarship_starts_at: '01/03/2024',
          scholarship_ends_at: '28/02/2026',
          salary: 'R$ 2.100,00',
        },
        'bia@ufba.br'
      )
    ).toEqual({
      enrollment_number: '202400000',
      agency_name: 'CAPES',
      allocation_name: 'PGCOMP',
      student_email: 'bia@ufba.br',
      scholarship_starts_at: '2024-03-01',
      scholarship_ends_at: '2026-02-28',
      salary: 2100,
    })
  })
})
