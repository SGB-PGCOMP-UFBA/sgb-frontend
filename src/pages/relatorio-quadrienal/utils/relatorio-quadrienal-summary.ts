import type {
  AgencyScholarshipReport,
  DegreeCount,
} from '@/services/scholarship'

export interface ReportPeriod {
  startDate: Date | null
  endDate: Date | null
}

export interface ReportTotals {
  active: DegreeCount
  onGoing: DegreeCount
  extended: DegreeCount
  finished: DegreeCount
}

type CountPicker = (agency: AgencyScholarshipReport) => DegreeCount

const PROGRAMS = [
  { key: 'masters', label: 'Mestrado' },
  { key: 'phd', label: 'Doutorado' },
] as const

function sumDegreeCounts(
  data: AgencyScholarshipReport[],
  pick: CountPicker
): DegreeCount {
  return data.reduce(
    (acc, agency) => ({
      masters: acc.masters + pick(agency).masters,
      phd: acc.phd + pick(agency).phd,
    }),
    { masters: 0, phd: 0 }
  )
}

export function sumReportTotals(data: AgencyScholarshipReport[]): ReportTotals {
  return {
    active: sumDegreeCounts(data, agency => agency.activeCount),
    onGoing: sumDegreeCounts(data, agency => agency.onGoingCount),
    extended: sumDegreeCounts(data, agency => agency.extendedCount),
    finished: sumDegreeCounts(data, agency => agency.finishedCount),
  }
}

function describeByProgramAndAgency(
  data: AgencyScholarshipReport[],
  pick: CountPicker
): string {
  const parts = PROGRAMS.flatMap(({ key, label }) => {
    const byAgency = data
      .map(agency => ({ name: agency.agencyName, count: pick(agency)[key] }))
      .filter(agency => agency.count > 0)
    const total = byAgency.reduce((sum, agency) => sum + agency.count, 0)

    if (total === 0) return []

    const agencies = byAgency
      .map(agency => `${agency.count} ${agency.name}`)
      .join(', ')

    return [`${total} de ${label} (${agencies})`]
  })

  return parts.length > 0 ? `, sendo ${parts.join(' e ')}` : ''
}

const formatDay = (date: Date) => date.toLocaleDateString('pt-BR')

export function describeReportPeriod({
  startDate,
  endDate,
}: ReportPeriod): string | null {
  if (startDate && endDate) {
    return `de ${formatDay(startDate)} a ${formatDay(endDate)}`
  }
  if (startDate) return `a partir de ${formatDay(startDate)}`
  if (endDate) return `até ${formatDay(endDate)}`

  return null
}

export function buildReportSummaryText(
  period: ReportPeriod,
  data: AgencyScholarshipReport[]
): string {
  const pickActive: CountPicker = agency => agency.activeCount
  const pickFinished: CountPicker = agency => agency.finishedCount
  const active = sumDegreeCounts(data, pickActive)
  const finished = sumDegreeCounts(data, pickFinished)
  const activeTotal = active.masters + active.phd
  const finishedTotal = finished.masters + finished.phd
  const periodText = describeReportPeriod(period)

  const activeSentence =
    `${periodText ? `No período ${periodText}` : 'Em todo o período'}, ` +
    `há ${activeTotal} ${activeTotal === 1 ? 'bolsa ativa' : 'bolsas ativas'}` +
    `${describeByProgramAndAgency(data, pickActive)}.`

  const finishedSentence =
    'Nesse mesmo período ' +
    `${finishedTotal === 1 ? 'foi finalizada' : 'foram finalizadas'} ` +
    `${finishedTotal} ${finishedTotal === 1 ? 'bolsa' : 'bolsas'}` +
    `${describeByProgramAndAgency(data, pickFinished)}.`

  return `${activeSentence} ${finishedSentence}`
}
