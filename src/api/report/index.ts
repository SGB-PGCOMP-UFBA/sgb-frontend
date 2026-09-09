import type { AxiosResponse } from 'axios'
import { api } from '../../services/api'
import type { AgencyScholarshipReport } from '../scholarship'

const BASE_REPORT_API_PATH = `/v1/report`

/** Formatos aceitos por `POST /v1/report/quadrennial/:format`. */
export type QuadrennialReportFormat = 'pdf' | 'csv'

export interface QuadrennialReportPayload {
  startDate: string
  endDate: string
  data: AgencyScholarshipReport[]
}

/**
 * ATENCAO: estas duas rotas leem `access_token` direto do localStorage, e nao
 * do objeto `user` que o resto do app usa (ver `helpers/auth-user`). Como essa
 * chave nunca e gravada, o header sai vazio. Mantido como esta para nao mudar
 * comportamento junto da migracao — vale corrigir em separado.
 */
const buildReportHeaders = (contentType: string) => ({
  'Content-Type': contentType,
  Authorization: 'Bearer ' + (localStorage.getItem('access_token') || ''),
})

export const downloadPdfReport = async (): Promise<AxiosResponse<Blob>> => {
  return api.get(`${BASE_REPORT_API_PATH}/generate-pdf`, {
    responseType: 'blob',
    headers: buildReportHeaders('application/pdf'),
  })
}

export const quadrennialReport = async (
  format: QuadrennialReportFormat,
  body: QuadrennialReportPayload
): Promise<AxiosResponse<Blob>> => {
  return api.post(`${BASE_REPORT_API_PATH}/quadrennial/${format}`, body, {
    responseType: 'blob',
    headers: buildReportHeaders('application/json'),
  })
}
