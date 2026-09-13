import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Bell, CircleX } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { api } from '@/api'
import { formatDateHour } from '@/helpers/formatters'
import { formatApiError } from '@/helpers/api-error'
import type { StoredUser } from '@/helpers/auth-user'
import type {
  EmbedNotificationDetailed,
  NotificationOwnerType
} from '@/types'

export interface EmbedNotificationMenuProps {
  user: StoredUser | null
}

export default function EmbedNotificationMenu(
  props: EmbedNotificationMenuProps
) {
  const { user } = props
  const [isLoading, setIsLoading] = useState(true)
  const [embedNotifications, setEmbedNotifications] = useState<
    EmbedNotificationDetailed[]
  >([])

  const getEmbedNotifications = async () => {
    if (!user) {
      return
    }

    const role: NotificationOwnerType =
      user.role === 'ADVISOR_WITH_ADMIN_PRIVILEGES' ? 'ADVISOR' : user.role
    const response = await api.embedNotification.getAllEmbedNotifications(
      user.id,
      role
    )

    if (response.status === 200) {
      setEmbedNotifications(response.data)
    } else {
      toast.error(formatApiError(response.status, response.data))
    }
  }

  const consumeEmbedNotification = async (
    embed_notification: EmbedNotificationDetailed
  ) => {
    const response = await api.embedNotification.consumeEmbedNotification(
      embed_notification.id
    )

    if (response.status >= 400) {
      toast.error(formatApiError(response.status, response.data))
    } else {
      getEmbedNotifications()
    }
  }

  useEffect(() => {
    getEmbedNotifications().finally(() => setIsLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notificações"
          className="relative h-12 w-12 text-[#1c253f]"
        >
          <Bell />
          {embedNotifications.length > 0 && (
            <Badge className="absolute right-0 top-0 h-5 min-w-5 justify-center rounded-full bg-sky-500 px-1 text-[11px] text-white hover:bg-sky-500">
              {embedNotifications.length > 99 ? '99+' : embedNotifications.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[400px] overflow-hidden">
        <div className="px-6 py-3">
          {embedNotifications.length === 0 ? (
            <p className="text-center text-sm">
              Parece que você não tem novas mensagens!
            </p>
          ) : (
            embedNotifications.map((notification) => (
              <div
                key={notification.id}
                className="relative mb-3 rounded-lg bg-gray-200 p-2"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Descartar notificação"
                  onClick={() => consumeEmbedNotification(notification)}
                  className="absolute right-1 top-1 h-auto w-auto p-0 text-destructive hover:bg-transparent"
                >
                  <CircleX />
                </Button>
                <div className="flex flex-col text-left">
                  <p className="text-sm font-bold">{notification.title}</p>
                  <p className="text-sm">{notification.description}</p>
                  <span className="text-right text-xs">
                    {formatDateHour(notification.created_at)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
