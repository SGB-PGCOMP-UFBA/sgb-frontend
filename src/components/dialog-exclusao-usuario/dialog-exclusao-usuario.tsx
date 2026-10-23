import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { getScholarshipStatusLabel } from '@/constants/status.constant'
import { getUserRoleLabel } from '@/constants/user-role.constant'
import { formatScholarshipPeriod } from '@/helpers/scholarship.helper'
import type { ManagedUser, ScholarshipSummary } from '@/types'

export interface DialogExclusaoUsuarioProps {
  item: ManagedUser
  isOpen: boolean
  onClose: () => void
  onConfirm: (user: ManagedUser) => void
  /**
   * Bolsas ativas (nao finalizadas) do usuario. Com alguma, a exclusao fica
   * bloqueada e o dialogo mostra o link de cada bolsa.
   */
  activeScholarships?: ScholarshipSummary[]
  /** Enquanto as bolsas sao buscadas, a exclusao fica desabilitada. */
  isCheckingScholarships?: boolean
}

function scholarshipTitle(
  scholarship: ScholarshipSummary,
  showStudent: boolean
): string {
  const parts = [
    showStudent ? scholarship.student?.name : null,
    scholarship.agency_name,
    scholarship.enrollment_program,
  ].filter(Boolean)

  return parts.length > 0 ? parts.join(' · ') : `Bolsa #${scholarship.id}`
}

function DialogExclusaoUsuario({
  item,
  isOpen,
  onClose,
  onConfirm,
  activeScholarships = [],
  isCheckingScholarships = false,
}: DialogExclusaoUsuarioProps) {
  const isBlocked = activeScholarships.length > 0
  const showStudent = item.role !== 'STUDENT'

  const confirmAndClose = () => {
    onConfirm(item)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className='sm:max-w-[595px]'>
        <DialogHeader>
          <DialogTitle>Excluir {getUserRoleLabel(item.role)}</DialogTitle>
          <DialogDescription>
            Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-3 text-sm text-gray-700'>
          {isCheckingScholarships ? (
            <p role='status'>Verificando bolsas vinculadas...</p>
          ) : isBlocked ? (
            <>
              <p>
                <b>{item.name}</b> não pode ser excluído(a) porque possui{' '}
                {activeScholarships.length === 1
                  ? '1 bolsa ativa'
                  : `${activeScholarships.length} bolsas ativas`}
                . Finalize ou exclua a bolsa antes de excluir o usuário.
              </p>
              <ul
                aria-label='Bolsas ativas'
                className='divide-y divide-gray-200 rounded-lg border border-gray-200'
              >
                {activeScholarships.map(scholarship => (
                  <li
                    key={scholarship.id}
                    className='flex items-center justify-between gap-3 px-3 py-2'
                  >
                    <div className='min-w-0'>
                      <p className='truncate font-medium text-gray-900'>
                        {scholarshipTitle(scholarship, showStudent)}
                      </p>
                      <p className='text-xs text-gray-500'>
                        {getScholarshipStatusLabel(scholarship.status)} ·{' '}
                        {formatScholarshipPeriod(scholarship)}
                      </p>
                    </div>
                    <Link
                      to={`/bolsas/${scholarship.id}`}
                      onClick={onClose}
                      className='inline-flex shrink-0 items-center gap-1 text-sm font-medium text-sky-700 hover:underline'
                    >
                      Ver bolsa
                      <ExternalLink className='size-3.5' />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <p>
                Você tem certeza que deseja apagar do sistema o usuário{' '}
                <b>{item.name}</b> ({item.email})?
              </p>
              {item.role !== 'ADMIN' && (
                <p>
                  As matrículas e bolsas já encerradas dele serão apagadas
                  junto.
                </p>
              )}
            </>
          )}
        </div>

        <DialogFooter className='gap-x-4'>
          <Button onClick={onClose} variant='ghost' size='sm'>
            {isBlocked ? 'Fechar' : 'Cancelar'}
          </Button>
          <Button
            onClick={confirmAndClose}
            variant='destructive'
            size='sm'
            disabled={isBlocked || isCheckingScholarships}
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { DialogExclusaoUsuario }
