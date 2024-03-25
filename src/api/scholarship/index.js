import { api } from '../../services/api'

const BASE_SCHOLARSHIP_API_PATH = `/v1/scholarship`

export const getScholarships = async () => {
  return api.get(`${BASE_SCHOLARSHIP_API_PATH}/detailed`)
}