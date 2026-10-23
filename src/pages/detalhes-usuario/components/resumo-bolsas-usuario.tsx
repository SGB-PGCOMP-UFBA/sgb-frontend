import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { filterActiveScholarships } from '@/helpers/scholarship.helper'
import type { ScholarshipSummary } from '@/types'

export interface ResumoBolsasUsuarioProps {
  scholarships: ScholarshipSummary[]
  isLoading: boolean
  hasError: boolean
  onViewScholarships: () => void
}

function plural(count: number, singular: string, pluralForm: string) {
  return `${count} ${count === 1 ? singular : pluralForm}`
}

/** Quantas bolsas o usuario tem e o atalho para a pagina de bolsas filtrada. */
function ResumoBolsasUsuario({
  scholarships,
  isLoading,
  hasError,
  onViewScholarships,
}: ResumoBolsasUsuarioProps) {
  if (isLoading) {
    return (
      <p role='status' className='text-sm text-gray-500'>
        Carregando bolsas...
      </p>
    )
  }

  if (hasError) {
    return (
      <p className='text-sm text-red-600'>
        Não foi possível carregar as bolsas deste usuário.
      </p>
    )
  }

  const total = scholarships.length
  const active = filterActiveScholarships(scholarships).length

  return (
    <div className='flex flex-wrap items-center justify-between gap-4'>
      <div>
        <p className='text-2xl font-semibold text-gray-900'>
          {plural(total, 'bolsa', 'bolsas')}
        </p>
        <p className='text-sm text-gray-500'>
          {total === 0
            ? 'Nenhuma bolsa vinculada a este usuário.'
            : `${plural(active, 'ativa', 'ativas')} · ${plural(
                total - active,
                'finalizada',
                'finalizadas'
              )}`}
        </p>
      </div>
      {total > 0 && (
        <Button variant='outline' onClick={onViewScholarships}>
          <ExternalLink />
          Visualizar bolsas
        </Button>
      )}
    </div>
  )
}

export { ResumoBolsasUsuario }
