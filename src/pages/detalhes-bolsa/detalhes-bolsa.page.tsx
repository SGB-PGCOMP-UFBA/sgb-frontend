import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '@/services'
import { extractApiMessage } from '@/helpers/api-error.helper'
import {
  toScholarshipUpdatePayloads,
  type ScholarshipFormValues,
} from '@/helpers/scholarship.helper'
import { DetalhesBolsaView } from './detalhes-bolsa.view'
import type { ScholarshipFormOptions } from './components/formulario-bolsa'
import type { ScholarshipDetailedWithRelations } from '@/types'

const EMPTY_OPTIONS: ScholarshipFormOptions = {
  agencies: [],
  allocations: [],
  advisors: [],
  isLoading: true,
}

function DetalhesBolsa() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  const startEditing = Boolean(
    (location.state as { startEditing?: boolean } | null)?.startEditing
  )
  const id = Number(params.id)
  const isValidRoute = Number.isInteger(id) && id > 0

  const [scholarship, setScholarship] =
    useState<ScholarshipDetailedWithRelations | null>(null)
  const [isLoading, setIsLoading] = useState(isValidRoute)
  const [formOptions, setFormOptions] =
    useState<ScholarshipFormOptions>(EMPTY_OPTIONS)

  const loadScholarship = useCallback(async () => {
    try {
      const response = await api.scholarship.getScholarship(id)
      setScholarship(response.data)
    } catch (error) {
      setScholarship(null)
      toast.error(`Erro ao buscar a bolsa: ${extractApiMessage(error)}`)
    }
  }, [id])

  /**
   * Salva a matricula antes da bolsa: a validacao do periodo da bolsa usa o
   * curso da matricula, entao precisa enxergar o curso ja atualizado.
   */
  const updateScholarship = async (
    values: ScholarshipFormValues
  ): Promise<boolean> => {
    if (!scholarship) return false

    const payloads = toScholarshipUpdatePayloads(scholarship, values)
    if (!payloads) return false

    try {
      await api.enrollment.updateEnrollment(
        payloads.enrollmentId,
        payloads.enrollment
      )
      await api.scholarship.updateScholarship(
        scholarship.id,
        payloads.scholarship
      )
      toast.success('As informações da bolsa foram atualizadas com sucesso.')
      await loadScholarship()
      return true
    } catch (error) {
      toast.error(`Erro ao atualizar a bolsa: ${extractApiMessage(error)}`)
      await loadScholarship()
      return false
    }
  }

  const deleteScholarship = async (scholarshipId: number) => {
    try {
      await api.scholarship.deleteScholarship(scholarshipId)
      toast.success('Bolsa excluída com sucesso.')
      navigate('/bolsas')
    } catch (error) {
      toast.error(`Erro ao excluir a bolsa: ${extractApiMessage(error)}`)
    }
  }

  useEffect(() => {
    if (!isValidRoute) return

    setIsLoading(true)
    loadScholarship().finally(() => setIsLoading(false))
  }, [isValidRoute, loadScholarship])

  useEffect(() => {
    Promise.all([
      api.agency.getAgencyFilterList(),
      api.allocation.getAllocationFilterList(),
      api.user.getAdvisors(),
    ])
      .then(([agencies, allocations, advisors]) => {
        setFormOptions({
          agencies: agencies.data,
          allocations: allocations.data,
          advisors: advisors.data,
          isLoading: false,
        })
      })
      .catch(error => {
        setFormOptions({ ...EMPTY_OPTIONS, isLoading: false })
        toast.error(
          `Erro ao carregar as opções de edição: ${extractApiMessage(error)}`
        )
      })
  }, [])

  return (
    <DetalhesBolsaView
      isLoading={isLoading}
      scholarship={scholarship}
      startEditing={startEditing}
      formOptions={formOptions}
      onBack={() => navigate('/bolsas')}
      onViewUser={userId => navigate(`/usuarios/${userId}`)}
      onUpdate={updateScholarship}
      onDelete={deleteScholarship}
    />
  )
}

export { DetalhesBolsa }
