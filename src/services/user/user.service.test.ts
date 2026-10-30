import { api } from '@/lib/api'
import * as userApi from './user.service'

jest.mock('@/lib/api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}))

jest.mock('@/lib/api-headers', () => ({
  buildHeaders: () => ({ Authorization: 'Bearer token' }),
}))

const http = api as jest.Mocked<typeof api>
const AUTH = { headers: { Authorization: 'Bearer token' } }

describe('user.service', () => {
  beforeEach(() => jest.clearAllMocks())

  it.each([
    ['getUser', () => userApi.getUser(7), 'get', '/v1/user/7'],
    ['deleteUser', () => userApi.deleteUser(7), 'delete', '/v1/user/7'],
    ['getAdvisors', () => userApi.getAdvisors(), 'get', '/v1/user/advisors'],
    [
      'getAdvisorFilterList',
      () => userApi.getAdvisorFilterList(),
      'get',
      '/v1/user/advisors/filter-list',
    ],
    [
      'getStudentsByAdvisor',
      () => userApi.getStudentsByAdvisor(10),
      'get',
      '/v1/user/advisors/10/students',
    ],
    ['getStudent', () => userApi.getStudent(7), 'get', '/v1/user/students/7'],
  ] as const)(
    '%s chama a rota do usuário pelo id',
    async (_name, call, method, path) => {
      await call()

      expect(http[method]).toHaveBeenCalledWith(path, AUTH)
    }
  )

  it('updateUserStatus e setAdminPrivileges usam o id na rota', async () => {
    await userApi.updateUserStatus(7, 'INACTIVE')
    await userApi.setAdminPrivileges(7, true)

    expect(http.patch).toHaveBeenCalledWith(
      '/v1/user/7/status',
      { status: 'INACTIVE' },
      AUTH
    )
    expect(http.patch).toHaveBeenCalledWith(
      '/v1/user/7/admin-privileges',
      { has_admin_privileges: true },
      AUTH
    )
  })

  it.each([[true], [false]])(
    'setAdminPrivileges manda o estado desejado (%s), e não pede para alternar',
    async enabled => {
      await userApi.setAdminPrivileges(7, enabled)

      expect(http.patch).toHaveBeenCalledWith(
        '/v1/user/7/admin-privileges',
        { has_admin_privileges: enabled },
        AUTH
      )
    }
  )

  it('updateProfile e updatePassword agem sobre quem está logado', async () => {
    await userApi.updateProfile({ name: 'Ana' })
    await userApi.updatePassword({
      current_password: 'a',
      new_password: 'b',
      confirm_new_password: 'b',
    })

    expect(http.patch).toHaveBeenCalledWith(
      '/v1/user/me',
      { name: 'Ana' },
      AUTH
    )
    expect(http.patch).toHaveBeenCalledWith(
      '/v1/user/me/password',
      { current_password: 'a', new_password: 'b', confirm_new_password: 'b' },
      AUTH
    )
  })

  it('signUp é público e não manda token', async () => {
    const payload = {
      name: 'Ana',
      email: 'ana@ufba.br',
      password: 'Senha123',
      tax_id: '12345678901',
      phone_number: '71999999999',
      link_to_lattes: '',
    }

    await userApi.signUp(payload)

    expect(http.post).toHaveBeenCalledWith('/v1/user/signup', payload)
  })
})
