import {
  describeFreeSlots,
  getFreeSlots,
} from '@/helpers/agency.helper'
import type { AgencyDetailed } from '@/types'

export interface ResumoVagasLivresProps {
  agencies: AgencyDetailed[]
  /** Agencia do filtro; "ALL" nao mostra o resumo. */
  agencyName: string
  /** Curso do filtro; "ALL" mostra mestrado e doutorado. */
  programName: string
}

/** Vagas livres da agencia filtrada, no header da pagina de bolsas. */
function ResumoVagasLivres({
  agencies,
  agencyName,
  programName,
}: ResumoVagasLivresProps) {
  if (agencyName === 'ALL') return null

  const agency = agencies.find(item => item.name === agencyName)
  if (!agency) return null

  return (
    <p role='status' className='mt-1 text-sm text-gray-700'>
      <span className='font-semibold'>Vagas livres na {agency.name}:</span>{' '}
      {describeFreeSlots(getFreeSlots(agency, programName))}
    </p>
  )
}

export { ResumoVagasLivres }
