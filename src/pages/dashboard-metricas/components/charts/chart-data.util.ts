import type { ChartConfig } from '@/components/ui/chart'
import type { CountByAgencyAndCourse, CountByCourseAndYear } from '@/services/scholarship'
import type { EnrollmentProgram } from '@/types'

export const ENROLLMENT_PROGRAMS: EnrollmentProgram[] = ['MESTRADO', 'DOUTORADO']

export const agencyChartConfig = {
  count: { label: 'Bolsas' },
  CAPES: { label: 'CAPES', color: 'hsl(var(--chart-1))' },
  CNPQ: { label: 'CNPQ', color: 'hsl(var(--chart-2))' },
  FAPESB: { label: 'FAPESB', color: 'hsl(var(--chart-3))' },
  OUTRAS: { label: 'Outras', color: 'hsl(var(--chart-4))' },
} satisfies ChartConfig

export const programChartConfig = {
  MESTRADO: { label: 'Mestrado', color: 'hsl(var(--chart-5))' },
  DOUTORADO: { label: 'Doutorado', color: 'hsl(var(--chart-1))' },
} satisfies ChartConfig

export interface PieSlice {
  agency: string
  count: number
  fill: string
}

export interface HistogramRow extends Record<EnrollmentProgram, number> {
  year: string
}

/** O backend devolve contagens como string quando vêm de um `COUNT` do SQL. */
export function toCount(value: unknown): number {
  const parsed = parseInt(String(value), 10)
  return Number.isNaN(parsed) ? 0 : parsed
}

export function toPieData(data: CountByAgencyAndCourse[string] | undefined): PieSlice[] {
  return Object.entries(data ?? {}).map(([agency, { count }]) => ({
    agency,
    count: toCount(count),
    fill: `var(--color-${agency})`,
  }))
}

export function sumCounts(slices: Pick<PieSlice, 'count'>[]): number {
  return slices.reduce((total, slice) => total + slice.count, 0)
}

export function toHistogramData(data: CountByCourseAndYear): HistogramRow[] {
  return Object.entries(data).map(([year, byProgram]) => ({
    year,
    MESTRADO: toCount(byProgram?.MESTRADO),
    DOUTORADO: toCount(byProgram?.DOUTORADO),
  }))
}

export function formatPercent(value: number, total: number): string {
  if (total <= 0) return '0%'
  return `${((value / total) * 100).toFixed(1)}%`
}
