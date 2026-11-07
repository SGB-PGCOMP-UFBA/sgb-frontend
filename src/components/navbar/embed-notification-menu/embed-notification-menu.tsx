import { useEffect } from 'react'
import { Bell } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import type { StoredUser } from '@/helpers/auth-user.helper'
import { useEmbedNotifications } from '@/hooks/use-embed-notifications'
import { EmbedNotificationList } from './embed-notification-list'

export interface EmbedNotificationMenuProps {
  user: StoredUser | null
}

export default function EmbedNotificationMenu(
  props: EmbedNotificationMenuProps
) {
  const { user } = props
  const notifications = useEmbedNotifications()
  const { unreadCount, refreshUnreadCount, reload } = notifications

  useEffect(() => {
    if (user) refreshUnreadCount()
  }, [user, refreshUnreadCount])

  if (!user) {
    return null
  }

  return (
    <DropdownMenu onOpenChange={open => open && reload()}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={
            unreadCount > 0
              ? `Notificações, ${unreadCount} não lidas`
              : 'Notificações'
          }
          className="relative h-12 w-12 text-[#1c253f]"
        >
          <Bell />
          {unreadCount > 0 && (
            <Badge className="absolute right-0 top-0 h-5 min-w-5 justify-center rounded-full bg-sky-500 px-1 text-[11px] text-white hover:bg-sky-500">
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[460px] max-w-[calc(100vw-2rem)] p-0">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b px-5 py-4">
          <p className="shrink-0 text-base font-semibold text-foreground">Notificações</p>
          <div className="flex items-center gap-3 whitespace-nowrap text-sm">
            <button
              type="button"
              onClick={notifications.markAllAsRead}
              disabled={unreadCount === 0}
              className="text-sky-600 hover:underline disabled:cursor-not-allowed disabled:text-muted-foreground disabled:no-underline"
            >
              Marcar todas como lidas
            </button>
            <span aria-hidden className="h-4 w-px bg-border" />
            <button
              type="button"
              aria-pressed={notifications.filter === 'unread'}
              onClick={() =>
                notifications.changeFilter(notifications.filter === 'unread' ? 'all' : 'unread')
              }
              className="text-sky-600 hover:underline"
            >
              {notifications.filter === 'unread' ? 'Ver todas' : 'Apenas não lidas'}
            </button>
          </div>
        </div>
        <EmbedNotificationList
          notifications={notifications.notifications}
          filter={notifications.filter}
          isLoading={notifications.isLoading}
          isLoadingMore={notifications.isLoadingMore}
          hasMore={notifications.hasMore}
          onLoadMore={notifications.loadMore}
          onMarkAsRead={notifications.markAsRead}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
