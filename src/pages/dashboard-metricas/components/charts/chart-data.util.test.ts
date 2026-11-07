import type { CountByAgencyAndCourse, CountByCourseAndYear } from '@/services/scholarship'
import {
  formatPercent,
  sumCounts,
  toCount,
  toHistogramData,
  toPieData,
} from './chart-data.util'

describe('chart-data.util', () => {
  it.each([
    [3, 3],
    ['12', 12],
    [undefined, 0],
    [null, 0],
    ['abc', 0],
  ])('toCount(%p) = %p', (value, expected) => {
    expect(toCount(value)).toBe(expected)
  })

  it('toPieData converte cada agência numa fatia com a cor do ChartConfig', () => {
    const data = {
      CAPES: { count: '4' },
      CNPQ: { count: 1 },
    } as unknown as CountByAgencyAndCourse[string]

    expect(toPieData(data)).toEqual([
      { agency: 'CAPES', count: 4, fill: 'var(--color-CAPES)' },
      { agency: 'CNPQ', count: 1, fill: 'var(--color-CNPQ)' },
    ])
  })

  it('toPieData sem dados devolve lista vazia', () => {
    expect(toPieData(undefined)).toEqual([])
  })

  it('sumCounts soma as fatias', () => {
    expect(sumCounts([{ count: 2 }, { count: 5 }])).toBe(7)
    expect(sumCounts([])).toBe(0)
  })

  it('toHistogramData usa 0 quando um ano não tem um dos programas', () => {
    const data = {
      '2023': { MESTRADO: '3', DOUTORADO: 2 },
      '2024': { MESTRADO: 1 },
    } as unknown as CountByCourseAndYear

    expect(toHistogramData(data)).toEqual([
      { year: '2023', MESTRADO: 3, DOUTORADO: 2 },
      { year: '2024', MESTRADO: 1, DOUTORADO: 0 },
    ])
  })

  it.each([
    [1, 3, '33.3%'],
    [3, 3, '100.0%'],
    [0, 4, '0.0%'],
    [2, 0, '0%'],
  ])('formatPercent(%p, %p) = %p', (value, total, expected) => {
    expect(formatPercent(value, total)).toBe(expected)
  })
})
