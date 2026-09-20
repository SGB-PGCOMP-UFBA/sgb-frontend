import type { AxiosResponse } from 'axios'
import { api } from '@/lib/api'
import { buildHeaders } from '@/lib/api-headers'
import type { ImportDataResponse } from '@/types'

const BASE_DATA_MANAGER_API_PATH = `/v1/data-manager`
export const importData = async (
  formData: FormData
): Promise<AxiosResponse<ImportDataResponse>> => {
  return api.post(`${BASE_DATA_MANAGER_API_PATH}/import-data`, formData, {
    headers: {
      ...buildHeaders(),
      'Content-Type': 'multipart/form-data',
    }
  })
}

export const exportData = async (): Promise<AxiosResponse<Blob>> => {
  return api.get(`${BASE_DATA_MANAGER_API_PATH}/export-data`, {
    responseType: 'blob',
    headers: {
      ...buildHeaders(),
      'Content-Type': 'text/csv',
    },
  })
}
