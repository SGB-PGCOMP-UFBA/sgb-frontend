import { hasLinkedScholarships } from './linked-scholarships.helper'

const NONE = {
  scholarshipsSinceBeginning: 0,
  masters_degree_allocated_scholarships: 0,
  doctorate_degree_allocated_scholarships: 0,
}

describe('hasLinkedScholarships', () => {
  it('sem bolsa nenhuma, libera a exclusão', () => {
    expect(hasLinkedScholarships(NONE)).toBe(false)
  })

  it.each([
    ['scholarshipsSinceBeginning'],
    ['masters_degree_allocated_scholarships'],
    ['doctorate_degree_allocated_scholarships'],
  ] as const)('com bolsa em %s, bloqueia a exclusão', field => {
    expect(hasLinkedScholarships({ ...NONE, [field]: 1 })).toBe(true)
  })
})
