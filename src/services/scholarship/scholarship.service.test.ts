import { api } from '@/lib/api'
import * as scholarshipApi from './scholarship.service'

jest.mock('@/lib/api', () => ({
  api: { get: jest.fn() },
}))

jest.mock('@/lib/api-headers', () => ({
  buildHeaders: () => ({ Authorization: 'Bearer token' }),
}))

const http = api as jest.Mocked<typeof api>
const AUTH = { headers: { Authorization: 'Bearer token' } }

describe('scholarship.service', () => {
  beforeEach(() => jest.clearAllMocks())

  it('getScholarship busca a bolsa pelo id', async () => {
    await scholarshipApi.getScholarship(12)

    expect(http.get).toHaveBeenCalledWith('/v1/scholarship/12', AUTH)
  })

  it('getScholarshipsByUser busca as bolsas do usuário', async () => {
    await scholarshipApi.getScholarshipsByUser(7)

    expect(http.get).toHaveBeenCalledWith('/v1/scholarship/by-user/7', AUTH)
  })
})
