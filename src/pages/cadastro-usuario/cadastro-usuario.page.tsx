import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '@/services'
import { extractApiMessage } from '@/helpers/api-error.helper'
import { getUserFromLocalStorage } from '@/helpers/auth-user.helper'
import {
  toManagedUserPayload,
  type ManagedUserFormValues,
} from '@/helpers/managed-user.helper'
import { CadastroUsuarioView } from './cadastro-usuario.view'
import type { UserRole } from '@/types'

const CREATABLE_ROLES: UserRole[] = [
  'STUDENT',
  'ADVISOR',
  'ADVISOR_WITH_ADMIN_PRIVILEGES',
  'ADMIN',
]

function CadastroUsuario() {
  const navigate = useNavigate()
  const loggedUserRole = getUserFromLocalStorage()?.role

  // Mesma regra do backend: só administrador cria administrador.
  const availableRoles = CREATABLE_ROLES.filter(
    role => role !== 'ADMIN' || loggedUserRole === 'ADMIN'
  )

  const createUser = async (role: UserRole, values: ManagedUserFormValues) => {
    try {
      const response = await api.user.createUser({
        role,
        ...toManagedUserPayload(role, values),
      })
      toast.success(
        'Usuário(a) criado(a). A senha de acesso foi enviada para o e-mail informado.'
      )
      navigate(`/usuarios/${response.data.id}`, {
        replace: true,
      })
    } catch (error) {
      toast.error(`Erro ao criar o usuário: ${extractApiMessage(error)}`)
    }
  }

  return (
    <CadastroUsuarioView
      availableRoles={availableRoles}
      onBack={() => navigate('/usuarios')}
      onSubmit={createUser}
    />
  )
}

export { CadastroUsuario }
