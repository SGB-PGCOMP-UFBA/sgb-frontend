import { AxiosError, type AxiosResponse } from 'axios'
import { formatRequestError, isClientError } from './api-error.helper'

describe('isClientError', () => {
  it.each([400, 404, 409, 422, 429])('trata %s como erro do cliente', (status) => {
    expect(isClientError(status)).toBe(true)
  })

  it.each([undefined, 200, 500, 503])('não trata %s como erro do cliente', (status) => {
    expect(isClientError(status)).toBe(false)
  })
})

describe('formatRequestError', () => {
  it('com resposta do backend, mostra o status e o erro do corpo', () => {
    const error = new AxiosError('falhou', undefined, undefined, undefined, {
      status: 404,
      data: { error: 'Não encontrada' },
    } as AxiosResponse)

    expect(formatRequestError(error)).toBe('[404]: Não encontrada')
  })

  it('sem resposta (rede, erro de código), cai no genérico', () => {
    expect(formatRequestError(new AxiosError('Network Error'))).toBe('Erro desconhecido')
    expect(formatRequestError(new Error('boom'))).toBe('Erro desconhecido')
  })
})
