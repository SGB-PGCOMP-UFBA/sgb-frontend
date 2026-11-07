import axios from 'axios'

/** Lê a `message` que o backend devolve no corpo de um erro do axios. */
export function extractApiMessage(error: unknown): string | undefined {
  if (!axios.isAxiosError(error)) {
    return undefined
  }

  const data: unknown = error.response?.data

  if (
    data &&
    typeof data === 'object' &&
    'message' in data &&
    typeof data.message === 'string'
  ) {
    return data.message
  }

  return undefined
}

/**
 * Le o campo `error` de um corpo de resposta de erro. Os contratos em `src/api`
 * descrevem so o caso de sucesso, entao esse corpo chega como `unknown`.
 */
export function extractApiError(data: unknown): string {
  if (data && typeof data === 'object' && 'error' in data) {
    const { error } = data as { error: unknown }

    if (typeof error === 'string') {
      return error
    }

    if (Array.isArray(error)) {
      return error.join(', ')
    }

    if (error !== null && error !== undefined) {
      return String(error)
    }
  }

  if (typeof data === 'string') {
    return data
  }

  return 'Erro desconhecido'
}

export function formatApiError(status: number, data: unknown): string {
  return `[${status}]: ${extractApiError(data)}`
}

/**
 * O axios lança exceção em qualquer status fora de 2xx, então o erro de uma
 * chamada chega no `catch`, não como `response.status`.
 */
export function formatRequestError(error: unknown): string {
  const response = axios.isAxiosError(error) ? error.response : undefined
  return response ? formatApiError(response.status, response.data) : 'Erro desconhecido'
}

export function isClientError(status: number | undefined): boolean {
  return status !== undefined && status >= 400 && status < 500
}
