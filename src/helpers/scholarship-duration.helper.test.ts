import {
  getDurationWarning,
  getExpectedEndDate,
} from './scholarship-duration.helper'

describe('getExpectedEndDate', () => {
  it('mestrado termina na vespera do mesmo dia 2 anos depois', () => {
    expect(getExpectedEndDate('2026-03-01', 'MESTRADO')).toEqual(
      new Date(2028, 1, 29)
    )
  })

  it('doutorado termina na vespera do mesmo dia 4 anos depois', () => {
    expect(getExpectedEndDate(new Date(2026, 7, 15), 'DOUTORADO')).toEqual(
      new Date(2030, 7, 14)
    )
  })

  it('inicio em 29/02 termina em 28/02 quando o ano final nao e bissexto', () => {
    expect(getExpectedEndDate('2024-02-29', 'MESTRADO')).toEqual(
      new Date(2026, 1, 28)
    )
  })
})

describe('getDurationWarning', () => {
  it.each([
    ['MESTRADO', '2028-02-29'],
    ['DOUTORADO', '2030-02-28'],
  ])('%s com a duracao exata nao avisa', (program, end) => {
    expect(getDurationWarning('2026-03-01', end, program)).toBeNull()
  })

  it.each([
    ['MESTRADO', '2027-06-01'],
    ['DOUTORADO', '2028-03-01'],
  ])('%s mais curto nao e problema e nao avisa', (program, end) => {
    expect(getDurationWarning('2026-03-01', end, program)).toBeNull()
  })

  it('mestrado um dia alem do esperado avisa com o termino esperado', () => {
    expect(getDurationWarning('2026-03-01', '2028-03-01', 'MESTRADO')).toEqual({
      message:
        'Duração acima dos 2 anos esperados para mestrado (término esperado em 29/02/2028).',
    })
  })

  it('doutorado mais longo avisa', () => {
    expect(
      getDurationWarning('2026-03-01', '2030-06-01', 'DOUTORADO')?.message
    ).toBe(
      'Duração acima dos 4 anos esperados para doutorado (término esperado em 28/02/2030).'
    )
  })

  it.each([
    [null, '2029-02-01', 'MESTRADO'],
    ['2026-03-01', null, 'MESTRADO'],
    ['2026-03-01', '2029-02-01', null],
  ])('sem inicio, termino ou curso (%s, %s, %s), nao avisa', (start, end, program) => {
    expect(getDurationWarning(start, end, program)).toBeNull()
  })
})
