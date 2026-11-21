import { readRouteId, readStartEditing } from './detail-route.helper'

describe('readRouteId', () => {
  it('lê um id inteiro positivo', () => {
    expect(readRouteId('7')).toBe(7)
  })

  it.each([[undefined], [''], ['0'], ['-1'], ['1.5'], ['abc']])(
    'recusa %p',
    param => {
      expect(readRouteId(param)).toBeNull()
    }
  )
})

describe('readStartEditing', () => {
  it('liga a edição quando a listagem pediu', () => {
    expect(readStartEditing({ startEditing: true })).toBe(true)
  })

  it.each([[null], [undefined], [{}]])('sem pedido (%p), abre só a visualização', state => {
    expect(readStartEditing(state)).toBe(false)
  })
})
