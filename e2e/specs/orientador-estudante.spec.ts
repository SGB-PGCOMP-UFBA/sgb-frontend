import { expect, test } from '@playwright/test'
import { apiAs } from '../fixtures/api'
import { USERS, storageStatePath } from '../fixtures/users'

test.describe('orientador', () => {
  test.use({ storageState: storageStatePath('advisor') })

  test('vê só os próprios orientandos', async ({ page }) => {
    await page.goto('/orientandos')

    await expect(page.getByRole('row', { name: new RegExp(USERS.student.name) })).toBeVisible()
    await expect(page.getByRole('row', { name: /Estudante Formado E2E/ })).toBeVisible()
    await expect(page.getByRole('row', { name: new RegExp(USERS.otherStudent.name) })).toHaveCount(0)
  })
})

test.describe('estudante', () => {
  test.use({ storageState: storageStatePath('student') })

  test('vê a própria matrícula e a própria bolsa', async ({ page }) => {
    await page.goto('/area-do-estudante')

    await expect(page.getByRole('row', { name: /2025100001 MESTRADO Orientador E2E/ })).toBeVisible()
    await expect(page.getByRole('row', { name: /2025100001 MESTRADO CAPES EM ANDAMENTO/ })).toBeVisible()
    await expect(page.getByText('2024100002')).toHaveCount(0)
  })

  test('não lê os dados de outro estudante pela API', async () => {
    const admin = await apiAs('admin')
    const users = (await (await admin.get('/v1/user')).json()) as { id: number; email: string }[]
    await admin.dispose()
    const other = users.find(user => user.email === USERS.otherStudent.email)
    expect(other).toBeDefined()

    const api = await apiAs('student')
    const response = await api.get(`/v1/user/students/${other?.id}`)
    await api.dispose()

    expect([403, 404]).toContain(response.status())
  })
})
