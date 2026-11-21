import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '@/services'
import { extractApiMessage } from '@/helpers/api-error.helper'
import { readRouteId } from '@/helpers/detail-route.helper'
import { DetalhesOrientandoView } from './detalhes-orientando.view'
import type { StudentDetailedWithFullRelations } from '@/types'

/** O backend só devolve o estudante se ele for orientando de quem pede. */
function DetalhesOrientando() {
  const navigate = useNavigate()
  const id = readRouteId(useParams().id)

  const [student, setStudent] =
    useState<StudentDetailedWithFullRelations | null>(null)
  const [isLoading, setIsLoading] = useState(id !== null)

  useEffect(() => {
    if (id === null) return

    setIsLoading(true)
    api.user
      .getStudent(id)
      .then(response => setStudent(response.data))
      .catch(error => {
        setStudent(null)
        toast.error(`Erro ao buscar o orientando: ${extractApiMessage(error)}`)
      })
      .finally(() => setIsLoading(false))
  }, [id])

  return (
    <DetalhesOrientandoView
      isLoading={isLoading}
      student={student}
      onBack={() => navigate('/orientandos')}
    />
  )
}

export { DetalhesOrientando }
