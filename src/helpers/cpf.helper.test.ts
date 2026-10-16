import {
  CPF_INCOMPLETE,
  CPF_INVALID,
  getCpfError,
  isValidCpf,
} from './cpf.helper'

describe('isValidCpf', () => {
  it.each([['52998224725'], ['11144477735'], ['39053344705']])(
    'aceita o CPF com dígitos verificadores corretos (%s)',
    cpf => {
      expect(isValidCpf(cpf)).toBe(true)
    }
  )

  it.each([
    ['52998224724', 'segundo dígito errado'],
    ['52998224715', 'primeiro dígito errado'],
    ['12345678901', 'dígitos aleatórios'],
  ])('recusa %s (%s)', cpf => {
    expect(isValidCpf(cpf)).toBe(false)
  })

  it.each([['00000000000'], ['11111111111'], ['99999999999']])(
    'recusa a sequência repetida %s, que passa no cálculo mas não existe',
    cpf => {
      expect(isValidCpf(cpf)).toBe(false)
    }
  )

  it.each([['5299822472'], ['529982247250'], ['529.982.247-25'], ['']])(
    'recusa o que não tem exatamente 11 dígitos (%s)',
    cpf => {
      expect(isValidCpf(cpf)).toBe(false)
    }
  )
})

describe('getCpfError', () => {
  it('quando o campo está vazio, não acusa erro', () => {
    expect(getCpfError('')).toBeUndefined()
  })

  it('quando a máscara está completa e o CPF é válido, não acusa erro', () => {
    expect(getCpfError('529.982.247-25')).toBeUndefined()
  })

  it.each([['529.982.247-2'], ['529.982'], ['52998224725']])(
    'quando a máscara está incompleta ou ausente (%s), pede os 11 dígitos',
    value => {
      expect(getCpfError(value)).toBe(CPF_INCOMPLETE)
    }
  )

  it('quando a máscara está completa mas os dígitos não conferem, acusa CPF inválido', () => {
    expect(getCpfError('529.982.247-24')).toBe(CPF_INVALID)
  })
})
