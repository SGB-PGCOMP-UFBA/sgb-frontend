import {
  getUserRoleLabel,
  USER_ROLE_FILTER_OPTIONS,
} from './user-role.constant'

describe('getUserRoleLabel', () => {
  it.each([
    ['ADMIN', 'Administrador(a)'],
    ['ADVISOR', 'Orientador(a)'],
    ['ADVISOR_WITH_ADMIN_PRIVILEGES', 'Orientador(a) administrador(a)'],
    ['STUDENT', 'Estudante'],
  ])('traduz o perfil %s para o rótulo exibido', (role, label) => {
    expect(getUserRoleLabel(role)).toBe(label)
  })

  it('quando o perfil é desconhecido, devolve o próprio valor', () => {
    expect(getUserRoleLabel('SUPERUSER')).toBe('SUPERUSER')
  })
})

describe('USER_ROLE_FILTER_OPTIONS', () => {
  it('oferece um filtro para cada perfil, na mesma chave que o backend espera', () => {
    expect(USER_ROLE_FILTER_OPTIONS.map(option => option.key)).toEqual([
      'ADMIN',
      'ADVISOR',
      'ADVISOR_WITH_ADMIN_PRIVILEGES',
      'STUDENT',
    ])
  })
})
