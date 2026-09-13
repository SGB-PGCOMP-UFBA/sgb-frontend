import { useMemo, useState } from 'react'
import { ActionIconButton } from '@/components/action-icon-button'
import { KeyRound, Pencil, ShieldCheck, Trash2 } from 'lucide-react'
import { DataTable } from '@/components/data-table'
import type { DataTableColumn } from '@/components/data-table/types'
import { cn } from '@/lib/utils'
import { formatCpf, formatDate, formatPhone } from '../../../helpers/formatters'
import { CustomChip } from '../../../components'
import { DialogExclusaoOrientador } from './DialogExclusaoOrientador'
import { DialogEdicaoOrientador } from './DialogEdicaoOrientador'
import { DialogResetarSenhaOrientador } from './DialogResetarSenhaOrientador'
import { DialogHabilitarPerfilAdministrador } from './DialogHabilitarPerfilAdministrador'
import type { InclusaoOrientadorFormValues } from './DialogInclusaoOrientador'
import type { UpdateAdvisorPayload } from '../../../api/advisor'
import type { ResetPasswordPayload } from '../../../api/password'
import type { AdvisorDetailed } from '../../../types'

const NOT_INFORMED = 'Não informado'

export interface DataGridOrientadoresProps {
  data: AdvisorDetailed[]
  onCreate: (advisor: InclusaoOrientadorFormValues) => void
  onUpdate: (payload: UpdateAdvisorPayload) => void
  onDelete: (advisorId: number) => void
  onChangeProfile: (advisorId: number) => void
  onResetPassword: (payload: ResetPasswordPayload) => void
}

function DataGridOrientadores(props: DataGridOrientadoresProps) {
  const { data, onUpdate, onDelete, onResetPassword, onChangeProfile } = props
  const [isDialogForUpdateOpen, setIsDialogForUpdateOpen] = useState(false)
  const [isDialogForDeleteOpen, setIsDialogForDeleteOpen] = useState(false)
  const [isDialogForAdminProfileOpen, setIsDialogForAdminProfileOpen] = useState(false)
  const [isDialogForPasswordResetOpen, setIsDialogForPasswordResetOpen] = useState(false)
  const [selectedAdvisor, setSelectedAdvisor] = useState<AdvisorDetailed | null>(null)

  const handleDialogForAdminProfileClose = () => {
    setSelectedAdvisor(null)
    setIsDialogForAdminProfileOpen(false)
  }

  const handleDialogForAdminProfileOpen = (value: AdvisorDetailed) => {
    setSelectedAdvisor(value)
    setIsDialogForAdminProfileOpen(true)
  }

  const handleDialogForDeleteClose = () => {
    setSelectedAdvisor(null)
    setIsDialogForDeleteOpen(false)
  }

  const handleDialogForDeleteOpen = (value: AdvisorDetailed) => {
    setSelectedAdvisor(value)
    setIsDialogForDeleteOpen(true)
  }

  const handleDialogForUpdateClose = () => {
    setSelectedAdvisor(null)
    setIsDialogForUpdateOpen(false)
  }

  const handleDialogForUpdateOpen = (value: AdvisorDetailed) => {
    setSelectedAdvisor(value)
    setIsDialogForUpdateOpen(true)
  }

  const handleDialogForPasswordResetClose = () => {
    setSelectedAdvisor(null)
    setIsDialogForPasswordResetOpen(false)
  }

  const handleDialogForPasswordResetOpen = (value: AdvisorDetailed) => {
    setSelectedAdvisor(value)
    setIsDialogForPasswordResetOpen(true)
  }

  const hasEnrollments = (advisor: AdvisorDetailed) => {
    return advisor.enrollmentsCount > 0
  }

  const columns = useMemo<DataTableColumn<AdvisorDetailed>[]>(
    () => [
      {
        id: 'name',
        header: 'Nome completo',
        width: 300,
        cell: (row) => <p className="overflow-auto">{row.name ? row.name : NOT_INFORMED}</p>,
        csv: (row) => row.name
      },
      {
        id: 'status',
        header: 'Situação',
        width: 110,
        cell: (row) => <CustomChip value={row.status} type="status" />,
        csv: (row) => row.status
      },
      {
        id: 'email',
        header: 'E-mail',
        width: 250,
        cell: (row) => <p className="overflow-auto">{row.email ? row.email : NOT_INFORMED}</p>,
        csv: (row) => row.email
      },
      {
        id: 'tax_id',
        header: 'CPF',
        width: 150,
        cell: (row) => (
          <p className="overflow-auto">{row.tax_id ? formatCpf(row.tax_id) : NOT_INFORMED}</p>
        ),
        csv: (row) => row.tax_id
      },
      {
        id: 'phone_number',
        header: 'Telefone',
        width: 150,
        cell: (row) => (row.phone_number ?
          <a
            href={`https://wa.me/${row.phone_number}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline"
          >
            {formatPhone(row.phone_number)}
          </a>
          : <p className="overflow-auto">{NOT_INFORMED}</p>
        ),
        csv: (row) => row.phone_number
      },
      {
        id: 'count_enrollments',
        header: 'Bolsistas Orientados',
        width: 150,
        align: 'center',
        cell: (row) => <p className="overflow-auto">{row.enrollmentsCount}</p>,
        csv: (row) => row.enrollmentsCount
      },
      {
        id: 'createdAt',
        header: 'Criado Em',
        width: 100,
        cell: (row) => formatDate(row.created_at)
      },
      {
        id: 'updatedAt',
        header: 'Atualizado Em',
        width: 120,
        cell: (row) => formatDate(row.updated_at)
      },
      {
        id: 'actions',
        header: 'Ações',
        width: 230,
        cell: (row) => {
          const adminProfileLabel = row.has_admin_privileges
            ? 'Desabilitar Perfil de Administrador'
            : 'Habilitar Perfil de Administrador'

          return (
            <div className="flex items-center gap-x-2 overflow-auto">
              <ActionIconButton
                label={adminProfileLabel}
                icon={ShieldCheck}
                onClick={() => handleDialogForAdminProfileOpen(row)}
                iconClassName={cn(row.has_admin_privileges && 'text-[#3498db]')}
              />
              <ActionIconButton
                label="Resetar Senha do Orientador"
                icon={KeyRound}
                onClick={() => handleDialogForPasswordResetOpen(row)}
              />
              <ActionIconButton
                label="Editar Orientador"
                icon={Pencil}
                onClick={() => handleDialogForUpdateOpen(row)}
              />
              <ActionIconButton
                label={'Excluir Orientador(a)'}
                disabledReason={hasEnrollments(row) ? 'Não é possível excluir este(a) orientador(a) pois ele possui bolsistas relacionados a ele.' : undefined}
                icon={Trash2}
                onClick={() => handleDialogForDeleteOpen(row)}
              />
            </div>
          )
        }
      }
    ],
    []
  )

  return (
    <div>
      <DataTable data={data} columns={columns} csvFileName="orientadores" />

      {selectedAdvisor && (
        <DialogExclusaoOrientador
          isOpen={isDialogForDeleteOpen}
          item={selectedAdvisor}
          onClose={handleDialogForDeleteClose}
          onSubmit={onDelete}
        />
      )}

      {selectedAdvisor && (
        <DialogEdicaoOrientador
          isOpen={isDialogForUpdateOpen}
          item={selectedAdvisor}
          onClose={handleDialogForUpdateClose}
          onSubmit={onUpdate}
        />
      )}

      {selectedAdvisor && (
        <DialogResetarSenhaOrientador
          isOpen={isDialogForPasswordResetOpen}
          item={selectedAdvisor}
          onClose={handleDialogForPasswordResetClose}
          onSubmit={onResetPassword}
        />
      )}

      {selectedAdvisor && (
        <DialogHabilitarPerfilAdministrador
          isOpen={isDialogForAdminProfileOpen}
          item={selectedAdvisor}
          onClose={handleDialogForAdminProfileClose}
          onSubmit={onChangeProfile}
        />
      )}
    </div>
  )
}

export { DataGridOrientadores }
