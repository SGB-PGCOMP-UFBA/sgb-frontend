import {
  formatCalendarDate,
  formatDate,
  formatPhone,
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
    const phone = '71940028922';
    const formattedPhone = formatPhone(phone);
    expect(formattedPhone).toBe('(71) 94002-8922');
  });
});

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
