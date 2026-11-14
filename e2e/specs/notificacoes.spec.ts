import { expect, test } from '@playwright/test'
import { storageStatePath } from '../fixtures/users'

test.use({ storageState: storageStatePath('admin') })

test('lista, filtra e marca todas as notificações como lidas', async ({ page }) => {
  await page.goto('/dashboard')
  const bell = page.getByRole('button', { name: /^Notificações/ })
  await expect(bell).toHaveAccessibleName(/\d+ não lidas/)

  await bell.click()
  const menu = page.getByRole('menu')
  await expect(menu.getByText('Notificação E2E 15')).toBeVisible()

  // A segunda página só chega quando o fim da lista aparece no scroll.
  await expect(async () => {
    await menu.getByRole('list').last().evaluate(list => {
      const scroller = list.parentElement as HTMLElement
      scroller.scrollTop = scroller.scrollHeight
    })
    await expect(menu.getByText('Não há mais notificações')).toBeVisible({ timeout: 1000 })
  }).toPass()
  await expect(menu.getByText('Notificação E2E 1', { exact: true })).toBeVisible()

  await menu.getByRole('button', { name: 'Apenas não lidas' }).click()
  await expect(menu.getByRole('button', { name: 'Ver todas' })).toBeVisible()
  await expect(menu.getByText('Notificação E2E 1', { exact: true })).toHaveCount(0)

  await menu.getByRole('button', { name: 'Marcar todas como lidas' }).click()
  await expect(menu.getByRole('button', { name: 'Marcar todas como lidas' })).toBeDisabled()

  // Com o menu aberto o resto da página fica aria-hidden; o sino só é lido fechado.
  await page.keyboard.press('Escape')
  await expect(bell).toHaveAccessibleName('Notificações')
})
