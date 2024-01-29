import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../api'
import { GerenciamentoOrientadoresView } from './GerenciamentoOrientadoresView'

function GerenciamentoOrientadores() {
  const [advisors, setAdvisors] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getAdvisors = async () => {
    const response = await api.advisor.getAdvisor()

    if (response.status === 200) {
      setAdvisors(response.data)
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }
  }

  const createAdvisor = async (advisor) => {
    const response = await api.advisor.createAdvisor(advisor)

    if (response.status === 201) {
      toast.success('Orientador(a) inserido(a) com sucesso.')
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }

    await getAdvisors()
  }

  const updateAdvisor = async (advisorId, advisor) => {
    const response = await api.advisor.updateAdvisor(advisorId, advisor)

    if (response.status === 200) {
      toast.success('Orientador(a) atualizado(a) com sucesso.')
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }

    await getAdvisors()
  }

  const deleteAdvisor = async (advisor) => {
    const response = await api.advisor.deleteAdvisor(advisor)

    if (response.status === 204) {
      toast.success('Orientador(a) excluído(a) com sucesso.')
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }

    await getAdvisors()
  }

  const resetAdvisorPassword = async (email) => {
    const response = await api.password.resetPassword(email)

    if (response.status === 200) {
      toast.success('Senha resetada com sucesso.')
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }
  }

  useEffect(() => {
    if (isLoading) return
    getAdvisors().finally(() => setIsLoading(false))
  }, [])

  return (
    <GerenciamentoOrientadoresView
      isLoading={isLoading}
      advisors={advisors}
      onCreate={createAdvisor}
      onUpdate={updateAdvisor}
      onDelete={deleteAdvisor}
      onResetPassword={resetAdvisorPassword}
    />
  )
}

export { GerenciamentoOrientadores }
