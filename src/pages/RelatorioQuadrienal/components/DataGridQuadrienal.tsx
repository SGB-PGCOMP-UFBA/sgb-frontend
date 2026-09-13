import './styles.css'
import { FileText } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import type { AgencyScholarshipReport, DegreeCount } from '@/api/scholarship'

export interface DataGridQuadrienalProps {
  data: AgencyScholarshipReport[]
}

interface StatusRowProps {
  label: string
  counts: DegreeCount
}

function DataGridQuadrienal({ data }: DataGridQuadrienalProps) {
  const StatusRow = ({ label, counts }: StatusRowProps) => (
    <div className='flex justify-between border-b border-gray-50 py-1 last:border-0'>
      <p className='text-sm font-medium text-gray-600'>{label}:</p>
      <p className='text-sm text-gray-800'>
        {counts.masters} Mestrado | {counts.phd} Doutorado
        <span className='ml-2 font-bold text-blue-600'>
          (Total: {counts.masters + counts.phd})
        </span>
      </p>
    </div>
  )

  return (
    <div>
      <div className='space-y-6'>
        <h3 className='flex items-center gap-2 text-xl font-medium text-gray-700'>
          <FileText className='h-6 w-6 text-gray-600' /> Detalhamento por Agência
          de Fomento
        </h3>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {data.map(agency => (
            <div key={agency.agencyName}>
              <div className='rounded-xl border border-gray-200 bg-gray-50/50 p-5 transition-shadow hover:shadow-md'>
                <div className='mb-3 flex items-center justify-between'>
                  <h4 className='text-2xl font-bold text-orange-600'>
                    {agency.agencyName}
                  </h4>
                  <div className='text-right'>
                    <span className='block text-xs uppercase text-gray-500'>
                      Total Geral
                    </span>
                    <p className='text-xl font-bold'>
                      {agency.scholarshipsTotal}
                    </p>
                    <span className='text-xs text-gray-400'>
                      (M: {agency.totalMasters} | D: {agency.totalPhd})
                    </span>
                  </div>
                </div>

                <Separator className='mb-4' />

                <div className='space-y-2'>
                  <StatusRow
                    label='Bolsas Concluídas'
                    counts={agency.finishedCount}
                  />
                  <StatusRow
                    label='Bolsas em Andamento'
                    counts={agency.onGoingCount}
                  />
                  <StatusRow
                    label='Bolsas Ativas'
                    counts={agency.activeCount}
                  />
                  <StatusRow
                    label='Bolsas Prorrogadas'
                    counts={agency.extendedCount}
                  />
                  <StatusRow
                    label='Bolsas Inativas'
                    counts={agency.inactiveCount}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { DataGridQuadrienal }
