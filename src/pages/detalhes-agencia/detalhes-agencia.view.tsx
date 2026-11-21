import { useState } from 'react'
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import { MdBusiness } from 'react-icons/md'
import AppLayout from '@/components/app-layout'
import Loading from '@/components/loading'
import { PageHeader } from '@/components/page-header'
import { DetailSection } from '@/components/detail-section'
import { DetailActionButton } from '@/components/detail-action-button'
import { DialogExclusaoAgencia } from '@/components/dialog-exclusao-agencia'
import { InfoItem } from '@/components/info-item'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/helpers/formatters.helper'
import {
  AGENCY_DELETE_BLOCKED,
  hasLinkedScholarships,
} from '@/helpers/linked-scholarships.helper'
import type { UpdateAgencyPayload } from '@/services/agency'
import { FormularioAgencia } from './components/formulario-agencia'
import type { AgencyDetailed } from '@/types'

const GRID_CLASS =
  'grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3'

export interface DetalhesAgenciaViewProps {
  isLoading: boolean
  agency: AgencyDetailed | null
  startEditing?: boolean
  onBack: () => void
  onUpdate: (values: UpdateAgencyPayload) => Promise<boolean>
  onDelete: (agencyId: number) => void
}

function DetalhesAgenciaView({
  isLoading,
  agency,
  startEditing = false,
  onBack,
  onUpdate,
  onDelete,
}: DetalhesAgenciaViewProps) {
  const [isEditing, setIsEditing] = useState(startEditing)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const backButton = (
    <Button variant='ghost' onClick={onBack}>
      <ArrowLeft />
      Voltar para agências
    </Button>
  )

  if (isLoading) {
    return (
      <AppLayout>
        <Loading />
      </AppLayout>
    )
  }

  if (!agency) {
    return (
      <AppLayout>
        <div className='flex flex-col items-start gap-4'>
          {backButton}
          <div className='w-full rounded-lg border-2 border-dashed border-gray-200 py-20 text-center'>
            <p className='text-gray-500'>Agência não encontrada.</p>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className='mb-4'>{backButton}</div>

      <PageHeader
        title={agency.name}
        description='Agência de fomento'
        icon={MdBusiness}
        iconBackgroundClassName='bg-blue-400'
        actions={
          !isEditing && (
            <div className='flex items-center gap-2'>
              <DetailActionButton onClick={() => setIsEditing(true)}>
                <Pencil />
                Editar
              </DetailActionButton>
              <DetailActionButton
                variant='destructive'
                disabledReason={
                  hasLinkedScholarships(agency)
                    ? AGENCY_DELETE_BLOCKED
                    : undefined
                }
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
          <FormularioAgencia
            agency={agency}
            onCancel={() => setIsEditing(false)}
            onSubmit={onUpdate}
          />
        ) : (
          <dl className={GRID_CLASS}>
            <InfoItem label='Nome' value={agency.name} />
            <div className='sm:col-span-2'>
              <InfoItem label='Descrição' value={agency.description} />
            </div>
            <InfoItem label='Criado em' value={formatDate(agency.created_at)} />
            <InfoItem
              label='Atualizado em'
              value={formatDate(agency.updated_at)}
            />
          </dl>
        )}
      </DetailSection>

      <DetailSection title='Bolsas' className='mt-4'>
        <dl className={GRID_CLASS}>
          <InfoItem
            label='Concedidas para o mestrado'
            value={agency.masters_degree_awarded_scholarships}
          />
          <InfoItem
            label='Alocadas no mestrado'
            value={agency.masters_degree_allocated_scholarships}
          />
          <InfoItem
            label='Vinculadas desde o início'
            value={agency.scholarshipsSinceBeginning}
          />
          <InfoItem
            label='Concedidas para o doutorado'
            value={agency.doctorate_degree_awarded_scholarships}
          />
          <InfoItem
            label='Alocadas no doutorado'
            value={agency.doctorate_degree_allocated_scholarships}
          />
        </dl>
      </DetailSection>

      {isDeleteDialogOpen && (
        <DialogExclusaoAgencia
          isOpen={isDeleteDialogOpen}
          item={agency}
          onClose={() => setIsDeleteDialogOpen(false)}
          onSubmit={onDelete}
        />
      )}
    </AppLayout>
  )
}

export { DetalhesAgenciaView }
