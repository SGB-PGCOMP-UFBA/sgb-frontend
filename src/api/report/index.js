import { api } from '../../services/api'

const BASE_REPORT_API_PATH = `/v1/report`

export const downloadPdfReport = async () => {
  return api.get(`${BASE_REPORT_API_PATH}/generate-pdf`, {
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/pdf'
    },
  })
}
