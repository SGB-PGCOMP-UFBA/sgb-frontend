import {
  formatCalendarDate,
  formatDate,
  formDateToApi,
  formatPhone,
  toApiDate,
  toCalendarDate,
} from './formatters.helper'

describe('formatDate', () => {
  it('should format the date correctly', () => {
    const date = '2022-01-01T10:00:00Z'
    const formattedDate = formatDate(date)
    expect(formattedDate).toBe('01/01/2022')
  })
})

describe('formatPhone', () => {
  it('should format the phone number correctly', () => {
    const phone = '71940028922'
    const formattedPhone = formatPhone(phone)
    expect(formattedPhone).toBe('(71) 94002-8922')
  })
})

describe('datas sem horário (meia-noite UTC vinda da API)', () => {
  it('mostra o dia do calendário, e não o dia anterior no fuso do Brasil', () => {
    expect(formatCalendarDate('2026-09-26T00:00:00.000Z')).toBe('26/09/2026')
  })

  it('aceita a data só com o dia', () => {
    expect(formatCalendarDate('2026-09-26')).toBe('26/09/2026')
  })

  it('sem data, devolve texto vazio', () => {
    expect(formatCalendarDate(null)).toBe('')
    expect(formatCalendarDate(undefined)).toBe('')
  })

  it('converte para meia-noite local do mesmo dia, para usar no DateField', () => {
    const date = toCalendarDate('2026-09-26T00:00:00.000Z')

    expect(date).not.toBeNull()
    expect([date?.getFullYear(), date?.getMonth(), date?.getDate()]).toEqual([
      2026, 8, 26,
    ])
    expect(date?.getHours()).toBe(0)
  })

  it('quando o valor não é uma data, devolve null', () => {
    expect(toCalendarDate('abc')).toBeNull()
  })
})

describe('datas enviadas para a API', () => {
  it('toApiDate monta yyyy-MM-dd com o dia local', () => {
    expect(toApiDate(new Date(2027, 4, 11))).toBe('2027-05-11')
    expect(toApiDate(new Date(2027, 4, 11, 23, 59))).toBe('2027-05-11')
  })

  it('toApiDate devolve null sem data ou com data inválida', () => {
    expect(toApiDate(null)).toBeNull()
    expect(toApiDate(undefined)).toBeNull()
    expect(toApiDate(new Date('x'))).toBeNull()
  })

  it('formDateToApi converte o campo dd/MM/yyyy do formulário', () => {
    expect(formDateToApi('11/05/2027')).toBe('2027-05-11')
  })

  it('formDateToApi devolve null para campo vazio ou inválido', () => {
    expect(formDateToApi('')).toBeNull()
    expect(formDateToApi(null)).toBeNull()
    expect(formDateToApi('31/02/2027')).toBeNull()
  })

  // Num navegador a leste de Brasília (ex.: Lisboa), a meia-noite local de
  // 11/05 é 10/05 em UTC; simulamos isso no toISOString do próprio Date.
  function dateWhoseUtcDayIsTheDayBefore() {
    const date = new Date(2027, 4, 11)
    jest.spyOn(date, 'toISOString').mockReturnValue('2027-05-10T23:00:00.000Z')
    return date
  }

  it('a leste de Brasília, toApiDate mantém o dia escolhido', () => {
    expect(toApiDate(dateWhoseUtcDayIsTheDayBefore())).toBe('2027-05-11')
  })

  it('a leste de Brasília, toCalendarDate de um Date usa o dia local', () => {
    const date = toCalendarDate(dateWhoseUtcDayIsTheDayBefore())

    expect([date?.getFullYear(), date?.getMonth(), date?.getDate()]).toEqual([
      2027, 4, 11,
    ])
  })
})
