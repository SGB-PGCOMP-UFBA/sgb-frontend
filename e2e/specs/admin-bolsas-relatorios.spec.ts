import { expect, test } from '@playwright/test'
import { USERS, storageStatePath } from '../fixtures/users'

test.use({ storageState: storageStatePath('admin') })

const scholarshipRow = (page: import('@playwright/test').Page, student: string) =>
  page.getByRole('row').filter({ has: page.getByRole('button', { name: `Ações para a bolsa de ${student}` }) })

test.describe('lista de bolsas', () => {
  test('abre com as bolsas em andamento e prorrogadas, sem as finalizadas', async ({ page }) => {
    await page.goto('/bolsas')

    await expect(scholarshipRow(page, USERS.student.name)).toContainText('EM ANDAMENTO')
    await expect(scholarshipRow(page, USERS.otherStudent.name)).toContainText('PRORROGADA')
    await expect(scholarshipRow(page, 'Estudante Formado E2E')).toHaveCount(0)
  })

  test('filtrar por situação Finalizada mostra a bolsa encerrada', async ({ page }) => {
    await page.goto('/bolsas')

    await page.getByRole('combobox', { name: 'Situação da Bolsa' }).click()
    await page.getByRole('option', { name: 'Finalizada' }).click()

    await expect(scholarshipRow(page, 'Estudante Formado E2E')).toBeVisible()
    await expect(scholarshipRow(page, USERS.student.name)).toHaveCount(0)
  })

  test('filtrar por agência deixa só as bolsas dela', async ({ page }) => {
    await page.goto('/bolsas')

    await page.getByRole('combobox', { name: 'Agência' }).click()
    await page.getByRole('option', { name: 'FAPESB' }).click()

    await expect(scholarshipRow(page, USERS.otherStudent.name)).toBeVisible()
    await expect(scholarshipRow(page, USERS.student.name)).toHaveCount(0)
  })

  test('avisa a bolsa com duração acima da esperada para o curso', async ({ page }) => {
    await page.goto('/bolsas')
    await page.getByRole('combobox', { name: 'Situação da Bolsa' }).click()
    await page.getByRole('option', { name: 'Finalizada' }).click()

    await expect(
      scholarshipRow(page, 'Estudante Formado E2E').getByRole('button', {
        name: /Duração acima dos 4 anos esperados para doutorado/
      })
    ).toBeVisible()
    await expect(
      scholarshipRow(page, USERS.student.name).getByRole('button', { name: /Duração acima/ })
    ).toHaveCount(0)
  })
})

test('dashboard mostra os totais do seed por agência', async ({ page }) => {
  await page.goto('/dashboard')

  for (const agency of ['CAPES', 'CNPQ', 'FAPESB']) {
    await expect(page.getByRole('heading', { name: agency, level: 3 })).toBeVisible()
  }
  await expect(page.getByRole('row', { name: /^CAPES 10 \d+ 10 \d+ 20/ })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Distribuição por agência' })).toBeVisible()
})

test('relatório quadrienal carrega o detalhamento por agência', async ({ page }) => {
  await page.goto('/quadrienal')

  await expect(page.getByRole('heading', { name: 'Detalhamento por Agência de Fomento' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'CAPES', level: 4 })).toBeVisible()
})

test.describe('orientador com privilégio de admin', () => {
  test.use({ storageState: storageStatePath('advisorAdmin') })

  test('entra nas telas de admin', async ({ page }) => {
    for (const [path, heading] of [
      ['/dashboard', 'Dashboard'],
      ['/bolsas', 'Bolsas'],
      ['/usuarios', 'Usuários']
    ] as const) {
      await page.goto(path)
      await expect(page.getByRole('heading', { name: heading, level: 2 })).toBeVisible()
    }
  })
})
