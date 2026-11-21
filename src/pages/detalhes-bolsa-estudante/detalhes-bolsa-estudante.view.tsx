import { useState } from 'react'
import { ArrowLeft, ExternalLink, Pencil, Trash2 } from 'lucide-react'
import { MdWork } from 'react-icons/md'
import AppLayout from '@/components/app-layout'
import Loading from '@/components/loading'
import { CustomChip } from '@/components'
import { PageHeader } from '@/components/page-header'
import { DetailSection } from '@/components/detail-section'
import { DetailActionButton } from '@/components/detail-action-button'
import { DialogExclusaoBolsaEstudante } from '@/components/dialog-exclusao-bolsa-estudante'
import { InfoItem } from '@/components/info-item'
import { Button } from '@/components/ui/button'
import {
  formatBrazilianCurrency,
  formatCalendarDate,
  formatDate,
} from '@/helpers/formatters.helper'
import type { StudentScholarship } from '@/helpers/student-records.helper'
import {
  FormularioBolsaEstudante,
  type FormularioBolsaEstudanteValues,
} from './components/formulario-bolsa-estudante'
import type { IdentifiedFilterOption } from '@/types'

const NOT_INFORMED = 'Não informado'
const GRID_CLASS =
  'grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3'

function chip(value: string | undefined, type: 'agency' | 'program' | 'status') {
  if (!value) return NOT_INFORMED

  return (
    <span className='inline-block'>
      <CustomChip value={value} type={type} />
    </span>
  )
}

export interface DetalhesBolsaEstudanteViewProps {
  isLoading: boolean
  scholarship: StudentScholarship | null
  startEditing?: boolean
  agencies: IdentifiedFilterOption[]
  allocations: IdentifiedFilterOption[]
  onBack: () => void
  onViewEnrollment: (enrollmentId: number) => void
  onUpdate: (values: FormularioBolsaEstudanteValues) => Promise<boolean>
  onDelete: (scholarshipId: number) => void
}

function DetalhesBolsaEstudanteView({
  isLoading,
  scholarship,
  startEditing = false,
  agencies,
  allocations,
  onBack,
  onViewEnrollment,
  onUpdate,
  onDelete,
}: DetalhesBolsaEstudanteViewProps) {
  const [isEditing, setIsEditing] = useState(startEditing)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const backButton = (
    <Button variant='ghost' onClick={onBack}>
      <ArrowLeft />
      Voltar para a área do estudante
    </Button>
  )

  if (isLoading) {
    return (
      <AppLayout>
        <Loading />
      </AppLayout>
    )
  }

  if (!scholarship) {
    return (
      <AppLayout>
        <div className='flex flex-col items-start gap-4'>
          {backButton}
          <div className='w-full rounded-lg border-2 border-dashed border-gray-200 py-20 text-center'>
            <p className='text-gray-500'>Bolsa não encontrada.</p>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className='mb-4'>{backButton}</div>

      <PageHeader
        title={`Bolsa ${scholarship.agency?.name ?? 'sem agência'}`}
        description={`Matrícula ${scholarship.enrollment_number}`}
        icon={MdWork}
        iconBackgroundClassName='bg-red-400'
        actions={
          !isEditing && (
            <div className='flex items-center gap-2'>
              <DetailActionButton onClick={() => setIsEditing(true)}>
                <Pencil />
                Editar
              </DetailActionButton>
              <DetailActionButton
                variant='destructive'
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 />
                Excluir
              </DetailActionButton>
            </div>
          )
        }
      />

      <DetailSection>
        {isEditing ? (
          <FormularioBolsaEstudante
            scholarship={scholarship}
            agencies={agencies}
            allocations={allocations}
            onCancel={() => setIsEditing(false)}
            onSubmit={onUpdate}
          />
        ) : (
          <dl className={GRID_CLASS}>
            <InfoItem
              label='Agência'
              value={chip(scholarship.agency?.name, 'agency')}
            />
            <InfoItem
              label='Situação'
              value={chip(scholarship.status, 'status')}
            />
            <InfoItem
              label='Alocação'
              value={scholarship.allocation?.name ?? NOT_INFORMED}
            />
            <InfoItem
              label='Início'
              value={formatCalendarDate(scholarship.scholarship_starts_at)}
            />
            <InfoItem
              label='Término'
              value={formatCalendarDate(scholarship.scholarship_ends_at)}
            />
            <InfoItem
              label='Extensão até'
              value={
                scholarship.extension_ends_at
                  ? formatCalendarDate(scholarship.extension_ends_at)
                  : NOT_INFORMED
              }
            />
            <InfoItem
              label='Valor'
              value={
                scholarship.salary !== null
                  ? formatBrazilianCurrency(scholarship.salary)
                  : NOT_INFORMED
              }
            />
            <InfoItem
              label='Criada em'
              value={formatDate(scholarship.created_at)}
            />
            <InfoItem
              label='Atualizada em'
              value={formatDate(scholarship.updated_at)}
            />
          </dl>
        )}
      </DetailSection>

      <DetailSection
        title='Matrícula'
        className='mt-4'
        action={
          <Button
            variant='outline'
            size='sm'
            onClick={() => onViewEnrollment(scholarship.enrollment_id)}
          >
            <ExternalLink />
            Ver matrícula
          </Button>
        }
      >
        <dl className={GRID_CLASS}>
          <InfoItem label='Número' value={scholarship.enrollment_number} />
          <InfoItem
            label='Curso'
            value={chip(scholarship.enrollment_program, 'program')}
          />
        </dl>
      </DetailSection>

      {isDeleteDialogOpen && (
        <DialogExclusaoBolsaEstudante
          isOpen={isDeleteDialogOpen}
          item={scholarship}
          onClose={() => setIsDeleteDialogOpen(false)}
          onSubmit={onDelete}
        />
      )}
    </AppLayout>
  )
}

export { DetalhesBolsaEstudanteView }
