import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  updateUserFromLocalStorage,
} from '@/helpers/auth-user.helper'

interface SessionTokens {
  access_token: string
  refresh_token: string
}

type RetriableRequest = AxiosRequestConfig & { sessionRetried?: boolean }

const AUTH_ROUTES = ['/login', '/login/refresh', '/logout']

let pendingRefresh: Promise<string | null> | null = null

/**
 * Várias chamadas que expiram juntas esperam a mesma renovação: o refresh
 * token só vale uma vez, e um segundo uso derrubaria a sessão.
 */
function refreshAccessToken(instance: AxiosInstance): Promise<string | null> {
  pendingRefresh ??= requestNewTokens(instance).finally(() => {
    pendingRefresh = null
  })

  return pendingRefresh
}

async function requestNewTokens(
  instance: AxiosInstance
): Promise<string | null> {
  const user = getUserFromLocalStorage()

  if (!user?.refresh_token) {
    return null
  }

  try {
    const { data } = await instance.post<SessionTokens>('/login/refresh', {
      refresh_token: user.refresh_token,
    })
    updateUserFromLocalStorage(data)

    return data.access_token
  } catch {
    // Outra aba pode ter renovado com o mesmo token enquanto esta esperava.
    const current = getUserFromLocalStorage()

    return current?.refresh_token &&
      current.refresh_token !== user.refresh_token
      ? current.access_token
      : null
  }
}

function sentAccessToken(config: AxiosRequestConfig): string | undefined {
  const authorization = config.headers?.Authorization

  return typeof authorization === 'string'
    ? authorization.replace(/^Bearer /, '')
    : undefined
}

function isAuthRoute(url: string | undefined): boolean {
  return AUTH_ROUTES.includes(url ?? '')
}

/**
 * Num 401, renova o access token uma vez e repete a chamada. Se não houver
 * como renovar, encerra a sessão local e chama `onSessionExpired`.
 */
export function installSessionRefresh(
  instance: AxiosInstance,
  onSessionExpired: () => void
): void {
  instance.interceptors.response.use(undefined, async (error: AxiosError) => {
    const config = error.config as RetriableRequest | undefined

    if (
      error.response?.status !== 401 ||
      !config ||
      config.sessionRetried ||
      isAuthRoute(config.url)
    ) {
      throw error
    }

    const stored = getUserFromLocalStorage()

    if (!stored) {
      throw error
    }

    const alreadyRenewed =
      stored.access_token && stored.access_token !== sentAccessToken(config)
    const accessToken = alreadyRenewed
      ? stored.access_token
      : await refreshAccessToken(instance)

    if (!accessToken) {
      removeUserFromLocalStorage()
      onSessionExpired()
      throw error
    }

    config.sessionRetried = true
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    }

    return instance.request(config)
  })
}
