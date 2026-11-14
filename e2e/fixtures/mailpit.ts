import { request } from '@playwright/test'
import { MAILPIT_URL } from './environment'

interface MailpitMessage {
  ID: string
  To: { Address: string }[]
  Subject: string
}

/** Último e-mail recebido pelo Mailpit para `address`, esperando até `timeoutMs`. */
export async function waitForEmail(
  address: string,
  timeoutMs = 15_000
): Promise<{ subject: string; text: string }> {
  const context = await request.newContext({ baseURL: MAILPIT_URL })
  const deadline = Date.now() + timeoutMs

  try {
    while (Date.now() < deadline) {
      const search = await context.get('/api/v1/search', {
        params: { query: `to:"${address}"`, limit: '1' }
      })
      const { messages } = (await search.json()) as { messages: MailpitMessage[] }

      if (messages.length > 0) {
        const message = await context.get(`/api/v1/message/${messages[0].ID}`)
        const body = (await message.json()) as { Subject: string; Text: string }
        return { subject: body.Subject, text: body.Text }
      }

      await new Promise(resolve => setTimeout(resolve, 500))
    }
  } finally {
    await context.dispose()
  }

  throw new Error(`Nenhum e-mail para ${address} em ${timeoutMs}ms.`)
}

export async function clearMailbox(): Promise<void> {
  const context = await request.newContext({ baseURL: MAILPIT_URL })
  try {
    await context.delete('/api/v1/messages')
  } finally {
    await context.dispose()
  }
}
