import { api } from '../../services/api'

const BASE_ENROLLMENT_API_PATH = `/v1/enrollment`

export const getEnrollmentProgramFilterList = async () => {
  return api.get(`${BASE_ENROLLMENT_API_PATH}/filter-list`)
}
