import { useState } from 'react'
import { ArrowLeft, CirclePlus, ExternalLink, Pencil, Trash2 } from 'lucide-react'
import { MdSchool } from 'react-icons/md'
import AppLayout from '@/components/app-layout'
import Loading from '@/components/loading'
import { CustomChip } from '@/components'
import { PageHeader } from '@/components/page-header'
import { DetailSection } from '@/components/detail-section'
import { DetailActionButton } from '@/components/detail-action-button'
import { DialogExclusaoMatricula } from '@/components/dialog-exclusao-matricula'
import { DialogInclusaoBolsa } from '@/components/dialog-inclusao-bolsa'
import type { InclusaoBolsaSubmitValues } from '@/components/dialog-inclusao-bolsa'
import { InfoItem } from '@/components/info-item'
import { Button } from '@/components/ui/button'
import { getUserStatusLabel } from '@/constants/status.constant'
import { formatCalendarDate, formatPhone } from '@/helpers/formatters.helper'
import {
  FormularioMatricula,
  type FormularioMatriculaValues,
} from './components/formulario-matricula'
import type {
  AdvisorFilterOption,
  EnrollmentDetailedWithFullRelations,
  IdentifiedFilterOption,
} from '@/types'

const NOT_INFORMED = 'Não informado'
const GRID_CLASS =
  'grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3'

export interface DetalhesMatriculaViewProps {
  isLoading: boolean
  enrollment: EnrollmentDetailedWithFullRelations | null
  startEditing?: boolean
  advisors: AdvisorFilterOption[]
  agencies: IdentifiedFilterOption[]
  allocations: IdentifiedFilterOption[]
  /** Motivo de não poder incluir bolsa, quando já há uma em andamento. */
  addScholarshipDisabledReason?: string
  onBack: () => void
  onUpdate: (values: FormularioMatriculaValues) => Promise<boolean>
  onCreateScholarship: (values: InclusaoBolsaSubmitValues) => void
  onViewScholarship: (scholarshipId: number) => void
  onDelete: (enrollmentId: number) => void
}

function DetalhesMatriculaView({
  isLoading,
  enrollment,
  startEditing = false,
  advisors,
  agencies,
  allocations,
  addScholarshipDisabledReason,
  onBack,
  onUpdate,
  onCreateScholarship,
  onViewScholarship,
  onDelete,
}: DetalhesMatriculaViewProps) {
  const [isEditing, setIsEditing] = useState(startEditing)
  const [isAddScholarshipOpen, setIsAddScholarshipOpen] = useState(false)
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

  if (!enrollment) {
    return (
      <AppLayout>
        <div className='flex flex-col items-start gap-4'>
          {backButton}
          <div className='w-full rounded-lg border-2 border-dashed border-gray-200 py-20 text-center'>
            <p className='text-gray-500'>Matrícula não encontrada.</p>
          </div>
        </div>
      </AppLayout>
    )
  }

  const { advisor } = enrollment
  const enrollmentNumber = enrollment.enrollment_number.trim()

  return (
    <AppLayout>
      <div className='mb-4'>{backButton}</div>

      <PageHeader
        title={`Matrícula ${enrollmentNumber}`}
        description={
          enrollment.enrollment_program === 'DOUTORADO'
            ? 'Doutorado'
            : 'Mestrado'
        }
        icon={MdSchool}
        iconBackgroundClassName='bg-red-400'
        actions={
          !isEditing && (
            <div className='flex flex-wrap items-center gap-2'>
              <DetailActionButton onClick={() => setIsEditing(true)}>
                <Pencil />
                Editar
              </DetailActionButton>
              <DetailActionButton
                disabledReason={addScholarshipDisabledReason}
                onClick={() => setIsAddScholarshipOpen(true)}
              >
                <CirclePlus />
                Adicionar bolsa
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
          <FormularioMatricula
            enrollment={enrollment}
            advisors={advisors}
            onCancel={() => setIsEditing(false)}
            onSubmit={onUpdate}
          />
        ) : (
          <dl className={GRID_CLASS}>
            <InfoItem label='Número' value={enrollmentNumber} />
            <InfoItem
              label='Curso'
              value={
                <span className='inline-block'>
                  <CustomChip
                    value={enrollment.enrollment_program}
                    type='program'
                  />
                </span>
              }
            />
            <InfoItem
              label='Data da matrícula'
              value={formatCalendarDate(enrollment.enrollment_date)}
            />
            <InfoItem
              label='Previsão de defesa'
              value={
                enrollment.defense_prediction_date
                  ? formatCalendarDate(enrollment.defense_prediction_date)
                  : NOT_INFORMED
              }
            />
          </dl>
        )}
      </DetailSection>

      <DetailSection title='Orientador' className='mt-4'>
        {advisor ? (
          <dl className={GRID_CLASS}>
            <InfoItem label='Nome' value={advisor.name} />
            <InfoItem label='E-mail' value={advisor.email} />
            <InfoItem
              label='Celular'
              value={
                advisor.phone_number ? (
                  <a
                    href={`https://wa.me/${advisor.phone_number}`}
                    target='_blank'
                    rel='noreferrer'
                    className='text-sky-700 underline'
                  >
                    {formatPhone(advisor.phone_number)}
                  </a>
                ) : (
                  NOT_INFORMED
                )
              }
            />
            <InfoItem
              label='Situação'
              value={getUserStatusLabel(advisor.status)}
            />
          </dl>
        ) : (
          <p className='text-sm text-gray-500'>
            Matrícula sem orientador vinculado.
          </p>
        )}
      </DetailSection>

      <DetailSection title='Bolsas' className='mt-4'>
        {enrollment.scholarships.length === 0 ? (
          <p className='text-sm text-gray-500'>
            Nenhuma bolsa vinculada a esta matrícula.
          </p>
        ) : (
          <ul className='divide-y divide-gray-100'>
            {enrollment.scholarships.map(scholarship => (
              <li
                key={scholarship.id}
                className='flex flex-wrap items-center justify-between gap-3 py-3'
              >
                <div className='flex flex-wrap items-center gap-3 text-sm text-gray-900'>
                  <span className='inline-block'>
                    <CustomChip
                      value={scholarship.agency?.name ?? ''}
                      type='agency'
                    />
                  </span>
                  <span className='inline-block'>
                    <CustomChip value={scholarship.status} type='status' />
                  </span>
                  <span>
                    {formatCalendarDate(scholarship.scholarship_starts_at)} a{' '}
                    {formatCalendarDate(scholarship.scholarship_ends_at)}
                  </span>
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  aria-label={`Ver bolsa ${scholarship.agency?.name ?? ''}`.trim()}
                  onClick={() => onViewScholarship(scholarship.id)}
                >
                  <ExternalLink />
                  Ver bolsa
                </Button>
              </li>
            ))}
          </ul>
        )}
      </DetailSection>

      {isAddScholarshipOpen && (
        <DialogInclusaoBolsa
          isOpen={isAddScholarshipOpen}
          onClose={() => setIsAddScholarshipOpen(false)}
          onSubmit={onCreateScholarship}
          agencies={agencies}
          allocations={allocations}
          enrollment={enrollment}
        />
      )}

      {isDeleteDialogOpen && (
        <DialogExclusaoMatricula
          isOpen={isDeleteDialogOpen}
          item={enrollment}
          onClose={() => setIsDeleteDialogOpen(false)}
          onSubmit={onDelete}
        />
      )}
    </AppLayout>
  )
}

export { DetalhesMatriculaView }
