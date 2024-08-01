import { api } from '../../services/api'
import { buildHeaders } from '../utils/HeaderUtils'

const BASE_ENROLLMENT_API_PATH = `/v1/enrollment`

export const createEnrollment = async (enrollment) => {
  return api.post(`${BASE_ENROLLMENT_API_PATH}`, enrollment, {
    headers: buildHeaders()
  })
}

export const getEnrollmentProgramFilterList = async () => {
  return api.get(`${BASE_ENROLLMENT_API_PATH}/filter-list`, {
    headers: buildHeaders()
  })
}

export const updateEnrollment = async (enrollmentId, enrollment) => {
  return api.patch(`${BASE_ENROLLMENT_API_PATH}/${enrollmentId}`, enrollment, {
    headers: buildHeaders()
  })
}

export const deleteEnrollment = async (enrollmentId) => {
  return api.delete(`${BASE_ENROLLMENT_API_PATH}/${enrollmentId}`, {
    headers: buildHeaders()
  })
}
