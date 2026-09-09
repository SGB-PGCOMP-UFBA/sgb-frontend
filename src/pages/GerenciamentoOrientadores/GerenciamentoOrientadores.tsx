import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { api } from '../../api'
import { formatApiError } from '../../helpers/api-error'
import { GerenciamentoOrientadoresView } from './GerenciamentoOrientadoresView'
import type { InclusaoOrientadorFormValues } from './components/DialogInclusaoOrientador'
import type {
  CreateAdvisorPayload,
  UpdateAdvisorPayload
} from '../../api/advisor'
import type { ResetPasswordPayload } from '../../api/password'
import type { AdvisorDetailed } from '../../types'

function extractApiMessage(error: unknown): string | undefined {
  if (!axios.isAxiosError(error)) {
    return undefined
  }

  const data: unknown = error.response?.data

  if (data && typeof data === 'object' && 'message' in data && typeof data.message === 'string') {
    return data.message
  }

  return undefined
}

function GerenciamentoOrientadores() {
  const [advisors, setAdvisors] = useState<AdvisorDetailed[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const getAdvisors = async () => {
    const response = await api.advisor.getAdvisors()

    if (response.status === 200) {
      setAdvisors(response.data)
    } else {
      toast.error(formatApiError(response.status, response.data))
    }
  }

  const createAdvisor = async (advisor: InclusaoOrientadorFormValues) => {
    const creatingAdvisor: CreateAdvisorPayload = {
      ...advisor,
      password: Math.random().toString(36).slice(-4),
      tax_id: advisor.tax_id.replace(/[^0-9]/g, ''),
      phone_number: advisor.phone_number.replace(/[^0-9]/g, ''),
      notify: true
    }

    try {
      const response = await api.advisor.createAdvisor(creatingAdvisor)
      if (response.status === 201) {
        toast.success('Orientador(a) inserido(a) com sucesso.')
      }
    } catch (error) {
      toast.error(`${extractApiMessage(error)}`)
    }

    await getAdvisors()
  }

  const updateAdvisor = async (payload: UpdateAdvisorPayload) => {
    try {
      const response = await api.advisor.updateAdvisor(payload)
      if (response.status === 200) {
        toast.success('Orientador(a) atualizado(a) com sucesso.')
      }
    } catch (error) {
      toast.error(`${extractApiMessage(error)}`)
    }

    await getAdvisors()
  }

  const deleteAdvisor = async (advisor: number) => {
    try {
      const response = await api.advisor.deleteAdvisor(advisor)
      if (response.status === 204) {
        toast.success('Orientador(a) excluído(a) com sucesso.')
      }
    } catch (error) {
      toast.error(`${extractApiMessage(error)}`)
    }

    await getAdvisors()
  }

  const grantAdminPrivileges = async (advisor: number) => {
    try {
      const response = await api.advisor.grantAdminPrivileges(advisor)
      if ([200, 201, 204].includes(response.status)) {
        toast.success('Orientador(a) atualizado(a) com sucesso.')
      }
    } catch (error) {
      toast.error(`${extractApiMessage(error)}`)
    }

    await getAdvisors()
  }

  const resetAdvisorPassword = async (payload: ResetPasswordPayload) => {
    try {
      const response = await api.password.resetPassword(payload)

      if ([200, 201].includes(response.status)) {
        toast.success('Senha resetada com sucesso.')
      }
    } catch (error) {
      toast.error(`${extractApiMessage(error)}`)
    }
  }

  useEffect(() => {
    getAdvisors().finally(() => setIsLoading(false))
  }, [])

  return (
    <GerenciamentoOrientadoresView
      isLoading={isLoading}
      data={advisors}
      onCreate={createAdvisor}
      onUpdate={updateAdvisor}
      onDelete={deleteAdvisor}
      onChangeProfile={grantAdminPrivileges}
      onResetPassword={resetAdvisorPassword}
    />
  )
}

export { GerenciamentoOrientadores }
