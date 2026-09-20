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

/** Monta a mensagem completa no formato ja usado pelos toasts do projeto. */
export function formatApiError(status: number, data: unknown): string {
  return `[${status}]: ${extractApiError(data)}`
}
