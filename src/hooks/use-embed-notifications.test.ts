import { act, renderHook, waitFor } from '@testing-library/react'
import { AxiosError, type AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { api } from '@/services'
import type { EmbedNotificationDetailed, Page } from '@/types'
import { nextPageForUnread, useEmbedNotifications } from './use-embed-notifications'

jest.mock('react-toastify', () => ({ toast: { error: jest.fn() } }))
jest.mock('@/services', () => ({
  api: {
    embedNotification: {
      getEmbedNotificationsPage: jest.fn(),
      getUnreadEmbedNotificationsCount: jest.fn(),
      consumeEmbedNotification: jest.fn(),
      consumeAllEmbedNotifications: jest.fn(),
    },
  },
}))

const service = api.embedNotification as jest.Mocked<typeof api.embedNotification>

function notification(id: number, consumed = false): EmbedNotificationDetailed {
  return {
    id,
    owner_id: 7,
    owner_type: 'STUDENT',
    title: `Notificação ${id}`,
    description: 'Descrição',
    consumed,
    created_at: '2026-11-01T10:00:00.000Z',
    updated_at: '2026-11-01T10:00:00.000Z',
  }
}

function page(ids: number[], currentPage: number, totalPages: number) {
  return {
    data: {
      items: ids.map(id => notification(id)),
      meta: { totalItems: 0, itemCount: ids.length, itemsPerPage: 2, totalPages, currentPage },
    },
  } as AxiosResponse<Page<EmbedNotificationDetailed>>
}

describe('useEmbedNotifications', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    service.getUnreadEmbedNotificationsCount.mockResolvedValue({ data: { count: 5 } } as AxiosResponse)
  })

  it('reload traz a primeira página e o contador de não lidas', async () => {
    service.getEmbedNotificationsPage.mockResolvedValue(page([10, 9], 1, 3))
    const { result } = renderHook(() => useEmbedNotifications(2))

    await act(() => result.current.reload())

    expect(service.getEmbedNotificationsPage).toHaveBeenCalledWith({
      page: 1,
      limit: 2,
      onlyUnread: false,
    })
    expect(result.current.notifications.map(n => n.id)).toEqual([10, 9])
    expect(result.current.unreadCount).toBe(5)
    expect(result.current.hasMore).toBe(true)
  })

  it('loadMore pede a próxima página, remove repetidas e para na última', async () => {
    service.getEmbedNotificationsPage
      .mockResolvedValueOnce(page([10, 9], 1, 2))
      .mockResolvedValueOnce(page([9, 8], 2, 2))
    const { result } = renderHook(() => useEmbedNotifications(2))

    await act(() => result.current.reload())
    await act(() => result.current.loadMore())

    expect(service.getEmbedNotificationsPage).toHaveBeenLastCalledWith({
      page: 2,
      limit: 2,
      onlyUnread: false,
    })
    expect(result.current.notifications.map(n => n.id)).toEqual([10, 9, 8])
    expect(result.current.hasMore).toBe(false)

    await act(() => result.current.loadMore())
    expect(service.getEmbedNotificationsPage).toHaveBeenCalledTimes(2)
  })

  it('loadMore mostra isLoadingMore enquanto a página não chega', async () => {
    let resolveSecond: (value: AxiosResponse<Page<EmbedNotificationDetailed>>) => void = () => {}
    service.getEmbedNotificationsPage
      .mockResolvedValueOnce(page([10, 9], 1, 2))
      .mockReturnValueOnce(new Promise(resolve => (resolveSecond = resolve)))
    const { result } = renderHook(() => useEmbedNotifications(2))

    await act(() => result.current.reload())
    act(() => {
      result.current.loadMore()
    })

    expect(result.current.isLoadingMore).toBe(true)
    await act(async () => resolveSecond(page([8], 2, 2)))
    expect(result.current.isLoadingMore).toBe(false)
  })

  it('changeFilter para não lidas recarrega do início pedindo só as não lidas', async () => {
    service.getEmbedNotificationsPage.mockResolvedValue(page([10], 1, 1))
    const { result } = renderHook(() => useEmbedNotifications(2))

    await act(() => result.current.changeFilter('unread'))

    expect(result.current.filter).toBe('unread')
    expect(service.getEmbedNotificationsPage).toHaveBeenLastCalledWith({
      page: 1,
      limit: 2,
      onlyUnread: true,
    })
  })

  it('no filtro de não lidas, marcar como lida faz a próxima página recomeçar sem pular itens', async () => {
    service.getEmbedNotificationsPage
      .mockResolvedValueOnce(page([10, 9], 1, 3))
      // Com a 10 lida, o servidor pagina [9, 8, 7, ...]: a página 2 começaria na 7 e pularia a 8.
      .mockResolvedValueOnce(page([9, 8], 1, 3))
    service.consumeEmbedNotification.mockResolvedValue({} as AxiosResponse)
    const { result } = renderHook(() => useEmbedNotifications(2))

    await act(() => result.current.changeFilter('unread'))
    await act(() => result.current.markAsRead(10))
    await act(() => result.current.loadMore())

    expect(service.getEmbedNotificationsPage).toHaveBeenLastCalledWith({
      page: 1,
      limit: 2,
      onlyUnread: true,
    })
    expect(result.current.notifications.map(n => n.id)).toEqual([10, 9, 8])
  })

  it('quando a página vem só com repetidas, já pede a seguinte para o scroll não travar', async () => {
    service.getEmbedNotificationsPage
      .mockResolvedValueOnce(page([10, 9], 1, 3))
      .mockResolvedValueOnce(page([10, 9], 2, 3))
      .mockResolvedValueOnce(page([8], 3, 3))
    const { result } = renderHook(() => useEmbedNotifications(2))

    await act(() => result.current.reload())
    await act(() => result.current.loadMore())

    expect(service.getEmbedNotificationsPage).toHaveBeenCalledTimes(3)
    expect(result.current.notifications.map(n => n.id)).toEqual([10, 9, 8])
  })

  it.each([
    [0, 1],
    [1, 1],
    [2, 2],
    [5, 3],
  ])('nextPageForUnread(%i não lidas carregadas, páginas de 2) = %i', (unread, expected) => {
    expect(nextPageForUnread(unread, 2)).toBe(expected)
  })

  it('markAsRead mantém a notificação na lista como lida e diminui o contador', async () => {
    service.getEmbedNotificationsPage.mockResolvedValue(page([10, 9], 1, 1))
    service.consumeEmbedNotification.mockResolvedValue({} as AxiosResponse)
    const { result } = renderHook(() => useEmbedNotifications(2))

    await act(() => result.current.reload())
    await act(() => result.current.markAsRead(10))

    expect(service.consumeEmbedNotification).toHaveBeenCalledWith(10)
    expect(result.current.notifications.map(n => [n.id, n.consumed])).toEqual([
      [10, true],
      [9, false],
    ])
    expect(result.current.unreadCount).toBe(4)
  })

  it('markAllAsRead marca toda a lista como lida e zera o contador', async () => {
    service.getEmbedNotificationsPage.mockResolvedValue(page([10, 9], 1, 1))
    service.consumeAllEmbedNotifications.mockResolvedValue({} as AxiosResponse)
    const { result } = renderHook(() => useEmbedNotifications(2))

    await act(() => result.current.reload())
    await act(() => result.current.markAllAsRead())

    expect(result.current.notifications.every(n => n.consumed)).toBe(true)
    expect(result.current.unreadCount).toBe(0)
  })

  it('erro da API mostra o toast e não deixa carregando', async () => {
    service.getEmbedNotificationsPage.mockRejectedValue(
      new AxiosError('falhou', undefined, undefined, undefined, {
        status: 500,
        data: { error: 'Falha interna' },
      } as AxiosResponse)
    )
    const { result } = renderHook(() => useEmbedNotifications(2))

    await act(() => result.current.reload())

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('[500]: Falha interna'))
    expect(result.current.isLoading).toBe(false)
    expect(result.current.hasMore).toBe(false)
  })
})
