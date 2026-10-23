import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '@/services'
import { extractApiMessage } from '@/helpers/api-error.helper'
import { getUserFromLocalStorage } from '@/helpers/auth-user.helper'
import {
  getManageDisabledReason,
  toManagedUserPayload,
  type ManagedUserFormValues,
} from '@/helpers/managed-user.helper'
import { buildScholarshipListUrl } from '@/helpers/scholarship.helper'
import { useUserScholarships } from '@/hooks/use-user-scholarships'
import { DetalhesUsuarioView } from './detalhes-usuario.view'
import type { ManagedUser } from '@/types'

function DetalhesUsuario() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  const startEditing = Boolean(
    (location.state as { startEditing?: boolean } | null)?.startEditing
  )
  const id = Number(params.id)
  const isValidRoute = Number.isInteger(id) && id > 0

  const [user, setUser] = useState<ManagedUser | null>(null)
  const [isLoading, setIsLoading] = useState(isValidRoute)

  const loggedUserRole = getUserFromLocalStorage()?.role
  const hasScholarships = Boolean(user && user.role !== 'ADMIN')
  const scholarships = useUserScholarships(hasScholarships ? id : null)

  const updateUser = async (values: ManagedUserFormValues) => {
    if (!user) return false

    try {
      const response = await api.user.updateUser(
        user.id,
        toManagedUserPayload(user.role, values)
      )
      setUser(response.data)
      toast.success('Usuário(a) atualizado(a) com sucesso.')
      return true
    } catch (error) {
      toast.error(`Erro ao atualizar o usuário: ${extractApiMessage(error)}`)
      return false
    }
  }

  const toggleUserStatus = async (target: ManagedUser) => {
    const status = target.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'

    try {
      const response = await api.user.updateUserStatus(target.id, status)
      setUser(response.data)
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
  }

  const deleteUser = async (target: ManagedUser) => {
    try {
      await api.user.deleteUser(target.id)
      toast.success('Usuário(a) excluído(a) com sucesso.')
      navigate('/usuarios')
    } catch (error) {
      toast.error(`Erro ao excluir o usuário: ${extractApiMessage(error)}`)
    }
  }

  useEffect(() => {
    if (!isValidRoute) return

    setIsLoading(true)
    api.user
      .getUser(id)
      .then(response => setUser(response.data))
      .catch(error => {
        setUser(null)
        toast.error(`Erro ao buscar o usuário: ${extractApiMessage(error)}`)
      })
      .finally(() => setIsLoading(false))
  }, [id, isValidRoute])

  return (
    <DetalhesUsuarioView
      isLoading={isLoading}
      user={user}
      startEditing={startEditing}
      disabledReason={
        user ? getManageDisabledReason(user, loggedUserRole) : undefined
      }
      onBack={() => navigate('/usuarios')}
      onUpdate={updateUser}
      onToggleStatus={toggleUserStatus}
      onDelete={deleteUser}
      scholarships={hasScholarships ? scholarships : undefined}
      onViewScholarships={() => {
        if (!user) return
        navigate(
          buildScholarshipListUrl(
            user.role === 'STUDENT'
              ? { studentName: user.name }
              : { advisorName: user.name }
          )
        )
      }}
    />
  )
}

export { DetalhesUsuario }
