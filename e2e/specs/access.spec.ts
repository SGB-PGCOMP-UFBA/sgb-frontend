import { expect, test, type Page } from '@playwright/test'
import { apiAs } from '../fixtures/api'
import { E2E_PASSWORD, USERS, storageStatePath, type E2eUserKey } from '../fixtures/users'

const ROLE_LABEL = { ADMIN: 'Administrador', ADVISOR: 'Orientador', STUDENT: 'Estudante' } as const

async function loginThroughForm(page: Page, user: E2eUserKey, password = E2E_PASSWORD) {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(USERS[user].email)
  await page.getByLabel('Senha', { exact: true }).fill(password)
  await page.getByRole('radio', { name: ROLE_LABEL[USERS[user].loginRole] }).check()
  await page.getByRole('button', { name: 'Entrar' }).click()
}

test.describe('login pela tela', () => {
  test.use({ storageState: { cookies: [], origins: [] } })

  for (const [user, path] of [
    ['admin', '/dashboard'],
    ['otherAdvisor', '/orientandos'],
    ['otherStudent', '/area-do-estudante']
  ] as const) {
    test(`${USERS[user].loginRole} entra e cai em ${path}`, async ({ page }) => {
      await loginThroughForm(page, user)

      await expect(page).toHaveURL(new RegExp(`${path}$`))
    })
  }

  test('senha errada mostra o erro e continua no login', async ({ page }) => {
    await loginThroughForm(page, 'wrongPassword', 'SenhaErrada@123')

    await expect(
      page.getByText('Parece que seu login ou senha está incorreto. Tente novamente!')
    ).toBeVisible()
    await expect(page).toHaveURL(/\/$/)
  })

  test('sem sessão, uma tela de admin volta para o login', async ({ page }) => {
    await page.goto('/bolsas')

    await expect(page).toHaveURL(/\/$/)
  })
})

for (const user of ['advisor', 'student'] as const) {
  test.describe(`${USERS[user].role} não acessa telas de admin`, () => {
    test.use({ storageState: storageStatePath(user) })

    for (const path of ['/dashboard', '/bolsas', '/usuarios', '/agencias']) {
      test(`${path} redireciona para fora`, async ({ page }) => {
        await page.goto(path)

        await expect(page).not.toHaveURL(new RegExp(`${path}$`))
      })
    }
  })
}

test.describe('API nega rotas de admin com 403', () => {
  for (const user of ['advisor', 'student'] as const) {
    test(`${USERS[user].role} em rotas exclusivas de admin`, async () => {
      const api = await apiAs(user)
      try {
        for (const [method, path] of [
          ['get', '/v1/user'],
          ['get', '/v1/scholarship/paginated'],
          ['post', '/v1/agency'],
          ['delete', '/v1/allocation/1']
        ] as const) {
          const response = await api[method](path)
          expect(response.status(), `${method.toUpperCase()} ${path}`).toBe(403)
        }
      } finally {
        await api.dispose()
      }
    })
  }

  test('orientador não vê os orientandos de outro orientador', async () => {
    const admin = await apiAs('admin')
    const advisors = (await (await admin.get('/v1/user/advisors')).json()) as {
      id: number
      email: string
    }[]
    await admin.dispose()
    const other = advisors.find(advisor => advisor.email === USERS.otherAdvisor.email)
    expect(other).toBeDefined()

    const api = await apiAs('advisor')
    const response = await api.get(`/v1/user/advisors/${other?.id}/students`)
    await api.dispose()

    expect([403, 404]).toContain(response.status())
  })
})
