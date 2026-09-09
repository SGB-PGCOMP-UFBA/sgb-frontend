import { getUserFromLocalStorage } from '../../helpers/auth-user'

/**
 * O index signature e exigido pelo `AxiosRequestHeaders` do axios 0.27,
 * que e um `Record<string, string>`.
 */
export interface AuthHeaders {
  Authorization: string
  [header: string]: string
}

function buildHeaders(): AuthHeaders {
  const user = getUserFromLocalStorage()

  return { Authorization: `Bearer ${user?.access_token ?? ''}` }
}

export { buildHeaders }
