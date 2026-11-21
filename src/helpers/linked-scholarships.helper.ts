import type { AgencyDetailed, AllocationDetailed } from '@/types'

type ScholarshipCounters = Pick<
  AgencyDetailed | AllocationDetailed,
  | 'scholarshipsSinceBeginning'
  | 'masters_degree_allocated_scholarships'
  | 'doctorate_degree_allocated_scholarships'
>

/**
 * Mesma regra do backend: agência ou alocação com bolsa vinculada, mesmo
 * finalizada, não pode ser excluída.
 */
export function hasLinkedScholarships(record: ScholarshipCounters): boolean {
  return (
    record.scholarshipsSinceBeginning > 0 ||
    record.masters_degree_allocated_scholarships > 0 ||
    record.doctorate_degree_allocated_scholarships > 0
  )
}

export const AGENCY_DELETE_BLOCKED =
  'Não é possível excluir esta agência, pois há bolsas vinculadas a ela.'

export const ALLOCATION_DELETE_BLOCKED =
  'Não é possível excluir esta alocação, pois há bolsas vinculadas a ela.'
