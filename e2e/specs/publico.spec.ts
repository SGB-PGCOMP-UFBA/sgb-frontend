import { expect, test } from '@playwright/test'
import { randomCpf, uniqueSuffix } from '../fixtures/api'
import { clearMailbox, waitForEmail } from '../fixtures/mailpit'
import { USERS } from '../fixtures/users'

test.use({ storageState: { cookies: [], origins: [] } })

async function fillRegisterForm(
  page: import('@playwright/test').Page,
  values: { email: string; cpf: string; password: string; confirmation: string }
) {
  await page.goto('/cadastro-estudante')
  await page.getByLabel('Nome Completo').fill(`Cadastro Público ${uniqueSuffix()}`)
  await page.getByLabel('Telefone').fill(`719${String(Math.floor(Math.random() * 1e8)).padStart(8, '0')}`)
  await page.getByLabel('CPF').fill(values.cpf)
  await page.getByLabel('Currículo Lattes').fill('http://lattes.cnpq.br/1234567890123456')
  await page.getByLabel('E-mail').fill(values.email)
  await page.getByLabel('Senha', { exact: true }).fill(values.password)
  await page.getByLabel('Confirmar Senha').fill(values.confirmation)
  await page.getByRole('button', { name: 'Enviar' }).click()
}

test.describe('cadastro de estudante', () => {
  test('com senhas diferentes, avisa e não cadastra', async ({ page }) => {
    await fillRegisterForm(page, {
      email: `publico.${uniqueSuffix()}@sgb.test`,
      cpf: randomCpf(),
      password: 'Abc@1234',
      confirmation: 'Abc@4321'
    })

    await expect(page.getByText('As senhas digitadas são diferentes!')).toBeVisible()
    await expect(page).toHaveURL(/\/cadastro-estudante$/)
  })

  test('com e-mail já cadastrado, mostra o erro da API', async ({ page }) => {
    await fillRegisterForm(page, {
      email: USERS.student.email,
      cpf: randomCpf(),
      password: 'Abc@1234',
      confirmation: 'Abc@1234'
    })

    await expect(page.getByText('Parece que este e-mail já está sendo utilizado.')).toBeVisible()
    await expect(page).toHaveURL(/\/cadastro-estudante$/)
  })

  test('com dados válidos, cadastra e entra na área do estudante', async ({ page }) => {
    await fillRegisterForm(page, {
      email: `publico.${uniqueSuffix()}@sgb.test`,
      cpf: randomCpf(),
      password: 'Abc@1234',
      confirmation: 'Abc@1234'
    })

    await expect(page.getByText('Cadastro realizado com sucesso!', { exact: false })).toBeVisible()
    await expect(page).toHaveURL(/\/area-do-estudante$/)
  })
})

test('recupera a senha com o código enviado por e-mail', async ({ page }) => {
  const email = 'estudante3.e2e@sgb.test'
  const newPassword = 'Nov@1234'
  // Sem limpar, uma execução anterior deixaria um código velho na caixa.
  await clearMailbox()
  await page.goto('/esqueci-a-senha')

  await page.getByRole('radio', { name: 'Estudante' }).check()
  await page.getByLabel('E-mail').fill(email)
  await page.getByRole('button', { name: 'Enviar código' }).click()

  const message = await waitForEmail(email)
  const code = message.text.match(/\b(\d{6})\b/)?.[1]
  expect(code, 'código de 6 dígitos no e-mail').toBeDefined()

  await page.getByLabel('Código de verificação').fill(code as string)
  await page.getByRole('button', { name: 'Validar código' }).click()
  await page.getByLabel('Nova senha', { exact: true }).fill(newPassword)
  await page.getByLabel('Confirmar nova senha').fill(newPassword)
  await page.getByRole('button', { name: 'Redefinir senha' }).click()

  await expect(page.getByText('Senha redefinida com sucesso.', { exact: false })).toBeVisible()
  await expect(page).toHaveURL(/\/$/)
})
