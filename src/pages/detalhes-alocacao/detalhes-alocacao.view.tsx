import { useState } from 'react'
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import { MdLocationOn } from 'react-icons/md'
import AppLayout from '@/components/app-layout'
import Loading from '@/components/loading'
import { PageHeader } from '@/components/page-header'
import { DetailSection } from '@/components/detail-section'
import { DetailActionButton } from '@/components/detail-action-button'
import { DialogExclusaoAlocacao } from '@/components/dialog-exclusao-alocacao'
import { InfoItem } from '@/components/info-item'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/helpers/formatters.helper'
import {
  ALLOCATION_DELETE_BLOCKED,
  hasLinkedScholarships,
} from '@/helpers/linked-scholarships.helper'
import type { UpdateAllocationPayload } from '@/services/allocation'
import { FormularioAlocacao } from './components/formulario-alocacao'
import type { AllocationDetailed } from '@/types'

const GRID_CLASS =
  'grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3'

export interface DetalhesAlocacaoViewProps {
  isLoading: boolean
  allocation: AllocationDetailed | null
  startEditing?: boolean
  onBack: () => void
  onUpdate: (values: UpdateAllocationPayload) => Promise<boolean>
  onDelete: (allocationId: number) => void
}

function DetalhesAlocacaoView({
  isLoading,
  allocation,
  startEditing = false,
  onBack,
  onUpdate,
  onDelete,
}: DetalhesAlocacaoViewProps) {
  const [isEditing, setIsEditing] = useState(startEditing)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const backButton = (
    <Button variant='ghost' onClick={onBack}>
      <ArrowLeft />
      Voltar para alocaçãos
    </Button>
  )

  if (isLoading) {
    return (
      <AppLayout>
        <Loading />
      </AppLayout>
    )
  }

  if (!allocation) {
    return (
      <AppLayout>
        <div className='flex flex-col items-start gap-4'>
          {backButton}
          <div className='w-full rounded-lg border-2 border-dashed border-gray-200 py-20 text-center'>
            <p className='text-gray-500'>Alocação não encontrada.</p>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className='mb-4'>{backButton}</div>

      <PageHeader
        title={allocation.name}
        description='Alocação de bolsas'
        icon={MdLocationOn}
        iconBackgroundClassName='bg-purple-400'
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
                  hasLinkedScholarships(allocation)
                    ? ALLOCATION_DELETE_BLOCKED
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
          <FormularioAlocacao
            allocation={allocation}
            onCancel={() => setIsEditing(false)}
            onSubmit={onUpdate}
          />
        ) : (
          <dl className={GRID_CLASS}>
            <InfoItem label='Nome' value={allocation.name} />
            <InfoItem label='Criado em' value={formatDate(allocation.created_at)} />
            <InfoItem
              label='Atualizado em'
              value={formatDate(allocation.updated_at)}
            />
          </dl>
        )}
      </DetailSection>

      <DetailSection title='Bolsas' className='mt-4'>
        <dl className={GRID_CLASS}>
          <InfoItem
            label='Alocadas no mestrado'
            value={allocation.masters_degree_allocated_scholarships}
          />
          <InfoItem
            label='Vinculadas desde o início'
            value={allocation.scholarshipsSinceBeginning}
          />
          <InfoItem
            label='Alocadas no doutorado'
            value={allocation.doctorate_degree_allocated_scholarships}
          />
        </dl>
      </DetailSection>

      {isDeleteDialogOpen && (
        <DialogExclusaoAlocacao
          isOpen={isDeleteDialogOpen}
          item={allocation}
          onClose={() => setIsDeleteDialogOpen(false)}
          onSubmit={onDelete}
        />
      )}
    </AppLayout>
  )
}

export { DetalhesAlocacaoView }
