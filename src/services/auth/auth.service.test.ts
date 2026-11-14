import { api } from '@/lib/api'
import * as authApi from './auth.service'

jest.mock('@/lib/api', () => ({
  api: { post: jest.fn() },
}))

const http = api as jest.Mocked<typeof api>

describe('auth.service', () => {
  beforeEach(() => jest.clearAllMocks())

  it('logout manda o refresh token da sessão para ser revogado', async () => {
    http.post.mockResolvedValue({ status: 204 })

    await authApi.logout('r1')

    expect(http.post).toHaveBeenCalledWith('/logout', { refresh_token: 'r1' })
  })
})
