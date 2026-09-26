import { useCallback, useEffect, useRef, useState } from 'react'
import type { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { api } from '@/services'
import { extractApiMessage, formatApiError } from '@/helpers/api-error.helper'
import { getUserFromLocalStorage } from '@/helpers/auth-user.helper'
import { GerenciamentoUsuariosView } from './gerenciamento-usuarios.view'
import type { EdicaoUsuarioFormValues } from './components/dialog-edicao-usuario'
import type { ManagedUser, UserFilters } from '@/types'

const onlyDigits = (value: string) => value.replace(/[^0-9]/g, '')

function updateByRole(
  user: ManagedUser,
  values: EdicaoUsuarioFormValues
): Promise<AxiosResponse<unknown>> {
  const common = {
    current_email: user.email,
    name: values.name,
    email: values.email,
    tax_id: onlyDigits(values.tax_id),
    phone_number: onlyDigits(values.phone_number),
  }

  switch (user.role) {
    case 'STUDENT':
      return api.student.updateStudent({
        ...common,
        link_to_lattes: values.link_to_lattes,
      })
    case 'ADVISOR':
    case 'ADVISOR_WITH_ADMIN_PRIVILEGES':
      return api.advisor.updateAdvisor({ ...common, status: values.status })
    case 'ADMIN':
      return api.admin.updateAdmin(common)
  }
}

function GerenciamentoUsuarios() {
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

  const updateUser = async (
    user: ManagedUser,
    values: EdicaoUsuarioFormValues
  ) => {
    try {
      const response = await updateByRole(user, values)
      if (response.status === 200) {
        toast.success('Usuário(a) atualizado(a) com sucesso.')
      }
    } catch (error) {
      toast.error(`${extractApiMessage(error)}`)
    }

    await getUsers()
  }

  // A rota de edição de administrador só aceita quem é ADMIN.
  const getEditDisabledReason = useCallback(
    (user: ManagedUser) =>
      user.role === 'ADMIN' && loggedUserRole !== 'ADMIN'
        ? 'Apenas administradores podem editar outros administradores.'
        : undefined,
    [loggedUserRole]
  )

  useEffect(() => {
    getUsers().finally(() => setIsLoading(false))
  }, [])

  return (
    <GerenciamentoUsuariosView
      isLoading={isLoading}
      data={users}
      getEditDisabledReason={getEditDisabledReason}
      onSearch={searchUsers}
      onUpdate={updateUser}
    />
  )
}

export { GerenciamentoUsuarios }
