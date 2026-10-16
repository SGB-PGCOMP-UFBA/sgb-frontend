import {
  ONLY_ADMIN_MANAGES_ADMIN,
  getManageDisabledReason,
  toManagedUserPayload,
} from './managed-user.helper'

const FORM = {
  name: '  Ana Souza ',
  email: ' ana@ufba.br ',
  tax_id: '123.456.789-01',
  phone_number: '(71) 99999-9999',
  link_to_lattes: ' http://lattes.cnpq.br/1 ',
}

describe('toManagedUserPayload', () => {
  it('quando é estudante, limpa as máscaras e mantém o Lattes', () => {
    expect(toManagedUserPayload('STUDENT', FORM)).toEqual({
      name: 'Ana Souza',
      email: 'ana@ufba.br',
      tax_id: '12345678901',
      phone_number: '71999999999',
      link_to_lattes: 'http://lattes.cnpq.br/1',
    })
  })

  it.each([['ADVISOR'], ['ADVISOR_WITH_ADMIN_PRIVILEGES'], ['ADMIN']] as const)(
    'quando é %s, descarta o Lattes e não manda situação',
    role => {
      const payload = toManagedUserPayload(role, FORM)

      expect(payload.link_to_lattes).toBeNull()
      expect(payload).not.toHaveProperty('status')
    }
  )

  it('quando os campos opcionais estão vazios ou só com máscara, manda null', () => {
    expect(
      toManagedUserPayload('ADMIN', {
        name: 'Ana',
        email: 'ana@ufba.br',
        tax_id: '___.___.___-__',
        phone_number: '',
      })
    ).toMatchObject({ tax_id: null, phone_number: null })
  })
})

describe('getManageDisabledReason', () => {
  it('quando o alvo é administrador e quem está logado não é, bloqueia', () => {
    expect(
      getManageDisabledReason(
        { role: 'ADMIN' },
        'ADVISOR_WITH_ADMIN_PRIVILEGES'
      )
    ).toBe(ONLY_ADMIN_MANAGES_ADMIN)
  })

  it('quando o alvo é administrador e quem está logado também é, libera', () => {
    expect(getManageDisabledReason({ role: 'ADMIN' }, 'ADMIN')).toBeUndefined()
  })

  it.each([
    ['STUDENT'],
    ['ADVISOR'],
    ['ADVISOR_WITH_ADMIN_PRIVILEGES'],
  ] as const)(
    'quando o alvo é %s, libera para quem gerencia usuários',
    role => {
      expect(
        getManageDisabledReason({ role }, 'ADVISOR_WITH_ADMIN_PRIVILEGES')
      ).toBeUndefined()
    }
  )
})
