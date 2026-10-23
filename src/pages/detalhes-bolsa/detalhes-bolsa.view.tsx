import { useState } from 'react'
import { ArrowLeft, ExternalLink, Pencil, Trash2 } from 'lucide-react'
import { MdWork } from 'react-icons/md'
import AppLayout from '@/components/app-layout'
import Loading from '@/components/loading'
import { CustomChip } from '@/components'
import { PageHeader } from '@/components/page-header'
import { DetailSection } from '@/components/detail-section'
import { InfoItem } from '@/components/info-item'
import { DialogExclusaoBolsa } from '@/components/dialog-exclusao-bolsa'
import { Button } from '@/components/ui/button'
import {
  formatBrazilianCurrency,
  formatCalendarDate,
  formatDate,
} from '@/helpers/formatters.helper'
import type { ScholarshipFormValues } from '@/helpers/scholarship.helper'
import type { ScholarshipDetailedWithRelations } from '@/types'
import {
  FormularioBolsa,
  type ScholarshipFormOptions,
} from './components/formulario-bolsa'

const NOT_INFORMED = 'Não informado'

export interface DetalhesBolsaViewProps {
  isLoading: boolean
  scholarship: ScholarshipDetailedWithRelations | null
  startEditing?: boolean
  formOptions: ScholarshipFormOptions
  onBack: () => void
  onViewUser: (userId: number) => void
  onUpdate: (values: ScholarshipFormValues) => Promise<boolean>
  onDelete: (scholarshipId: number) => void
}

const GRID_CLASS =
  'grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3'

function orNotInformed(value: React.ReactNode) {
  return value === null || value === undefined || value === ''
    ? NOT_INFORMED
    : value
}

function chip(
  value: string | undefined,
  type: 'agency' | 'program' | 'status'
) {
  if (!value) return NOT_INFORMED

  return (
    <span className='inline-block'>
      <CustomChip value={value} type={type} />
    </span>
  )
}

interface PersonSectionProps {
  title: string
  person: { id: number; name: string } | null
  emptyMessage: string
  onViewUser: (userId: number) => void
}

/** Bolsista ou orientador: so o nome e o atalho para a pagina do usuario. */
function PersonSection({
  title,
  person,
  emptyMessage,
  onViewUser,
}: PersonSectionProps) {
  return (
    <DetailSection title={title}>
      {person ? (
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <p className='text-sm font-medium text-gray-900'>{person.name}</p>
          <Button
            variant='outline'
            size='sm'
            aria-label={`Ver usuário de ${person.name}`}
            onClick={() => onViewUser(person.id)}
          >
            <ExternalLink />
            Ver usuário
          </Button>
        </div>
      ) : (
        <p className='text-sm text-gray-500'>{emptyMessage}</p>
      )}
    </DetailSection>
  )
}

function DetalhesBolsaView({
  isLoading,
  scholarship,
  startEditing = false,
  formOptions,
  onBack,
  onViewUser,
  onUpdate,
  onDelete,
}: DetalhesBolsaViewProps) {
  const [isEditing, setIsEditing] = useState(startEditing)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const backButton = (
    <Button variant='ghost' onClick={onBack}>
      <ArrowLeft />
      Voltar para bolsas
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

  const { student, advisor, enrollment, agency, allocation } = scholarship
  const canEdit = Boolean(enrollment && student)
  const description = [agency?.name, enrollment?.enrollment_program]
    .filter(Boolean)
    .join(' · ')

  return (
    <AppLayout>
      <div className='mb-4'>{backButton}</div>

      <PageHeader
        title={`Bolsa de ${student?.name ?? 'bolsista não informado'}`}
        description={description || 'Detalhes da bolsa'}
        icon={MdWork}
        iconBackgroundClassName='bg-green-400'
        actions={
          !(isEditing && canEdit) && (
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                disabled={!canEdit}
                title={
                  canEdit
                    ? undefined
                    : 'Bolsa sem matrícula ou bolsista vinculado.'
                }
                onClick={() => setIsEditing(true)}
              >
                <Pencil />
                Editar
              </Button>
              <Button
                variant='destructive'
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 />
                Excluir
              </Button>
            </div>
          )
        }
      />

      {isEditing && canEdit ? (
        <FormularioBolsa
          scholarship={scholarship}
          options={formOptions}
          onCancel={() => setIsEditing(false)}
          onSubmit={onUpdate}
        />
      ) : (
        <div className='flex flex-col gap-4'>
          <DetailSection title='Bolsa'>
            <dl className={GRID_CLASS}>
              <InfoItem
                label='Status'
                value={chip(scholarship.status, 'status')}
              />
              <InfoItem label='Agência' value={chip(agency?.name, 'agency')} />
              <InfoItem
                label='Alocação'
                value={orNotInformed(allocation?.name)}
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
                label='Extensão'
                value={
                  scholarship.extension_ends_at
                    ? formatCalendarDate(scholarship.extension_ends_at)
                    : 'Sem extensão'
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
          </DetailSection>

          <DetailSection title='Matrícula'>
            {enrollment ? (
              <dl className={GRID_CLASS}>
                <InfoItem label='Número' value={enrollment.enrollment_number} />
                <InfoItem
                  label='Curso'
                  value={chip(enrollment.enrollment_program, 'program')}
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
            ) : (
              <p className='text-sm text-gray-500'>Matrícula não encontrada.</p>
            )}
          </DetailSection>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <PersonSection
              title='Bolsista'
              person={student}
              emptyMessage='Bolsista não encontrado.'
              onViewUser={onViewUser}
            />
            <PersonSection
              title='Orientador'
              person={advisor}
              emptyMessage='Orientador não encontrado.'
              onViewUser={onViewUser}
            />
          </div>
        </div>
      )}

      {isDeleteDialogOpen && (
        <DialogExclusaoBolsa
          item={scholarship}
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onSubmit={onDelete}
        />
      )}
    </AppLayout>
  )
}

export { DetalhesBolsaView }
