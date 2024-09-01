import { api } from '../../services/api'
import { buildHeaders } from '../utils/HeaderUtils'

const BASE_DATA_MANAGER_API_PATH = `/v1/data-manager`

export const importData = async (formData) => {
  return api.post(`${BASE_DATA_MANAGER_API_PATH}/import-data`, formData, {
    headers: {
      ...buildHeaders(),
      'Content-Type': 'multipart/form-data',
    }
  })
}

export const exportData = async () => {
  return api.get(`${BASE_DATA_MANAGER_API_PATH}/export-data`, {
    responseType: 'blob',
    headers: {
      ...buildHeaders(),
      'Content-Type': 'text/csv',
    },
  })
}
