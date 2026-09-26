import { MdManageAccounts } from 'react-icons/md'
import AppLayout from '@/components/app-layout'
import Loading from '@/components/loading'
import { PageHeader } from '@/components/page-header'
import { DataGridUsuarios } from './components/data-grid-usuarios'
import { FiltrosUsuarios } from './components/filtros-usuarios'
import type { EdicaoUsuarioFormValues } from './components/dialog-edicao-usuario'
import type { ManagedUser, UserFilters } from '@/types'

export interface GerenciamentoUsuariosViewProps {
  isLoading: boolean
  data: ManagedUser[]
  getEditDisabledReason: (user: ManagedUser) => string | undefined
  onSearch: (filters: UserFilters) => void
  onUpdate: (user: ManagedUser, values: EdicaoUsuarioFormValues) => void
}

function GerenciamentoUsuariosView({
  isLoading,
  data,
  getEditDisabledReason,
  onSearch,
  onUpdate,
}: GerenciamentoUsuariosViewProps) {
  return (
    <AppLayout>
      <PageHeader
        title='Usuários'
        description='Visualização e Gestão de Usuários do Sistema'
        icon={MdManageAccounts}
        iconBackgroundClassName='bg-indigo-400'
      />
      <FiltrosUsuarios isLoading={isLoading} onSearch={onSearch} />
      {isLoading ? (
        <Loading />
      ) : (
        <DataGridUsuarios
          data={data}
          getEditDisabledReason={getEditDisabledReason}
          onUpdate={onUpdate}
        />
      )}
    </AppLayout>
  )
}

export { GerenciamentoUsuariosView }
