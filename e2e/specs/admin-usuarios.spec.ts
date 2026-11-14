import { expect, test } from '@playwright/test'
import { apiAs, randomCpf, uniqueSuffix } from '../fixtures/api'
import { waitForEmail } from '../fixtures/mailpit'
import { USERS, storageStatePath } from '../fixtures/users'

test.use({ storageState: storageStatePath('admin') })

test('cria um estudante pela tela e a senha chega por e-mail', async ({ page }) => {
  const suffix = uniqueSuffix()
  const email = `novo.${suffix}@sgb.test`
  await page.goto('/usuarios/novo')

  await page.getByLabel('Nome').fill(`Estudante Novo ${suffix}`)
  await page.getByLabel('E-mail').fill(email)
  await page.getByLabel('CPF').fill(randomCpf())
  await page.getByRole('button', { name: 'Criar e enviar e-mail' }).click()

  await expect(page.getByText('Usuário(a) criado(a).', { exact: false })).toBeVisible()
  await expect(page).toHaveURL(/\/usuarios\/\d+$/)
  const welcome = await waitForEmail(email)
  expect(welcome.subject).toContain('Bem-vindo')
})

test('não cria estudante com e-mail já cadastrado', async ({ page }) => {
  await page.goto('/usuarios/novo')

  await page.getByLabel('Nome').fill('Repetido E2E')
  await page.getByLabel('E-mail').fill(USERS.student.email)
  await page.getByLabel('CPF').fill(randomCpf())
  await page.getByRole('button', { name: 'Criar e enviar e-mail' }).click()

  await expect(page.getByText('Erro ao criar o usuário', { exact: false })).toBeVisible()
  await expect(page).toHaveURL(/\/usuarios\/novo$/)
})

test('filtra a lista pelo nome', async ({ page }) => {
  await page.goto('/usuarios')

  await page.getByLabel('Nome').fill('Outra Estudante')
  await page.getByRole('button', { name: 'Buscar' }).click()

  await expect(page.getByRole('cell', { name: USERS.otherStudent.name, exact: true })).toBeVisible()
  await expect(page.getByRole('cell', { name: USERS.student.name, exact: true })).toHaveCount(0)
})

test('exclui pela tela um usuário sem matrícula', async ({ page }) => {
  const name = `Orientador Excluir ${uniqueSuffix()}`
  const api = await apiAs('admin')
  const created = await api.post('/v1/user', {
    data: { role: 'ADVISOR', name, email: `excluir.${uniqueSuffix()}@sgb.test` }
  })
  await api.dispose()
  expect(created.ok()).toBe(true)

  await page.goto('/usuarios')
  await page.getByRole('button', { name: `Ações para ${name}` }).click()
  await page.getByRole('menuitem', { name: 'Excluir' }).click()
  await page.getByRole('dialog').getByRole('button', { name: 'Excluir' }).click()

  await expect(page.getByText('Usuário(a) excluído(a) com sucesso.')).toBeVisible()
  await expect(page.getByRole('cell', { name, exact: true })).toHaveCount(0)
})

test('não exclui usuário com matrícula, mesmo com a bolsa já finalizada', async ({ page }) => {
  const name = 'Estudante Formado E2E'
  await page.goto('/usuarios')

  await page.getByRole('button', { name: `Ações para ${name}` }).click()
  await page.getByRole('menuitem', { name: 'Excluir' }).click()
  await page.getByRole('dialog').getByRole('button', { name: 'Excluir' }).click()

  await expect(page.getByText('registro está vinculado a outros dados', { exact: false })).toBeVisible()
  await expect(page.getByRole('cell', { name, exact: true })).toBeVisible()
})
