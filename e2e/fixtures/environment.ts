/**
 * O e2e só roda contra servidores locais: no GitHub Actions o job sobe banco,
 * Mailpit, API e front no próprio runner; na máquina de quem desenvolve, o
 * `docker compose --profile e2e` do back faz o mesmo. Não existe ambiente de
 * teste hospedado, e produção tem dados reais, então qualquer URL que não seja
 * local interrompe a suíte antes do primeiro request.
 */
const LOCAL_HOSTS = ['localhost', '127.0.0.1', '[::1]']

function localUrl(name: string, fallback: string): string {
  const value = process.env[name] ?? fallback
  const { hostname } = new URL(value)

  if (!LOCAL_HOSTS.includes(hostname)) {
    throw new Error(
      `Recusado: ${name} precisa apontar para um servidor local (recebido: ${value}).`
    )
  }

  return value.replace(/\/$/, '')
}

export const API_URL = localUrl('E2E_API_URL', 'http://localhost:3334')
export const WEB_URL = localUrl('E2E_WEB_URL', 'http://localhost:4173')
export const MAILPIT_URL = localUrl('E2E_MAILPIT_URL', 'http://localhost:8025')
