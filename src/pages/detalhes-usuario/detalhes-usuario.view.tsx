import { useState } from 'react'
import { ArrowLeft, Pencil, Trash2, UserCheck, UserX } from 'lucide-react'
import { MdManageAccounts } from 'react-icons/md'
import AppLayout from '@/components/app-layout'
import Loading from '@/components/loading'
import { CustomChip } from '@/components'
import { PageHeader } from '@/components/page-header'
import { DialogExclusaoUsuario } from '@/components/dialog-exclusao-usuario'
import { DialogSituacaoUsuario } from '@/components/dialog-situacao-usuario'
import { DetailSection } from '@/components/detail-section'
import { InfoItem } from '@/components/info-item'
import { UserFormFields } from '@/components/user-form-fields'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { getUserRoleLabel } from '@/constants/user-role.constant'
import { formatCpf, formatDate, formatPhone } from '@/helpers/formatters.helper'
import { readFormValues } from '@/helpers/form-values.helper'
import { useFormChanges } from '@/hooks/use-form-changes'
import {
  isAdvisorRole,
  isStudentRole,
  type ManagedUserFormValues,
} from '@/helpers/managed-user.helper'
import { filterActiveScholarships } from '@/helpers/scholarship.helper'
import type { UserScholarshipsState } from '@/hooks/use-user-scholarships'
import { ResumoBolsasUsuario } from './components/resumo-bolsas-usuario'
import type { ManagedUser } from '@/types'

const NOT_INFORMED = 'Não informado'

export interface DetalhesUsuarioViewProps {
  isLoading: boolean
  user: ManagedUser | null
  startEditing?: boolean
  disabledReason?: string
  onBack: () => void
  onUpdate: (values: ManagedUserFormValues) => Promise<boolean>
  onToggleStatus: (user: ManagedUser) => void
  onDelete: (user: ManagedUser) => void
  /** Bolsas do usuario; ausente para administradores. */
  scholarships?: UserScholarshipsState
  /** Abre a pagina de bolsas filtrada por este usuario. */
  onViewScholarships: () => void
}

interface ActionButtonProps {
  disabledReason?: string
  children: React.ReactNode
  variant?: 'outline' | 'destructive'
  onClick: () => void
}

function ActionButton({
  disabledReason,
  children,
  variant = 'outline',
  onClick,
}: ActionButtonProps) {
  const button = (
    <Button
      variant={variant}
      aria-disabled={Boolean(disabledReason) || undefined}
      className={disabledReason ? 'cursor-not-allowed opacity-50' : undefined}
      onClick={disabledReason ? undefined : onClick}
    >
      {children}
    </Button>
  )

  if (!disabledReason) return button

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent className='max-w-xs text-center'>
        {disabledReason}
      </TooltipContent>
    </Tooltip>
  )
}

function DetalhesUsuarioView({
  isLoading,
  user,
  startEditing = false,
  disabledReason,
  onBack,
  onUpdate,
  onToggleStatus,
  onDelete,
  scholarships,
  onViewScholarships,
}: DetalhesUsuarioViewProps) {
  const [isEditingRequested, setIsEditing] = useState(startEditing)
  const isEditing = isEditingRequested && !disabledReason
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false)
  const { formProps, hasChanges } = useFormChanges()

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!hasChanges(event.currentTarget)) {
      setIsEditing(false)
      return
    }

    const values = readFormValues<ManagedUserFormValues>(
      new FormData(event.currentTarget)
    )

    setIsSaving(true)
    const saved = await onUpdate(values)
    setIsSaving(false)

    if (saved) setIsEditing(false)
  }

  const backButton = (
    <Button variant='ghost' onClick={onBack}>
      <ArrowLeft />
      Voltar para usuários
    </Button>
  )

  if (isLoading) {
    return (
      <AppLayout>
        <Loading />
      </AppLayout>
    )
  }

  if (!user) {
    return (
      <AppLayout>
        <div className='flex flex-col items-start gap-4'>
          {backButton}
          <div className='w-full rounded-lg border-2 border-dashed border-gray-200 py-20 text-center'>
            <p className='text-gray-500'>Usuário não encontrado.</p>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className='mb-4'>{backButton}</div>

      <PageHeader
        title={user.name}
        description={getUserRoleLabel(user.role)}
        icon={MdManageAccounts}
        iconBackgroundClassName='bg-indigo-400'
        actions={
          !isEditing && (
            <div className='flex items-center gap-2'>
              <ActionButton
                disabledReason={disabledReason}
                onClick={() => setIsEditing(true)}
              >
                <Pencil />
                Editar
              </ActionButton>
              {user.status && (
                <ActionButton
                  disabledReason={disabledReason}
                  onClick={() => setIsStatusDialogOpen(true)}
                >
                  {user.status === 'ACTIVE' ? <UserX /> : <UserCheck />}
                  {user.status === 'ACTIVE' ? 'Inativar' : 'Ativar'}
                </ActionButton>
              )}
              <ActionButton
                variant='destructive'
                disabledReason={disabledReason}
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 />
                Excluir
              </ActionButton>
            </div>
          )
        }
      />

      <DetailSection>
        {isEditing ? (
          <form {...formProps} onSubmit={submit}>
            <UserFormFields
              role={user.role}
              defaultValues={user}
              idPrefix='details-user'
            />
            <div className='mt-6 flex justify-end gap-2 border-t border-gray-200 pt-4'>
              <Button
                type='button'
                variant='ghost'
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </Button>
              <Button
                type='submit'
                disabled={isSaving}
                className='bg-green-600 text-white hover:bg-green-700'
              >
                {isSaving ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </form>
        ) : (
          <dl className='grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3'>
            <InfoItem label='Perfil' value={getUserRoleLabel(user.role)} />
            {isAdvisorRole(user.role) || user.role === 'ADMIN' ? (
              <InfoItem
                label='Situação'
                value={
                  user.status ? (
                    <span className='inline-block'>
                      <CustomChip value={user.status} type='user-status' />
                    </span>
                  ) : (
                    NOT_INFORMED
                  )
                }
              />
            ) : null}
            <InfoItem label='E-mail' value={user.email} />
            <InfoItem
              label='CPF'
              value={user.tax_id ? formatCpf(user.tax_id) : NOT_INFORMED}
            />
            <InfoItem
              label='Telefone'
              value={
                user.phone_number
                  ? formatPhone(user.phone_number)
                  : NOT_INFORMED
              }
            />
            {isStudentRole(user.role) && (
              <InfoItem
                label='Lattes'
                value={
                  user.link_to_lattes ? (
                    <a
                      href={user.link_to_lattes}
                      target='_blank'
                      rel='noreferrer'
                      className='text-sky-700 underline'
                    >
                      {user.link_to_lattes}
                    </a>
                  ) : (
                    NOT_INFORMED
                  )
                }
              />
            )}
            <InfoItem label='Criado em' value={formatDate(user.created_at)} />
            <InfoItem
              label='Atualizado em'
              value={formatDate(user.updated_at)}
            />
          </dl>
        )}
      </DetailSection>

      {scholarships && (
        <DetailSection title='Bolsas' className='mt-4'>
          <ResumoBolsasUsuario
            scholarships={scholarships.scholarships}
            isLoading={scholarships.isLoading}
            hasError={scholarships.hasError}
            onViewScholarships={onViewScholarships}
          />
        </DetailSection>
      )}

      {isStatusDialogOpen && (
        <DialogSituacaoUsuario
          isOpen={isStatusDialogOpen}
          item={user}
          onClose={() => setIsStatusDialogOpen(false)}
          onConfirm={onToggleStatus}
        />
      )}

      {isDeleteDialogOpen && (
        <DialogExclusaoUsuario
          isOpen={isDeleteDialogOpen}
          item={user}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={onDelete}
          activeScholarships={filterActiveScholarships(
            scholarships?.scholarships ?? []
          )}
          isCheckingScholarships={scholarships?.isLoading}
        />
      )}
    </AppLayout>
  )
}

export { DetalhesUsuarioView }
