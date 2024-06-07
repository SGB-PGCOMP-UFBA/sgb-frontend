import { api } from '../../services/api'

const BASE_EMBED_NOTIFICATION_API_PATH = `/v1/embed-notification`

export const getAllEmbedNotifications = async (owner_id, owner_type) => {
  return api.get(`${BASE_EMBED_NOTIFICATION_API_PATH}?owner_id=${owner_id}&owner_type=${owner_type}`)
}

export const consumeEmbedNotification = async (embed_notification_id) => {
  return api.patch(`${BASE_EMBED_NOTIFICATION_API_PATH}/consume/${embed_notification_id}`)
}
