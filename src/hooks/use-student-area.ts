import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '@/services'
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  updateUserFromLocalStorage,
} from '@/helpers/auth-user.helper'
import type {
  AdvisorFilterOption,
  IdentifiedFilterOption,
  StudentDetailedWithFullRelations,
} from '@/types'

export interface StudentAreaState {
  isLoading: boolean
  student: StudentDetailedWithFullRelations | null
  advisors: AdvisorFilterOption[]
  agencies: IdentifiedFilterOption[]
  allocations: IdentifiedFilterOption[]
  reloadStudent: () => Promise<void>
}

async function loadOptions<T>(
  request: () => Promise<{ status: number; data: T[] }>,
  errorMessage: string
): Promise<T[]> {
  try {
    const response = await request()
    return response.status === 200 ? response.data : []
  } catch {
    toast.error(errorMessage)
    return []
  }
}

/**
 * Dados do estudante logado e as opções dos formulários de matrícula e bolsa,
 * usados pela área do estudante e pelas páginas de detalhe dela.
 */
export function useStudentArea(): StudentAreaState {
  const [student, setStudent] =
    useState<StudentDetailedWithFullRelations | null>(null)
  const [advisors, setAdvisors] = useState<AdvisorFilterOption[]>([])
  const [agencies, setAgencies] = useState<IdentifiedFilterOption[]>([])
  const [allocations, setAllocations] = useState<IdentifiedFilterOption[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const reloadStudent = useCallback(async () => {
    const user = getUserFromLocalStorage()
    if (!user) return

    try {
      const response = await api.user.getStudent(user.id)
      setStudent(response.data)
      updateUserFromLocalStorage({
        link_to_lattes: response.data.link_to_lattes,
      })
    } catch {
      toast.error('Ocorreu um erro na consulta de dados do estudante.')
      removeUserFromLocalStorage()
    }
  }, [])

  useEffect(() => {
    const load = async () => {
      const [advisorOptions, agencyOptions, allocationOptions] =
        await Promise.all([
          loadOptions(
            api.user.getAdvisorFilterList,
            'Ocorreu um erro na consulta de orientadores.'
          ),
          loadOptions(
            api.agency.getAgencyFilterList,
            'Ocorreu um erro na consulta de agências.'
          ),
          loadOptions(
            api.allocation.getAllocationFilterList,
            'Ocorreu um erro na consulta de alocações.'
          ),
        ])
      setAdvisors(advisorOptions)
      setAgencies(agencyOptions)
      setAllocations(allocationOptions)
      await reloadStudent()
      setIsLoading(false)
    }

    load()
  }, [reloadStudent])

  return { isLoading, student, advisors, agencies, allocations, reloadStudent }
}
