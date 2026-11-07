import type { AxiosResponse } from 'axios'
import { api } from '@/lib/api'
import { buildHeaders } from '@/lib/api-headers'
import type { EmbedNotificationDetailed, Page } from '@/types'

const BASE_EMBED_NOTIFICATION_API_PATH = `/v1/embed-notification`

export interface UnreadEmbedNotificationsCount {
  count: number
}

export interface EmbedNotificationsPageParams {
  page: number
  limit: number
  onlyUnread?: boolean
}

export const getEmbedNotificationsPage = async ({
  page,
  limit,
  onlyUnread,
}: EmbedNotificationsPageParams): Promise<AxiosResponse<Page<EmbedNotificationDetailed>>> => {
  return api.get(`${BASE_EMBED_NOTIFICATION_API_PATH}/paginated`, {
    params: { page, limit, unread: onlyUnread || undefined },
    headers: buildHeaders()
  })
}

export const consumeAllEmbedNotifications = async (): Promise<
  AxiosResponse<{ updated: number }>
> => {
  return api.patch(
    `${BASE_EMBED_NOTIFICATION_API_PATH}/consume-all`,
    {},
    { headers: buildHeaders() }
  )
}

export const getUnreadEmbedNotificationsCount = async (): Promise<
  AxiosResponse<UnreadEmbedNotificationsCount>
> => {
  return api.get(`${BASE_EMBED_NOTIFICATION_API_PATH}/unread-count`, {
    headers: buildHeaders()
  })
}

export const consumeEmbedNotification = async (
  embed_notification_id: number
): Promise<AxiosResponse<EmbedNotificationDetailed>> => {
  return api.patch(
    `${BASE_EMBED_NOTIFICATION_API_PATH}/consume/${embed_notification_id}`,
    {},
    {
      headers: buildHeaders()
    }
  )
}
