import { expect, test } from '@playwright/test'
import { apiAs, uniqueSuffix } from '../fixtures/api'
import { storageStatePath } from '../fixtures/users'

test.use({ storageState: storageStatePath('admin') })

const SCREENS = [
  {
    path: '/agencias',
    entity: 'Agência',
    apiPath: '/v1/agency',
    seededWithScholarships: 'CAPES',
    payload: (name: string) => ({ name, description: `Descrição ${name}` })
  },
  {
    path: '/alocacoes',
    entity: 'Alocação',
    apiPath: '/v1/allocation',
    seededWithScholarships: 'Alocação PGCOMP E2E',
    payload: (name: string) => ({ name })
  }
] as const

for (const screen of SCREENS) {
  test.describe(`${screen.entity}: ${screen.path}`, () => {
    test('cria pela tela e a nova linha aparece na lista', async ({ page }) => {
      const name = `${screen.entity} E2E ${uniqueSuffix()}`
      await page.goto(screen.path)

      await page.getByRole('button', { name: 'Novo' }).click()
      const dialog = page.getByRole('dialog', { name: `Adicionar ${screen.entity}` })
      await dialog.getByLabel('Nome').fill(name)
      if (screen.entity === 'Agência') {
        await dialog.getByLabel('Descrição').fill(`Descrição ${name}`)
      }
      await dialog.getByRole('button', { name: 'Salvar' }).click()

      await expect(page.getByText(`${screen.entity} inserida com sucesso.`)).toBeVisible()
      await expect(page.getByRole('cell', { name, exact: true })).toBeVisible()
    })

    test('abre a página de detalhes pelo menu de ações', async ({ page }) => {
      const api = await apiAs('admin')
      const name = `${screen.entity} Detalhe ${uniqueSuffix()}`
      await api.post(screen.apiPath, { data: screen.payload(name) })
      await api.dispose()
      await page.goto(screen.path)

      await page.getByRole('button', { name: `Ações para ${name}` }).click()
      await page.getByRole('menuitem', { name: 'Ver detalhes' }).click()

      await expect(page).toHaveURL(new RegExp(`${screen.path}/\\d+$`))
      await expect(page.getByRole('heading', { name })).toBeVisible()
    })

    // O nome da agência fica bloqueado na edição; nela muda a descrição.
    test('edita pela página de detalhes', async ({ page }) => {
      const api = await apiAs('admin')
      const name = `${screen.entity} Editar ${uniqueSuffix()}`
      await api.post(screen.apiPath, { data: screen.payload(name) })
      await api.dispose()
      await page.goto(screen.path)

      const field = screen.entity === 'Agência' ? 'Descrição' : 'Nome'
      const newValue = `${name} alterada`
      await page.getByRole('button', { name: `Ações para ${name}` }).click()
      await page.getByRole('menuitem', { name: 'Editar' }).click()
      await page.getByLabel(field).fill(newValue)
      await page.getByRole('button', { name: 'Salvar' }).click()

      await expect(page.getByText(`${screen.entity} atualizada com sucesso.`)).toBeVisible()
      await expect(page.getByText(newValue, { exact: true }).first()).toBeVisible()
    })

    test('exclui pela tela um registro sem bolsas', async ({ page }) => {
      const api = await apiAs('admin')
      const name = `${screen.entity} Excluir ${uniqueSuffix()}`
      await api.post(screen.apiPath, { data: screen.payload(name) })
      await api.dispose()
      await page.goto(screen.path)

      await page.getByRole('button', { name: `Ações para ${name}` }).click()
      await page.getByRole('menuitem', { name: 'Excluir' }).click()
      await page.getByRole('dialog').getByRole('button', { name: 'Excluir' }).click()

      await expect(page.getByText(`${screen.entity} excluída com sucesso.`)).toBeVisible()
      await expect(page.getByRole('cell', { name, exact: true })).toHaveCount(0)
    })

    test('não deixa excluir um registro com bolsas, na tela nem na API', async ({ page }) => {
      await page.goto(screen.path)

      await page
        .getByRole('button', { name: `Ações para ${screen.seededWithScholarships}` })
        .click()
      await expect(page.getByRole('menuitem', { name: /Excluir/ })).toHaveAttribute(
        'aria-disabled',
        'true'
      )

      const api = await apiAs('admin')
      const list = (await (await api.get(screen.apiPath)).json()) as { id: number; name: string }[]
      const seeded = list.find(item => item.name === screen.seededWithScholarships)
      const response = await api.delete(`${screen.apiPath}/${seeded?.id}`)
      await api.dispose()

      expect(response.status()).toBe(409)
    })
  })
}
