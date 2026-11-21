import { api } from '@/lib/api'
import * as agencyApi from './agency.service'

jest.mock('@/lib/api', () => ({
  api: { get: jest.fn() },
}))

jest.mock('@/lib/api-headers', () => ({
  buildHeaders: () => ({ Authorization: 'Bearer token' }),
}))

const http = api as jest.Mocked<typeof api>

describe('agency.service', () => {
  beforeEach(() => jest.clearAllMocks())

  it('getAgency busca o registro pelo id', async () => {
    await agencyApi.getAgency(7)

    expect(http.get).toHaveBeenCalledWith('/v1/agency/7', {
      headers: { Authorization: 'Bearer token' },
    })
  })
})
