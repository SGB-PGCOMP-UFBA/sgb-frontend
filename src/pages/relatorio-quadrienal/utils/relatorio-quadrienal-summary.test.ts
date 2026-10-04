import {
  buildReportSummaryText,
  describeReportPeriod,
  sumReportTotals,
} from './relatorio-quadrienal-summary'
import type { AgencyScholarshipReport } from '@/services/scholarship'

const period = {
  startDate: new Date(2023, 0, 1),
  endDate: new Date(2026, 11, 31),
}
const fullPeriod = { startDate: null, endDate: null }

function agency(
  agencyName: string,
  active: [number, number],
  finished: [number, number],
  onGoing: [number, number] = [0, 0],
  extended: [number, number] = [0, 0]
): AgencyScholarshipReport {
  return {
    agencyName,
    scholarshipsTotal: active[0] + active[1],
    totalMasters: active[0],
    totalPhd: active[1],
    activeCount: { masters: active[0], phd: active[1] },
    finishedCount: { masters: finished[0], phd: finished[1] },
    onGoingCount: { masters: onGoing[0], phd: onGoing[1] },
    extendedCount: { masters: extended[0], phd: extended[1] },
  }
}

describe('sumReportTotals', () => {
  it('quando há várias agências, soma cada status por modalidade', () => {
    const totals = sumReportTotals([
      agency('CNPQ', [5, 2], [2, 0], [2, 1], [1, 1]),
      agency('CAPES', [10, 4], [3, 1], [6, 2], [1, 1]),
    ])

    expect(totals).toEqual({
      active: { masters: 15, phd: 6 },
      onGoing: { masters: 8, phd: 3 },
      extended: { masters: 2, phd: 2 },
      finished: { masters: 5, phd: 1 },
    })
  })

  it('quando não há agências, devolve tudo zerado', () => {
    expect(sumReportTotals([]).active).toEqual({ masters: 0, phd: 0 })
  })
})

describe('buildReportSummaryText', () => {
  it('quando há bolsas em várias agências, detalha cada modalidade por agência de fomento', () => {
    const text = buildReportSummaryText(period, [
      agency('CNPQ', [5, 2], [2, 0]),
      agency('CAPES', [10, 4], [3, 1]),
    ])

    expect(text).toBe(
      'No período de 01/01/2023 a 31/12/2026, há 21 bolsas ativas, ' +
        'sendo 15 de Mestrado (5 CNPQ, 10 CAPES) e 6 de Doutorado (2 CNPQ, 4 CAPES). ' +
        'Nesse mesmo período foram finalizadas 6 bolsas, ' +
        'sendo 5 de Mestrado (2 CNPQ, 3 CAPES) e 1 de Doutorado (1 CAPES).'
    )
  })

  it('quando uma agência não tem bolsas numa modalidade, omite a agência dela', () => {
    const text = buildReportSummaryText(period, [
      agency('CNPQ', [0, 3], [0, 0]),
      agency('CAPES', [2, 0], [0, 0]),
      agency('FAPESB', [0, 0], [0, 0]),
    ])

    expect(text).toContain(
      ', há 5 bolsas ativas, sendo 2 de Mestrado (2 CAPES) e 3 de Doutorado (3 CNPQ).'
    )
    expect(text).not.toContain('FAPESB')
  })

  it('quando há uma única bolsa, usa o singular', () => {
    const text = buildReportSummaryText(period, [
      agency('CAPES', [1, 0], [1, 0]),
    ])

    expect(text).toContain(', há 1 bolsa ativa, sendo 1 de Mestrado (1 CAPES).')
    expect(text).toContain(
      'foi finalizada 1 bolsa, sendo 1 de Mestrado (1 CAPES).'
    )
  })

  it('quando não há bolsas no período, informa zero sem detalhar modalidades', () => {
    expect(buildReportSummaryText(period, [])).toBe(
      'No período de 01/01/2023 a 31/12/2026, há 0 bolsas ativas. ' +
        'Nesse mesmo período foram finalizadas 0 bolsas.'
    )
  })

  it('quando não há datas, fala de todo o período', () => {
    const text = buildReportSummaryText(fullPeriod, [
      agency('CAPES', [2, 1], [1, 0]),
    ])

    expect(text).toBe(
      'Em todo o período, há 3 bolsas ativas, sendo 2 de Mestrado (2 CAPES) e 1 de Doutorado (1 CAPES). ' +
        'Nesse mesmo período foi finalizada 1 bolsa, sendo 1 de Mestrado (1 CAPES).'
    )
  })
})

describe('describeReportPeriod', () => {
  const start = new Date(2023, 0, 1)
  const end = new Date(2026, 11, 31)

  it.each([
    [start, end, 'de 01/01/2023 a 31/12/2026'],
    [start, null, 'a partir de 01/01/2023'],
    [null, end, 'até 31/12/2026'],
    [null, null, null],
  ])(
    'quando recebe início %s e fim %s, descreve o período como %s',
    (startDate, endDate, expected) => {
      expect(describeReportPeriod({ startDate, endDate })).toBe(expected)
    }
  )
})
