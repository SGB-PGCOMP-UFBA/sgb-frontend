import type { AgencyDetailed } from '@/types'

export type SlotProgram = 'MESTRADO' | 'DOUTORADO'

export interface ProgramFreeSlots {
  program: SlotProgram
  /** Vagas concedidas ainda nao ocupadas; nunca negativo. */
  free: number
  /** Bolsas ocupando vaga alem do concedido (0 quando cabe). */
  overAllocated: number
}

const PROGRAM_LABEL: Record<SlotProgram, string> = {
  MESTRADO: 'mestrado',
  DOUTORADO: 'doutorado',
}

/**
 * Vagas livres da agencia por curso: concedidas menos ocupadas, como o
 * `GET /v1/agency` calcula. Com curso no filtro, so ele; sem, os dois.
 */
export function getFreeSlots(
  agency: AgencyDetailed,
  programName: string
): ProgramFreeSlots[] {
  const programs: SlotProgram[] =
    programName === 'MESTRADO' || programName === 'DOUTORADO'
      ? [programName]
      : ['MESTRADO', 'DOUTORADO']

  return programs.map(program => {
    const awarded =
      program === 'MESTRADO'
        ? agency.masters_degree_awarded_scholarships
        : agency.doctorate_degree_awarded_scholarships
    const allocated =
      program === 'MESTRADO'
        ? agency.masters_degree_allocated_scholarships
        : agency.doctorate_degree_allocated_scholarships
    const difference = (awarded ?? 0) - (allocated ?? 0)

    return {
      program,
      free: Math.max(difference, 0),
      overAllocated: Math.max(-difference, 0),
    }
  })
}

/** Ex.: "3 de mestrado · 0 de doutorado (2 acima do concedido)". */
export function describeFreeSlots(slots: ProgramFreeSlots[]): string {
  return slots
    .map(({ program, free, overAllocated }) => {
      const base = `${free} de ${PROGRAM_LABEL[program]}`
      return overAllocated > 0
        ? `${base} (${overAllocated} acima do concedido)`
        : base
    })
    .join(' · ')
}
