import type { AxiosResponse } from 'axios'
import { api } from '../../services/api'
import { buildHeaders } from '../utils/HeaderUtils'
import type {
  EmbedNotificationDetailed,
  NotificationOwnerType
} from '../../types'

const BASE_EMBED_NOTIFICATION_API_PATH = `/v1/embed-notification`

export const getAllEmbedNotifications = async (
  owner_id: number,
  owner_type: NotificationOwnerType
): Promise<AxiosResponse<EmbedNotificationDetailed[]>> => {
  return api.get(
    `${BASE_EMBED_NOTIFICATION_API_PATH}?owner_id=${owner_id}&owner_type=${owner_type}`,
    {
      headers: buildHeaders()
    }
  )
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
