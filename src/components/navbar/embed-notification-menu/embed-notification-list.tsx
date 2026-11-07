import { useEffect, useRef } from 'react'
import { Bell, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { formatLongDateTime } from '@/helpers/formatters.helper'
import { cn } from '@/lib/utils'
import type { NotificationsFilter } from '@/hooks/use-embed-notifications'
import type { EmbedNotificationDetailed } from '@/types'

export interface EmbedNotificationListProps {
  notifications: EmbedNotificationDetailed[]
  filter: NotificationsFilter
  isLoading: boolean
  isLoadingMore: boolean
  hasMore: boolean
  onLoadMore: () => void
  onMarkAsRead: (id: number) => void
}

function EmbedNotificationList(props: EmbedNotificationListProps) {
  const { notifications, filter, isLoading, isLoadingMore, hasMore, onLoadMore, onMarkAsRead } =
    props
  const scrollRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !hasMore) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) onLoadMore()
      },
      { root: scrollRef.current, rootMargin: '0px 0px 80px 0px' }
    )
    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [hasMore, onLoadMore, notifications.length])

  if (isLoading) {
    return (
      <div role="status" aria-label="Carregando notificações" className="space-y-px">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="flex gap-4 px-5 py-4">
            <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (notifications.length === 0) {
    return (
      <p className="px-5 py-8 text-center text-sm text-muted-foreground">
        {filter === 'unread' ? 'Nenhuma notificação não lida.' : 'Você não tem notificações.'}
      </p>
    )
  }

  return (
    <div ref={scrollRef} className="max-h-[480px] overflow-y-auto">
      <ul className="divide-y">
        {notifications.map(notification => (
          <li
            key={notification.id}
            className={cn('flex gap-4 px-5 py-4', notification.consumed ? 'bg-white' : 'bg-sky-50')}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sky-600 shadow-sm ring-1 ring-border">
              <Bell className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1 text-left">
              <div className="flex items-start justify-between gap-2">
                <p
                  className={cn(
                    'text-sm text-foreground',
                    notification.consumed ? 'font-medium' : 'font-semibold'
                  )}
                >
                  {notification.title}
                  {!notification.consumed && <span className="sr-only"> (não lida)</span>}
                </p>
                {!notification.consumed && (
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Marcar "${notification.title}" como lida`}
                    title="Marcar como lida"
                    onClick={() => onMarkAsRead(notification.id)}
                    className="-mr-2 -mt-1 h-7 w-7 shrink-0 text-sky-700 hover:bg-sky-100"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">{notification.description}</p>
              <p className="mt-2 text-right text-xs text-muted-foreground">
                <time dateTime={notification.created_at}>
                  {formatLongDateTime(notification.created_at)}
                </time>
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div ref={sentinelRef} />
      {isLoadingMore && (
        <div
          role="status"
          className="flex items-center justify-center gap-2 py-3 text-xs text-muted-foreground"
        >
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Carregando mais notificações
        </div>
      )}
      {!hasMore && !isLoadingMore && (
        <p className="py-3 text-center text-xs text-muted-foreground">Não há mais notificações</p>
      )}
    </div>
  )
}

export { EmbedNotificationList }
