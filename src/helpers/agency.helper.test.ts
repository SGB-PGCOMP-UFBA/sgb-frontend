import { describeFreeSlots, getFreeSlots } from './agency.helper'
import type { AgencyDetailed } from '@/types'

function agency(overrides: Partial<AgencyDetailed> = {}): AgencyDetailed {
  return {
    id: 1,
    name: 'CAPES',
    masters_degree_awarded_scholarships: 10,
    masters_degree_allocated_scholarships: 7,
    doctorate_degree_awarded_scholarships: 4,
    doctorate_degree_allocated_scholarships: 3,
    ...overrides,
  } as AgencyDetailed
}

describe('getFreeSlots', () => {
  it('sem curso no filtro, traz mestrado e doutorado', () => {
    expect(getFreeSlots(agency(), 'ALL')).toEqual([
      { program: 'MESTRADO', free: 3, overAllocated: 0 },
      { program: 'DOUTORADO', free: 1, overAllocated: 0 },
    ])
  })

  it.each([['MESTRADO'], ['DOUTORADO']])(
    'com %s no filtro, traz só esse curso',
    program => {
      const slots = getFreeSlots(agency(), program)

      expect(slots).toHaveLength(1)
      expect(slots[0].program).toBe(program)
    }
  )

  it('com mais bolsas ocupadas que concedidas, não fica negativo', () => {
    expect(
      getFreeSlots(
        agency({ doctorate_degree_allocated_scholarships: 6 }),
        'DOUTORADO'
      )
    ).toEqual([{ program: 'DOUTORADO', free: 0, overAllocated: 2 }])
  })
})

describe('describeFreeSlots', () => {
  it('resume os cursos e avisa quando passa do concedido', () => {
    expect(
      describeFreeSlots([
        { program: 'MESTRADO', free: 3, overAllocated: 0 },
        { program: 'DOUTORADO', free: 0, overAllocated: 2 },
      ])
    ).toBe('3 de mestrado · 0 de doutorado (2 acima do concedido)')
  })
})
