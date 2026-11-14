import { readFileSync } from 'fs'
import { request, type APIRequestContext } from '@playwright/test'
import { API_URL } from './environment'
import {
  E2E_PASSWORD,
  SESSION_USERS,
  USERS,
  storageStatePath,
  type E2eUserKey,
  type SessionUserKey
} from './users'
import type { LoginResponse } from '@/types'

export async function loginByApi(user: E2eUserKey): Promise<LoginResponse> {
  const context = await request.newContext({ baseURL: API_URL })
  try {
    const response = await context.post('/login', {
      data: {
        email: USERS[user].email,
        password: E2E_PASSWORD,
        role: USERS[user].loginRole
      }
    })
    if (!response.ok()) {
      throw new Error(`Login de ${user} falhou com ${response.status()}.`)
    }
    return (await response.json()) as LoginResponse
  } finally {
    await context.dispose()
  }
}

function isSessionUser(user: E2eUserKey): user is SessionUserKey {
  return (SESSION_USERS as readonly string[]).includes(user)
}

/** Token salvo pelo `auth.setup.ts`, para não gastar o limite de logins por conta. */
function sessionToken(user: SessionUserKey): string {
  const state = JSON.parse(readFileSync(storageStatePath(user), 'utf-8')) as {
    origins: { localStorage: { name: string; value: string }[] }[]
  }
  const stored = state.origins
    .flatMap(origin => origin.localStorage)
    .find(item => item.name === 'user')
  if (!stored) throw new Error(`Sessão de ${user} não encontrada.`)
  return (JSON.parse(stored.value) as LoginResponse).access_token
}

/** Cliente da API já autenticado como `user`. */
export async function apiAs(user: E2eUserKey): Promise<APIRequestContext> {
  const access_token = isSessionUser(user)
    ? sessionToken(user)
    : (await loginByApi(user)).access_token
  return request.newContext({
    baseURL: API_URL,
    extraHTTPHeaders: { Authorization: `Bearer ${access_token}` }
  })
}

/** Sufixo para nomes criados pelos testes, que rodam sobre o mesmo seed. */
export function uniqueSuffix(): string {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
}

/** CPF válido e aleatório, para cadastros que não podem repetir CPF. */
export function randomCpf(): string {
  const base = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10))
  const digit = (digits: number[]) => {
    const sum = digits.reduce((total, value, index) => total + value * (digits.length + 1 - index), 0)
    const rest = (sum * 10) % 11
    return rest === 10 ? 0 : rest
  }
  const first = digit(base)
  const second = digit([...base, first])
  return [...base, first, second].join('')
}
