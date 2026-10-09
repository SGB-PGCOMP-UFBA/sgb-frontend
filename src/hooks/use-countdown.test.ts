import { act, renderHook } from '@testing-library/react'
import { useCountdown } from './use-countdown'

describe('useCountdown', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  function tick(seconds: number) {
    for (let i = 0; i < seconds; i++) {
      act(() => {
        jest.advanceTimersByTime(1000)
      })
    }
  }

  it('começa parado', () => {
    const { result } = renderHook(() => useCountdown())

    expect(result.current.secondsLeft).toBe(0)
  })

  it('conta de segundo em segundo até zero e para', () => {
    const { result } = renderHook(() => useCountdown())

    act(() => result.current.start(3))
    tick(1)
    expect(result.current.secondsLeft).toBe(2)

    tick(5)
    expect(result.current.secondsLeft).toBe(0)
  })

  it('reiniciar volta para o valor pedido', () => {
    const { result } = renderHook(() => useCountdown())

    act(() => result.current.start(60))
    tick(10)
    act(() => result.current.start(60))

    expect(result.current.secondsLeft).toBe(60)
  })
})
