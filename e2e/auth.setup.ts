import { existsSync, readFileSync } from 'fs'
import { test as setup } from '@playwright/test'
import { loginByApi } from './fixtures/api'
import { WEB_URL } from './fixtures/environment'
import { SESSION_USERS, storageStatePath, type SessionUserKey } from './fixtures/users'

const FIVE_MINUTES = 5 * 60

/**
 * Reaproveita a sessão salva enquanto o token ainda vale: o `/login` aceita 5
 * tentativas por conta a cada 15 minutos, e rodar a suíte várias vezes
 * seguidas na máquina de quem desenvolve estouraria esse limite.
 */
function hasValidSession(user: SessionUserKey): boolean {
  const path = storageStatePath(user)
  if (!existsSync(path)) return false

  const state = JSON.parse(readFileSync(path, 'utf-8')) as {
    origins: { origin: string; localStorage: { name: string; value: string }[] }[]
  }
  const stored = state.origins
    .find(origin => origin.origin === WEB_URL)
    ?.localStorage.find(item => item.name === 'user')
  if (!stored) return false

  const token = (JSON.parse(stored.value) as { access_token?: string }).access_token
  const payload = token?.split('.')[1]
  if (!payload) return false

  const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString()) as { exp?: number }
  return typeof exp === 'number' && exp - FIVE_MINUTES > Date.now() / 1000
}

/**
 * Loga uma vez por perfil pela API e guarda a sessão como o front guarda
 * (`localStorage.user`). O login pela tela fica só em `access.spec.ts`.
 */
for (const user of SESSION_USERS) {
  setup(`sessão de ${user}`, async ({ browser }) => {
    if (hasValidSession(user)) return

    const session = await loginByApi(user)
    const context = await browser.newContext()

    await context.addInitScript(
      value => window.localStorage.setItem('user', value),
      JSON.stringify(session)
    )
    const page = await context.newPage()
    await page.goto(`${WEB_URL}/sobre`)
    await context.storageState({ path: storageStatePath(user) })
    await context.close()
  })
}
