import { useCallback, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '@/services'
import { formatRequestError } from '@/helpers/api-error.helper'
import type { EmbedNotificationDetailed } from '@/types'

export const NOTIFICATIONS_PAGE_SIZE = 10

export type NotificationsFilter = 'all' | 'unread'

export interface EmbedNotificationsState {
  notifications: EmbedNotificationDetailed[]
  unreadCount: number
  filter: NotificationsFilter
  isLoading: boolean
  isLoadingMore: boolean
  hasMore: boolean
}

const INITIAL_STATE: EmbedNotificationsState = {
  notifications: [],
  unreadCount: 0,
  filter: 'all',
  isLoading: false,
  isLoadingMore: false,
  hasMore: false,
}

/** Páginas seguidas só com itens já vistos antes de desistir do scroll. */
const MAX_EMPTY_PAGES = 3

/**
 * A paginação do backend é por offset (`page`/`limit`), como as outras
 * listagens. Uma notificação nova chegando entre duas páginas empurra as
 * demais, e a página seguinte repete itens: por isso o merge descarta pelo `id`.
 */
function appendUnique(
  current: EmbedNotificationDetailed[],
  incoming: EmbedNotificationDetailed[]
) {
  const seen = new Set(current.map(notification => notification.id))
  const added = incoming.filter(notification => !seen.has(notification.id))
  return { merged: [...current, ...added], addedCount: added.length }
}

/**
 * No filtro de não lidas, cada uma marcada como lida sai do conjunto que o
 * servidor pagina, e a página seguinte começaria adiantada, pulando itens.
 * Recalcula a próxima página pelo que ainda é não lido na lista: a página
 * pedida pode repetir itens, que o merge descarta, mas não pula nenhum.
 */
export function nextPageForUnread(unreadLoaded: number, pageSize: number) {
  return Math.floor(unreadLoaded / pageSize) + 1
}

export function useEmbedNotifications(pageSize = NOTIFICATIONS_PAGE_SIZE) {
  const [state, setState] = useState<EmbedNotificationsState>(INITIAL_STATE)
  const notificationsRef = useRef<EmbedNotificationDetailed[]>([])
  const nextPage = useRef(1)
  const filterRef = useRef<NotificationsFilter>('all')
  const inFlight = useRef(false)
  /** Descarta a resposta de uma página que chegou depois de um `reload`. */
  const generation = useRef(0)

  const setNotifications = useCallback(
    (notifications: EmbedNotificationDetailed[], patch: Partial<EmbedNotificationsState> = {}) => {
      notificationsRef.current = notifications
      setState(current => ({ ...current, ...patch, notifications }))
    },
    []
  )

  const refreshUnreadCount = useCallback(async () => {
    try {
      const response = await api.embedNotification.getUnreadEmbedNotificationsCount()
      setState(current => ({ ...current, unreadCount: response.data.count }))
    } catch (error) {
      toast.error(formatRequestError(error))
    }
  }, [])

  const fetchPage = useCallback(
    async (isFirstPage: boolean) => {
      const currentGeneration = generation.current
      inFlight.current = true
      setState(current => ({
        ...current,
        isLoading: isFirstPage,
        isLoadingMore: !isFirstPage,
      }))

      try {
        let emptyPages = 0
        let hasMore = true

        while (hasMore) {
          const page = isFirstPage ? 1 : nextPage.current
          const response = await api.embedNotification.getEmbedNotificationsPage({
            page,
            limit: pageSize,
            onlyUnread: filterRef.current === 'unread',
          })
          if (currentGeneration !== generation.current) return

          const { items, meta } = response.data
          const { merged, addedCount } = isFirstPage
            ? { merged: items, addedCount: items.length }
            : appendUnique(notificationsRef.current, items)

          hasMore = meta.currentPage < meta.totalPages
          nextPage.current = page + 1
          setNotifications(merged, { hasMore })

          emptyPages = addedCount === 0 ? emptyPages + 1 : 0
          if (isFirstPage || addedCount > 0 || emptyPages >= MAX_EMPTY_PAGES) break
        }

        setState(current => ({ ...current, isLoading: false, isLoadingMore: false }))
      } catch (error) {
        if (currentGeneration !== generation.current) return
        toast.error(formatRequestError(error))
        setState(current => ({ ...current, isLoading: false, isLoadingMore: false, hasMore: false }))
      } finally {
        if (currentGeneration === generation.current) inFlight.current = false
      }
    },
    [pageSize, setNotifications]
  )

  const reload = useCallback(() => {
    generation.current += 1
    nextPage.current = 1
    setNotifications([], { hasMore: false })
    return Promise.all([fetchPage(true), refreshUnreadCount()]).then(() => undefined)
  }, [fetchPage, refreshUnreadCount, setNotifications])

  const changeFilter = useCallback(
    (filter: NotificationsFilter) => {
      if (filter === filterRef.current) return Promise.resolve()
      filterRef.current = filter
      setState(current => ({ ...current, filter }))
      return reload()
    },
    [reload]
  )

  const loadMore = useCallback(() => {
    if (inFlight.current || !state.hasMore) return Promise.resolve()
    return fetchPage(false)
  }, [fetchPage, state.hasMore])

  /**
   * No filtro de não lidas a notificação continua visível, já como lida, até a
   * próxima abertura: sumir na hora faria a lista pular sob o cursor do mouse.
   */
  const markAsRead = useCallback(
    async (id: number) => {
      try {
        await api.embedNotification.consumeEmbedNotification(id)
        const current = notificationsRef.current
        const wasUnread = current.some(
          notification => notification.id === id && !notification.consumed
        )
        const updated = current.map(notification =>
          notification.id === id ? { ...notification, consumed: true } : notification
        )

        if (filterRef.current === 'unread') {
          const unreadLoaded = updated.filter(notification => !notification.consumed).length
          nextPage.current = nextPageForUnread(unreadLoaded, pageSize)
        }

        notificationsRef.current = updated
        setState(state => ({
          ...state,
          notifications: updated,
          unreadCount: wasUnread ? Math.max(state.unreadCount - 1, 0) : state.unreadCount,
        }))
      } catch (error) {
        toast.error(formatRequestError(error))
      }
    },
    [pageSize]
  )

  const markAllAsRead = useCallback(async () => {
    try {
      await api.embedNotification.consumeAllEmbedNotifications()
      const updated = notificationsRef.current.map(notification => ({
        ...notification,
        consumed: true,
      }))
      setNotifications(updated, {
        unreadCount: 0,
        ...(filterRef.current === 'unread' ? { hasMore: false } : {}),
      })
    } catch (error) {
      toast.error(formatRequestError(error))
    }
  }, [setNotifications])

  return {
    ...state,
    refreshUnreadCount,
    reload,
    changeFilter,
    loadMore,
    markAsRead,
    markAllAsRead,
  }
}
