import type { AxiosResponse } from 'axios'
import { api } from '@/lib/api'
import { buildHeaders } from '@/lib/api-headers'
import type { EmbedNotificationDetailed } from '@/types'

const BASE_EMBED_NOTIFICATION_API_PATH = `/v1/embed-notification`

export const getAllEmbedNotifications = async (): Promise<
  AxiosResponse<EmbedNotificationDetailed[]>
> => {
  return api.get(BASE_EMBED_NOTIFICATION_API_PATH, {
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
