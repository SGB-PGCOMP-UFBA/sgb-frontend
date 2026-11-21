import { api } from '@/lib/api'
import * as allocationApi from './allocation.service'

jest.mock('@/lib/api', () => ({
  api: { get: jest.fn() },
}))

jest.mock('@/lib/api-headers', () => ({
  buildHeaders: () => ({ Authorization: 'Bearer token' }),
}))

const http = api as jest.Mocked<typeof api>

describe('allocation.service', () => {
  beforeEach(() => jest.clearAllMocks())

  it('getAllocation busca o registro pelo id', async () => {
    await allocationApi.getAllocation(7)

    expect(http.get).toHaveBeenCalledWith('/v1/allocation/7', {
      headers: { Authorization: 'Bearer token' },
    })
  })
})
