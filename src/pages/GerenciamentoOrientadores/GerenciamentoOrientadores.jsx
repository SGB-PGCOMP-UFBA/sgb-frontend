import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../api'
import { GerenciamentoOrientadoresView } from './GerenciamentoOrientadoresView'

function GerenciamentoOrientadores() {
  const [advisors, setAdvisors] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getAdvisors = async () => {
    const response = await api.advisor.getAdvisors()

    if (response.status === 200) {
      setAdvisors(response.data)
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }
  }

  const createAdvisor = async (advisor) => {
    const creatingAdvisor = {
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
      toast.error(`${error.response.data.message}`)
    }

    await getAdvisors()
  }

  const updateAdvisor = async (payload) => {
    try {
      const response = await api.advisor.updateAdvisor(payload)
      if (response.status === 200) {
        toast.success('Orientador(a) atualizado(a) com sucesso.')
      }
    } catch (error) {
      toast.error(`${error.response.data.message}`)
    }

    await getAdvisors()
  }

  const deleteAdvisor = async (advisor) => {
    try {
      const response = await api.advisor.deleteAdvisor(advisor)
      if (response.status === 204) {
        toast.success('Orientador(a) excluído(a) com sucesso.')
      }
    } catch (error) {
      toast.error(`${error.response.data.message}`)
    }

    await getAdvisors()
  }

  const resetAdvisorPassword = async (payload) => {
    try {
      const response = await api.advisor.resetPassword(payload)
      if ([200, 201].includes(response.status)) {
        toast.success('Senha resetada com sucesso.')
      }
    } catch (error) {
      toast.error(`${error.response.data.message}`)
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
      onResetPassword={resetAdvisorPassword}
    />
  )
}

export { GerenciamentoOrientadores }
