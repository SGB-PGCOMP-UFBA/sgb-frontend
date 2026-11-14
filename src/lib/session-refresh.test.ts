import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { installSessionRefresh } from './session-refresh'

type Handler = (config: AxiosRequestConfig) => [number, unknown]

const STORAGE_KEY = 'user'

function storeUser(tokens: { access_token: string; refresh_token?: string }) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ id: 10, name: 'Maria', role: 'STUDENT', ...tokens })
  )
}

function storedUser() {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : null
}

function bearer(config: AxiosRequestConfig) {
  return (config.headers?.Authorization as string | undefined)?.replace(
    'Bearer ',
    ''
  )
}

function setup(handler: Handler) {
  const calls: AxiosRequestConfig[] = []
  const onSessionExpired = jest.fn()
  const instance = axios.create({
    adapter: async config => {
      calls.push(config)
      const [status, data] = handler(config)
      const response = { status, data, config, headers: {}, statusText: '' }

      if (status >= 400) {
        throw Object.assign(new Error(`HTTP ${status}`), {
          config,
          response,
          isAxiosError: true,
        })
      }

      return response as AxiosResponse
    },
  })
  installSessionRefresh(instance, onSessionExpired)

  const get = (token: string) =>
    instance.get('/v1/scholarship', {
      headers: { Authorization: `Bearer ${token}` },
    })

  return { calls, onSessionExpired, instance, get }
}

const refreshCalls = (calls: AxiosRequestConfig[]) =>
  calls.filter(config => config.url === '/login/refresh')

describe('installSessionRefresh', () => {
  beforeEach(() => localStorage.clear())

  it('quando o access token expira, renova, guarda o par novo e repete a chamada com o token novo', async () => {
    storeUser({ access_token: 'velho', refresh_token: 'r1' })
    const { calls, get } = setup(config => {
      if (config.url === '/login/refresh') {
        return [200, { access_token: 'novo', refresh_token: 'r2' }]
      }
      return bearer(config) === 'novo' ? [200, ['bolsa']] : [401, {}]
    })

    const response = await get('velho')

    expect(response.data).toEqual(['bolsa'])
    expect(JSON.parse(refreshCalls(calls)[0].data)).toEqual({
      refresh_token: 'r1',
    })
    expect(storedUser()).toMatchObject({
      id: 10,
      access_token: 'novo',
      refresh_token: 'r2',
    })
  })

  it('quando várias chamadas expiram juntas, faz uma renovação só', async () => {
    storeUser({ access_token: 'velho', refresh_token: 'r1' })
    const { calls, get } = setup(config => {
      if (config.url === '/login/refresh') {
        return [200, { access_token: 'novo', refresh_token: 'r2' }]
      }
      return bearer(config) === 'novo' ? [200, 'ok'] : [401, {}]
    })

    await Promise.all([get('velho'), get('velho'), get('velho')])

    expect(refreshCalls(calls)).toHaveLength(1)
  })

  it('quando a chamada saiu com um token que outra já renovou, repete com o guardado sem renovar de novo', async () => {
    storeUser({ access_token: 'novo', refresh_token: 'r2' })
    const { calls, get } = setup(config =>
      bearer(config) === 'novo' ? [200, 'ok'] : [401, {}]
    )

    await get('velho')

    expect(refreshCalls(calls)).toHaveLength(0)
  })

  it('quando a renovação é recusada, encerra a sessão local e avisa', async () => {
    storeUser({ access_token: 'velho', refresh_token: 'r1' })
    const { onSessionExpired, get } = setup(() => [401, {}])

    await expect(get('velho')).rejects.toMatchObject({
      response: { status: 401 },
    })

    expect(storedUser()).toBeNull()
    expect(onSessionExpired).toHaveBeenCalledTimes(1)
  })

  it('quando outra aba renovou com o mesmo refresh token, usa o par que ela guardou em vez de deslogar', async () => {
    storeUser({ access_token: 'velho', refresh_token: 'r1' })
    const { onSessionExpired, get } = setup(config => {
      if (config.url === '/login/refresh') {
        storeUser({ access_token: 'da-outra-aba', refresh_token: 'r2' })
        return [401, {}]
      }
      return bearer(config) === 'da-outra-aba' ? [200, 'ok'] : [401, {}]
    })

    const response = await get('velho')

    expect(response.data).toBe('ok')
    expect(onSessionExpired).not.toHaveBeenCalled()
  })

  it('quando a sessão é de antes do refresh token, encerra a sessão sem tentar renovar', async () => {
    storeUser({ access_token: 'antigo' })
    const { calls, onSessionExpired, get } = setup(() => [401, {}])

    await expect(get('antigo')).rejects.toBeTruthy()

    expect(refreshCalls(calls)).toHaveLength(0)
    expect(onSessionExpired).toHaveBeenCalled()
  })

  it('quando a chamada repetida volta 401 de novo, não entra em ciclo', async () => {
    storeUser({ access_token: 'velho', refresh_token: 'r1' })
    const { calls, get } = setup(config =>
      config.url === '/login/refresh'
        ? [200, { access_token: 'novo', refresh_token: 'r2' }]
        : [401, {}]
    )

    await expect(get('velho')).rejects.toBeTruthy()

    expect(refreshCalls(calls)).toHaveLength(1)
    expect(calls.filter(c => c.url === '/v1/scholarship')).toHaveLength(2)
  })

  it.each([['/login'], ['/logout']])(
    'quando %s responde 401, devolve o erro sem renovar nem deslogar',
    async url => {
      storeUser({ access_token: 'velho', refresh_token: 'r1' })
      const { calls, onSessionExpired, instance } = setup(() => [401, {}])

      await expect(instance.post(url, {})).rejects.toBeTruthy()

      expect(refreshCalls(calls)).toHaveLength(0)
      expect(onSessionExpired).not.toHaveBeenCalled()
      expect(storedUser()).not.toBeNull()
    }
  )

  it('quando ninguém está logado, um 401 não redireciona', async () => {
    const { onSessionExpired, get } = setup(() => [401, {}])

    await expect(get('')).rejects.toBeTruthy()

    expect(onSessionExpired).not.toHaveBeenCalled()
  })

  it.each([[403], [500]])(
    'quando a resposta é %s, não renova',
    async status => {
      storeUser({ access_token: 'velho', refresh_token: 'r1' })
      const { calls, get } = setup(() => [status, {}])

      await expect(get('velho')).rejects.toBeTruthy()

      expect(refreshCalls(calls)).toHaveLength(0)
    }
  )
})
