import { renderHook, waitFor } from '@testing-library/react'
import { AxiosError, type AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { useApiData } from './use-api-data'

jest.mock('react-toastify', () => ({ toast: { error: jest.fn() } }))

const okResponse = <T,>(data: T) => ({ data, status: 200 }) as AxiosResponse<T>

describe('useApiData', () => {
  beforeEach(() => jest.clearAllMocks())

  it('começa carregando e entrega o dado da resposta', async () => {
    const request = jest.fn().mockResolvedValue(okResponse({ total: 3 }))
    const { result } = renderHook(() => useApiData(request, { total: 0 }))

    expect(result.current).toEqual({ data: { total: 0 }, isLoading: true, hasError: false })
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.data).toEqual({ total: 3 })
    expect(toast.error).not.toHaveBeenCalled()
  })

  it('em erro da API mantém o dado inicial e avisa com o status', async () => {
    const error = new AxiosError('falhou', undefined, undefined, undefined, {
      status: 500,
      data: { error: 'Falha interna' },
    } as AxiosResponse)
    const request = jest.fn().mockRejectedValue(error)
    const { result } = renderHook(() => useApiData(request, { total: 0 }))

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current).toEqual({ data: { total: 0 }, isLoading: false, hasError: true })
    expect(toast.error).toHaveBeenCalledWith('[500]: Falha interna')
  })
})
