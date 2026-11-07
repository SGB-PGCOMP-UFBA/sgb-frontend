import { useEffect, useState } from 'react'
import axios, { type AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { formatApiError } from '@/helpers/api-error.helper'

export interface ApiDataState<T> {
  data: T
  isLoading: boolean
  hasError: boolean
}

/**
 * Executa `request` ao montar e sempre que a referência dele mudar, por isso o
 * chamador deve estabilizá-lo com `useCallback`. Em erro mantém `initialData`
 * e avisa com toast.
 */
export function useApiData<T>(
  request: () => Promise<AxiosResponse<T>>,
  initialData: T
): ApiDataState<T> {
  const [state, setState] = useState<ApiDataState<T>>({
    data: initialData,
    isLoading: true,
    hasError: false,
  })

  useEffect(() => {
    let ignore = false
    setState(current => ({ ...current, isLoading: true, hasError: false }))

    request()
      .then(response => {
        if (!ignore) {
          setState({ data: response.data, isLoading: false, hasError: false })
        }
      })
      .catch((error: unknown) => {
        if (ignore) return

        const response = axios.isAxiosError(error) ? error.response : undefined
        toast.error(
          response
            ? formatApiError(response.status, response.data)
            : 'Erro desconhecido'
        )
        setState(current => ({ ...current, isLoading: false, hasError: true }))
      })

    return () => {
      ignore = true
    }
  }, [request])

  return state
}
