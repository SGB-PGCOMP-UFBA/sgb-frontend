import { useMemo, useState } from 'react'
import { CustomChip } from '@/components'
import { DataTable } from '@/components/data-table'
import type { DataTableColumn } from '@/components/data-table/data-table.type'
import { getUserRoleLabel } from '@/constants/user-role.constant'
import { formatCpf, formatDate, formatPhone } from '@/helpers/formatters.helper'
import { DialogExclusaoUsuario } from '@/components/dialog-exclusao-usuario'
import { DialogSituacaoUsuario } from '@/components/dialog-situacao-usuario'
import { MenuAcoesUsuario } from './menu-acoes-usuario'
import type { ManagedUser } from '@/types'

const NOT_INFORMED = 'Não informado'

export interface DataGridUsuariosProps {
  data: ManagedUser[]
  getDisabledReason: (user: ManagedUser) => string | undefined
  onView: (user: ManagedUser) => void
  onEdit: (user: ManagedUser) => void
  onToggleStatus: (user: ManagedUser) => void
  onDelete: (user: ManagedUser) => void
}

function DataGridUsuarios({
  data,
  getDisabledReason,
  onView,
  onEdit,
  onToggleStatus,
  onDelete,
}: DataGridUsuariosProps) {
  const [statusUser, setStatusUser] = useState<ManagedUser | null>(null)
  const [deletingUser, setDeletingUser] = useState<ManagedUser | null>(null)

  const columns = useMemo<DataTableColumn<ManagedUser>[]>(
    () => [
      {
        id: 'name',
        header: 'Nome completo',
        width: 280,
        cell: row => <p className='overflow-auto'>{row.name}</p>,
        csv: row => row.name,
      },
      {
        id: 'role',
        header: 'Perfil',
        width: 200,
        cell: row => (
          <p className='overflow-auto'>{getUserRoleLabel(row.role)}</p>
        ),
        csv: row => getUserRoleLabel(row.role),
      },
      {
        id: 'status',
        header: 'Situação',
        width: 110,
        cell: row =>
          row.status ? (
            <CustomChip value={row.status} type='user-status' />
          ) : (
            <p className='overflow-auto text-center'>-</p>
          ),
        csv: row => row.status,
      },
      {
        id: 'email',
        header: 'E-mail',
        width: 250,
        cell: row => <p className='overflow-auto'>{row.email}</p>,
        csv: row => row.email,
      },
      {
        id: 'tax_id',
        header: 'CPF',
        width: 150,
        cell: row => (
          <p className='overflow-auto'>
            {row.tax_id ? formatCpf(row.tax_id) : NOT_INFORMED}
          </p>
        ),
        csv: row => row.tax_id,
      },
      {
        id: 'phone_number',
        header: 'Telefone',
        width: 150,
        cell: row => (
          <p className='overflow-auto'>
            {row.phone_number ? formatPhone(row.phone_number) : NOT_INFORMED}
          </p>
        ),
        csv: row => row.phone_number,
      },
      {
        id: 'createdAt',
        header: 'Criado Em',
        width: 100,
        cell: row => formatDate(row.created_at),
      },
      {
        id: 'updatedAt',
        header: 'Atualizado Em',
        width: 120,
        cell: row => formatDate(row.updated_at),
      },
      {
        id: 'actions',
        header: 'Ações',
        width: 96,
        cell: row => (
          <MenuAcoesUsuario
            user={row}
            disabledReason={getDisabledReason(row)}
            onView={onView}
            onEdit={onEdit}
            onToggleStatus={setStatusUser}
            onDelete={setDeletingUser}
          />
        ),
      },
    ],
    [getDisabledReason, onView, onEdit]
  )

  return (
    <div>
      <DataTable
        data={data}
        columns={columns}
        csvFileName='usuarios'
        initialPageSize={10}
      />

      {statusUser && (
        <DialogSituacaoUsuario
          isOpen={Boolean(statusUser)}
          item={statusUser}
          onClose={() => setStatusUser(null)}
          onConfirm={onToggleStatus}
        />
      )}

      {deletingUser && (
        <DialogExclusaoUsuario
          isOpen={Boolean(deletingUser)}
          item={deletingUser}
          onClose={() => setDeletingUser(null)}
          onConfirm={onDelete}
        />
      )}
    </div>
  )
}

export { DataGridUsuarios }
