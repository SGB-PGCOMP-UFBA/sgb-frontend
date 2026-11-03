import { formatCalendarDate, toApiDate, toCalendarDate } from './formatters.helper'

export interface DurationWarning {
  message: string
}

const EXPECTED_YEARS: Record<string, number> = {
  MESTRADO: 2,
  DOUTORADO: 4,
}

const PROGRAM_LABEL: Record<string, string> = {
  MESTRADO: 'mestrado',
  DOUTORADO: 'doutorado',
}

type DayInput = string | Date | null | undefined

/**
 * Ultimo dia de uma bolsa com a duracao exata do curso: a vespera do mesmo
 * dia N anos depois (01/03/2026 -> 29/02/2028 no mestrado). Mesma regra do
 * back, que notifica os administradores quando o periodo diverge.
 */
export function getExpectedEndDate(
  startsAt: DayInput,
  program: string | null | undefined
): Date | null {
  const start = toCalendarDate(startsAt)
  const years = program ? EXPECTED_YEARS[program] : undefined
  if (!start || !years) return null

  return new Date(
    start.getFullYear() + years,
    start.getMonth(),
    start.getDate() - 1
  )
}

/**
 * Aviso de bolsa que passa da duracao do curso; `null` quando termina no
 * esperado ou antes (mais curta nao e problema), falta alguma data ou o curso
 * nao e conhecido. So informa: nada deve ser bloqueado por causa dele.
 */
export function getDurationWarning(
  startsAt: DayInput,
  endsAt: DayInput,
  program: string | null | undefined
): DurationWarning | null {
  const expected = toApiDate(getExpectedEndDate(startsAt, program))
  const end = toApiDate(toCalendarDate(endsAt))
  if (!expected || !end || !program || end <= expected) return null

  return {
    message:
      `Duração acima dos ${EXPECTED_YEARS[program]} anos esperados para ` +
      `${PROGRAM_LABEL[program]} (término esperado em ` +
      `${formatCalendarDate(expected)}).`,
  }
}
