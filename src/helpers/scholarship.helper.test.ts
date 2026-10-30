import {
  buildScholarshipListUrl,
  DEFAULT_SCHOLARSHIP_LIST_FILTERS,
  filterActiveScholarships,
  readScholarshipListFilters,
  toScholarshipListParams,
  formatScholarshipPeriod,
  isActiveScholarship,
  toScholarshipUpdatePayloads,
  type ScholarshipFormValues,
} from './scholarship.helper'
import type { ScholarshipDetailedWithRelations } from '@/types'

describe('scholarship.helper', () => {
  it.each([
    ['INACTIVE', true],
    ['ON_GOING', true],
    ['EXTENDED', true],
    ['FINISHED', false],
  ] as const)('isActiveScholarship(%s) = %s', (status, expected) => {
    expect(isActiveScholarship({ status })).toBe(expected)
  })

  it('filterActiveScholarships mantém só as bolsas não finalizadas', () => {
    const scholarships = [
      { id: 1, status: 'ON_GOING' as const },
      { id: 2, status: 'FINISHED' as const },
      { id: 3, status: 'INACTIVE' as const },
    ]

    expect(filterActiveScholarships(scholarships).map(s => s.id)).toEqual([
      1, 3,
    ])
  })

  it('formatScholarshipPeriod usa o término da bolsa sem extensão', () => {
    expect(
      formatScholarshipPeriod({
        scholarship_starts_at: '2024-03-01',
        scholarship_ends_at: '2026-02-28',
        extension_ends_at: null,
      })
    ).toBe('01/03/2024 a 28/02/2026')
  })

  it('formatScholarshipPeriod usa o fim da extensão quando houver', () => {
    expect(
      formatScholarshipPeriod({
        scholarship_starts_at: '2024-03-01',
        scholarship_ends_at: '2026-02-28',
        extension_ends_at: '2026-08-31',
      })
    ).toBe('01/03/2024 a 31/08/2026')
  })
})

describe('toScholarshipUpdatePayloads', () => {
  const scholarship = {
    id: 3,
    enrollment: { id: 12 },
    student: { email: 'igor@ufba.br' },
  } as unknown as ScholarshipDetailedWithRelations

  const values: ScholarshipFormValues = {
    agency_id: '1',
    allocation_id: '2',
    salary: 'R$ 2.100,50',
    scholarship_starts_at: '15/07/2026',
    scholarship_ends_at: '11/05/2027',
    extension_ends_at: '',
    enrollment_program: 'MESTRADO',
    enrollment_date: '01/03/2024',
    defense_prediction_date: '',
    advisor_email: 'caio@ufba.br',
  }

  it('monta matrícula e bolsa mantendo o bolsista atual', () => {
    const payloads = toScholarshipUpdatePayloads(scholarship, values)

    expect(payloads?.enrollmentId).toBe(12)
    expect(payloads?.enrollment).toEqual({
      student_email: 'igor@ufba.br',
      advisor_email: 'caio@ufba.br',
      enrollment_program: 'MESTRADO',
      enrollment_date: '2024-03-01',
      defense_prediction_date: null,
    })
    expect(payloads?.scholarship).toEqual({
      enrollment_id: 12,
      student_email: 'igor@ufba.br',
      agency_id: '1',
      allocation_id: '2',
      salary: 2100.5,
      scholarship_starts_at: '2026-07-15',
      scholarship_ends_at: '2027-05-11',
      extension_ends_at: null,
    })
  })

  it('sem alocação escolhida envia null', () => {
    const payloads = toScholarshipUpdatePayloads(scholarship, {
      ...values,
      allocation_id: '',
    })

    expect(payloads?.scholarship.allocation_id).toBeNull()
  })

  it('sem matrícula ou bolsista não monta nada', () => {
    expect(
      toScholarshipUpdatePayloads({ ...scholarship, enrollment: null }, values)
    ).toBeNull()
  })
})

describe('filtros da página de bolsas na URL', () => {
  it('sem parâmetros, começa tudo em Todos e sem busca', () => {
    expect(readScholarshipListFilters(new URLSearchParams())).toEqual(
      DEFAULT_SCHOLARSHIP_LIST_FILTERS
    )
  })

  it('lê cada filtro do seu parâmetro', () => {
    const filters = readScholarshipListFilters(
      new URLSearchParams(
        'bolsista=Jo%C3%A3o&orientador=Ana+Souza&status=ON_GOING&agencia=CAPES&curso=MESTRADO&alocacao=REMOTO&ordem=DAT_INICIO_ASC'
      )
    )

    expect(filters).toEqual({
      studentName: 'João',
      advisorName: 'Ana Souza',
      scholarshipStatus: 'ON_GOING',
      agencyName: 'CAPES',
      programName: 'MESTRADO',
      allocationName: 'REMOTO',
      orderBy: 'DAT_INICIO_ASC',
    })
  })

  it('status ou curso inválidos voltam para Todos', () => {
    const filters = readScholarshipListFilters(
      new URLSearchParams('status=QUALQUER&curso=GRADUACAO')
    )

    expect(filters.scholarshipStatus).toBe('ALL')
    expect(filters.programName).toBe('ALL')
  })

  it('só grava na URL o que difere do padrão', () => {
    const params = toScholarshipListParams({
      ...DEFAULT_SCHOLARSHIP_LIST_FILTERS,
      scholarshipStatus: 'FINISHED',
      studentName: '   ',
    })

    expect(params.toString()).toBe('status=FINISHED')
  })

  it('ida e volta preserva os filtros', () => {
    const filters = {
      ...DEFAULT_SCHOLARSHIP_LIST_FILTERS,
      advisorName: 'Caio Orientador',
      agencyName: 'CNPq',
    }

    expect(
      readScholarshipListFilters(toScholarshipListParams(filters))
    ).toEqual(filters)
  })

  it('monta links prontos para a página de bolsas', () => {
    expect(buildScholarshipListUrl({ advisorName: 'Ana Souza' })).toBe(
      '/bolsas?orientador=Ana+Souza'
    )
    expect(buildScholarshipListUrl({ studentName: 'João' })).toBe(
      '/bolsas?bolsista=Jo%C3%A3o'
    )
    expect(buildScholarshipListUrl({})).toBe('/bolsas')
  })
})
