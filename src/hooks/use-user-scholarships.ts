import { useEffect, useState } from 'react'
import { api } from '@/services'
import type { ScholarshipSummary } from '@/types'

export interface UserScholarshipsState {
  scholarships: ScholarshipSummary[]
  isLoading: boolean
  hasError: boolean
}

/**
 * Bolsas em que o usuario aparece como bolsista ou orientador. Com `userId`
 * nulo nao busca nada (ex.: dialogo fechado ou usuario administrador).
 */
export function useUserScholarships(
  userId: number | null
): UserScholarshipsState {
  const [state, setState] = useState<UserScholarshipsState>({
    scholarships: [],
    isLoading: userId !== null,
    hasError: false,
  })

  useEffect(() => {
    if (userId === null) {
      setState({ scholarships: [], isLoading: false, hasError: false })
      return
    }

    let ignore = false
    setState(current => ({ ...current, isLoading: true, hasError: false }))

    api.scholarship
      .getScholarshipsByUser(userId)
      .then(response => {
        if (!ignore) {
          setState({
            scholarships: response.data,
            isLoading: false,
            hasError: false,
          })
        }
      })
      .catch(() => {
        if (!ignore) {
          setState({ scholarships: [], isLoading: false, hasError: true })
        }
      })

    return () => {
      ignore = true
    }
  }, [userId])

  return state
}
