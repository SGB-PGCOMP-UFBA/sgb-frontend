import { UserPlus } from 'lucide-react'
import { MdManageAccounts } from 'react-icons/md'
import AppLayout from '@/components/app-layout'
import Loading from '@/components/loading'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { DataGridUsuarios } from './components/data-grid-usuarios'
import { FiltrosUsuarios } from './components/filtros-usuarios'
import type { ManagedUser, UserFilters } from '@/types'

export interface GerenciamentoUsuariosViewProps {
  isLoading: boolean
  data: ManagedUser[]
  getDisabledReason: (user: ManagedUser) => string | undefined
  onSearch: (filters: UserFilters) => void
  onView: (user: ManagedUser) => void
  onCreate: () => void
  onEdit: (user: ManagedUser) => void
  onToggleStatus: (user: ManagedUser) => void
  onDelete: (user: ManagedUser) => void
}

function GerenciamentoUsuariosView({
  isLoading,
  data,
  getDisabledReason,
  onSearch,
  onView,
  onCreate,
  onEdit,
  onToggleStatus,
  onDelete,
}: GerenciamentoUsuariosViewProps) {
  return (
    <AppLayout>
      <PageHeader
        title='Usuários'
        description='Visualização e Gestão de Usuários do Sistema'
        icon={MdManageAccounts}
        iconBackgroundClassName='bg-indigo-400'
        actions={
          <Button
            className='bg-indigo-500 text-white hover:bg-indigo-600'
            onClick={onCreate}
          >
            <UserPlus />
            Novo usuário
          </Button>
        }
      />
      <FiltrosUsuarios isLoading={isLoading} onSearch={onSearch} />
      {isLoading ? (
        <Loading />
      ) : (
        <DataGridUsuarios
          data={data}
          getDisabledReason={getDisabledReason}
          onView={onView}
          onEdit={onEdit}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      )}
    </AppLayout>
  )
}

export { GerenciamentoUsuariosView }
