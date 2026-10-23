import { isClientError } from './api-error.helper'

describe('isClientError', () => {
  it.each([400, 404, 409, 422, 429])('trata %s como erro do cliente', (status) => {
    expect(isClientError(status)).toBe(true)
  })

  it.each([undefined, 200, 500, 503])('não trata %s como erro do cliente', (status) => {
    expect(isClientError(status)).toBe(false)
  })
})
