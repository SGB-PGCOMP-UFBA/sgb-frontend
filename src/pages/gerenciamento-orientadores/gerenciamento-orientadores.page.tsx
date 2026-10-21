import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '@/services'
import { extractApiMessage, formatApiError } from '@/helpers/api-error.helper'
import { GerenciamentoOrientadoresView } from './gerenciamento-orientadores.view'
import type { InclusaoOrientadorFormValues } from './components/dialog-inclusao-orientador'
import type { EdicaoOrientadorSubmitValues } from './components/dialog-edicao-orientador'
import type { AdvisorDetailed } from '@/types'

function GerenciamentoOrientadores() {
  const [advisors, setAdvisors] = useState<AdvisorDetailed[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const getAdvisors = async () => {
    const response = await api.user.getAdvisors()

    if (response.status === 200) {
      setAdvisors(response.data)
    } else {
      toast.error(formatApiError(response.status, response.data))
    }
  }

  /** A senha é gerada pelo backend e enviada por e-mail ao orientador. */
  const createAdvisor = async (advisor: InclusaoOrientadorFormValues) => {
    try {
      const response = await api.user.createUser({
        role: 'ADVISOR',
        name: advisor.name,
        email: advisor.email,
        tax_id: advisor.tax_id.replace(/[^0-9]/g, '') || null,
        phone_number: advisor.phone_number.replace(/[^0-9]/g, '') || null,
        link_to_lattes: null,
      })
      if (response.status === 201) {
        toast.success('Orientador(a) inserido(a) com sucesso.')
      }
    } catch (error) {
      toast.error(`${extractApiMessage(error)}`)
    }

    await getAdvisors()
  }

  const updateAdvisor = async (values: EdicaoOrientadorSubmitValues) => {
    const current = advisors.find((advisor) => advisor.id === values.id)

    try {
      await api.user.updateUser(values.id, {
        name: values.name,
        email: values.email,
        tax_id: values.tax_id || null,
        phone_number: values.phone_number || null,
        link_to_lattes: null,
      })

      if (current && current.status !== values.status) {
        await api.user.updateUserStatus(values.id, values.status)
      }

      toast.success('Orientador(a) atualizado(a) com sucesso.')
    } catch (error) {
      toast.error(`${extractApiMessage(error)}`)
    }

    await getAdvisors()
  }

  const deleteAdvisor = async (advisor: number) => {
    try {
      const response = await api.user.deleteUser(advisor)
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
      const response = await api.user.toggleAdminPrivileges(advisor)
      if ([200, 201, 204].includes(response.status)) {
        toast.success('Orientador(a) atualizado(a) com sucesso.')
      }
    } catch (error) {
      toast.error(`${extractApiMessage(error)}`)
    }

    await getAdvisors()
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
    />
  )
}

export { GerenciamentoOrientadores }
