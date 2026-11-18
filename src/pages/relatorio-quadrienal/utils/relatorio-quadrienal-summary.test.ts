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

/**
 * Monta a agência a partir dos baldes de status. `ongoing` é o que sobra das
 * bolsas do período depois das finalizadas, para os testes falarem em
 * "bolsas no período" como o resumo fala.
 */
function agency(
  agencyName: string,
  inPeriod: [number, number],
  finished: [number, number],
  extended: [number, number] = [0, 0]
): AgencyScholarshipReport {
  const onGoing: [number, number] = [
    inPeriod[0] - finished[0] - extended[0],
    inPeriod[1] - finished[1] - extended[1],
  ]

  return {
    agencyName,
    scholarshipsTotal: inPeriod[0] + inPeriod[1],
    totalMasters: inPeriod[0],
    totalPhd: inPeriod[1],
    onGoingCount: { masters: onGoing[0], phd: onGoing[1] },
    extendedCount: { masters: extended[0], phd: extended[1] },
    finishedCount: { masters: finished[0], phd: finished[1] },
  }
}

describe('sumReportTotals', () => {
  it('quando há várias agências, soma cada status por modalidade', () => {
    const totals = sumReportTotals([
      agency('CNPQ', [5, 2], [2, 0], [1, 1]),
      agency('CAPES', [10, 4], [3, 1], [1, 1]),
    ])

    expect(totals).toEqual({
      total: { masters: 15, phd: 6 },
      onGoing: { masters: 8, phd: 3 },
      extended: { masters: 2, phd: 2 },
      finished: { masters: 5, phd: 1 },
    })
  })

  it('o total do período fecha com a soma de andamento, prorrogadas e finalizadas', () => {
    const { total, onGoing, extended, finished } = sumReportTotals([
      agency('CNPQ', [5, 2], [2, 0], [1, 1]),
      agency('OUTRAS', [3, 1], [0, 1], [2, 0]),
    ])

    expect(total).toEqual({
      masters: onGoing.masters + extended.masters + finished.masters,
      phd: onGoing.phd + extended.phd + finished.phd,
    })
  })

  it('o total vem dos baldes, mesmo que o total geral recebido esteja diferente', () => {
    const capes = {
      ...agency('CAPES', [4, 2], [1, 0]),
      scholarshipsTotal: 99,
      totalMasters: 90,
      totalPhd: 9,
    }

    expect(sumReportTotals([capes]).total).toEqual({ masters: 4, phd: 2 })
  })

  it('quando não há agências, devolve tudo zerado', () => {
    expect(sumReportTotals([]).total).toEqual({ masters: 0, phd: 0 })
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
