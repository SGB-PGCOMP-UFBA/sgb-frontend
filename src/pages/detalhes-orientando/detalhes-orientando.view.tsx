import { ArrowLeft } from 'lucide-react'
import { MdPeople } from 'react-icons/md'
import AppLayout from '@/components/app-layout'
import Loading from '@/components/loading'
import { PageHeader } from '@/components/page-header'
import { DetailSection } from '@/components/detail-section'
import { InfoItem } from '@/components/info-item'
import { Button } from '@/components/ui/button'
import { formatCpf, formatPhone } from '@/helpers/formatters.helper'
import { MatriculasOrientando } from './components/matriculas-orientando'
import type { StudentDetailedWithFullRelations } from '@/types'

const NOT_INFORMED = 'Não informado'

export interface DetalhesOrientandoViewProps {
  isLoading: boolean
  student: StudentDetailedWithFullRelations | null
  onBack: () => void
}

function DetalhesOrientandoView({
  isLoading,
  student,
  onBack,
}: DetalhesOrientandoViewProps) {
  const backButton = (
    <Button variant='ghost' onClick={onBack}>
      <ArrowLeft />
      Voltar para orientandos
    </Button>
  )

  if (isLoading) {
    return (
      <AppLayout>
        <Loading />
      </AppLayout>
    )
  }

  if (!student) {
    return (
      <AppLayout>
        <div className='flex flex-col items-start gap-4'>
          {backButton}
          <div className='w-full rounded-lg border-2 border-dashed border-gray-200 py-20 text-center'>
            <p className='text-gray-500'>Orientando(a) não encontrado(a).</p>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className='mb-4'>{backButton}</div>

      <PageHeader
        title={student.name}
        description='Orientando(a)'
        icon={MdPeople}
        iconBackgroundClassName='bg-green-400'
      />

      <DetailSection>
        <dl className='grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3'>
          <InfoItem label='E-mail' value={student.email || NOT_INFORMED} />
          <InfoItem
            label='CPF'
            value={student.tax_id ? formatCpf(student.tax_id) : NOT_INFORMED}
          />
          <InfoItem
            label='Celular'
            value={
              student.phone_number ? (
                <a
                  href={`https://wa.me/${student.phone_number}`}
                  target='_blank'
                  rel='noreferrer'
                  className='text-sky-700 underline'
                >
                  {formatPhone(student.phone_number)}
                </a>
              ) : (
                NOT_INFORMED
              )
            }
          />
          <InfoItem
            label='Lattes'
            value={
              student.link_to_lattes ? (
                <a
                  href={student.link_to_lattes}
                  target='_blank'
                  rel='noreferrer'
                  className='text-sky-700 underline'
                >
                  {student.link_to_lattes}
                </a>
              ) : (
                NOT_INFORMED
              )
            }
          />
        </dl>
      </DetailSection>

      <MatriculasOrientando enrollments={student.enrollments} />
    </AppLayout>
  )
}

export { DetalhesOrientandoView }
