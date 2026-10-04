import { Check, ClipboardList, Copy, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { DegreeCount } from '@/services/scholarship'
import type { ReportTotals } from '@/pages/relatorio-quadrienal/utils/relatorio-quadrienal-summary'

export interface ResumoRelatorioQuadrienalProps {
  totals: ReportTotals
  summaryText: string | null
  isSummaryTextVisible: boolean
  isSummaryTextCopied: boolean
  onToggleSummaryText: () => void
  onCopySummaryText: () => void
}

interface ResumoStatProps {
  label: string
  counts: DegreeCount
}

function ResumoStat({ label, counts }: ResumoStatProps) {
  return (
    <div className='rounded-lg bg-white px-4 py-3 shadow-sm'>
      <span className='block text-xs font-medium uppercase text-gray-500'>
        {label}
      </span>
      <p className='text-3xl font-bold text-gray-800'>
        {counts.masters + counts.phd}
      </p>
      <span className='text-xs text-gray-500'>
        {counts.masters} Mestrado | {counts.phd} Doutorado
      </span>
    </div>
  )
}

function ResumoRelatorioQuadrienal({
  totals,
  summaryText,
  isSummaryTextVisible,
  isSummaryTextCopied,
  onToggleSummaryText,
  onCopySummaryText,
}: ResumoRelatorioQuadrienalProps) {
  return (
    <section
      aria-labelledby='resumo-relatorio-titulo'
      className='rounded-xl border border-l-4 border-orange-200 border-l-orange-400 bg-orange-50 p-5'
    >
      <div className='mb-4 flex flex-wrap items-center justify-between gap-2'>
        <h3
          id='resumo-relatorio-titulo'
          className='flex items-center gap-2 text-lg font-semibold text-orange-700'
        >
          <ClipboardList className='h-5 w-5' /> Resumo do período
        </h3>
        <Button
          variant='outline'
          aria-expanded={isSummaryTextVisible}
          aria-controls='resumo-relatorio-texto'
          onClick={onToggleSummaryText}
        >
          {isSummaryTextVisible ? <EyeOff /> : <Eye />}
          {isSummaryTextVisible
            ? 'Ocultar resumo em texto'
            : 'Visualizar resumo em texto'}
        </Button>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <ResumoStat label='Bolsas ativas' counts={totals.active} />
        <ResumoStat label='Em andamento' counts={totals.onGoing} />
        <ResumoStat label='Prorrogadas' counts={totals.extended} />
        <ResumoStat label='Finalizadas' counts={totals.finished} />
      </div>
      {isSummaryTextVisible && summaryText && (
        <div
          id='resumo-relatorio-texto'
          className='mt-4 flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm'
        >
          <p className='flex-1 text-base leading-relaxed text-gray-800'>
            {summaryText}
          </p>
          <Button
            variant='ghost'
            aria-live='polite'
            className={isSummaryTextCopied ? 'text-green-600' : undefined}
            onClick={onCopySummaryText}
          >
            {isSummaryTextCopied ? <Check /> : <Copy />}
            {isSummaryTextCopied ? 'Copiado' : 'Copiar'}
          </Button>
        </div>
      )}
    </section>
  )
}

export { ResumoRelatorioQuadrienal }
