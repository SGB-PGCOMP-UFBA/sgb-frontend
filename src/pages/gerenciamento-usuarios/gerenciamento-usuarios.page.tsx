import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '@/services'
import { extractApiMessage, formatApiError } from '@/helpers/api-error.helper'
import { getUserFromLocalStorage } from '@/helpers/auth-user.helper'
import { getManageDisabledReason } from '@/helpers/managed-user.helper'
import { GerenciamentoUsuariosView } from './gerenciamento-usuarios.view'
import type { ManagedUser, UserFilters } from '@/types'

function GerenciamentoUsuarios() {
  const navigate = useNavigate()
  const [users, setUsers] = useState<ManagedUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const filtersRef = useRef<UserFilters>({})
  const loggedUserRole = getUserFromLocalStorage()?.role

  const getUsers = async () => {
    try {
      const response = await api.user.getUsers(filtersRef.current)

      if (response.status === 200) {
        setUsers(response.data)
      } else {
        toast.error(formatApiError(response.status, response.data))
      }
    } catch (error) {
      toast.error(`Erro ao buscar os usuários: ${extractApiMessage(error)}`)
    }
  }

  const searchUsers = async (filters: UserFilters) => {
    filtersRef.current = filters
    setIsLoading(true)
    await getUsers()
    setIsLoading(false)
  }

  const toggleUserStatus = async (user: ManagedUser) => {
    const status = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'

    try {
      await api.user.updateUserStatus(user.role, user.id, status)
      toast.success(
        status === 'ACTIVE'
          ? 'Usuário(a) ativado(a) com sucesso.'
          : 'Usuário(a) inativado(a) com sucesso.'
      )
    } catch (error) {
      toast.error(
        `Erro ao alterar a situação do usuário: ${extractApiMessage(error)}`
      )
    }

    await getUsers()
  }

  const deleteUser = async (user: ManagedUser) => {
    try {
      await api.user.deleteUser(user.role, user.id)
      toast.success('Usuário(a) excluído(a) com sucesso.')
    } catch (error) {
      toast.error(`Erro ao excluir o usuário: ${extractApiMessage(error)}`)
    }

    await getUsers()
  }

  const viewUser = useCallback(
    (user: ManagedUser) => navigate(`/usuarios/${user.role}/${user.id}`),
    [navigate]
  )

  /** A edição acontece só na página do usuário, que já abre no formulário. */
  const editUser = useCallback(
    (user: ManagedUser) =>
      navigate(`/usuarios/${user.role}/${user.id}`, {
        state: { startEditing: true },
      }),
    [navigate]
  )

  const getDisabledReason = useCallback(
    (user: ManagedUser) => getManageDisabledReason(user, loggedUserRole),
    [loggedUserRole]
  )

  useEffect(() => {
    getUsers().finally(() => setIsLoading(false))
  }, [])

  return (
    <GerenciamentoUsuariosView
      isLoading={isLoading}
      data={users}
      getDisabledReason={getDisabledReason}
      onSearch={searchUsers}
      onView={viewUser}
      onCreate={() => navigate('/usuarios/novo')}
      onEdit={editUser}
      onToggleStatus={toggleUserStatus}
      onDelete={deleteUser}
    />
  )
}

export { GerenciamentoUsuarios }
