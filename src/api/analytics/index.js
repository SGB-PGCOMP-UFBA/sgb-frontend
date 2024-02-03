import { api } from '../../services/api'

const BASE_ANALYTICS_API_PATH = `/v1/analytics`

export const getAnalytics = async () => {
  return api.get(`${BASE_ANALYTICS_API_PATH}`)
}
