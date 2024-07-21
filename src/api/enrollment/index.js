import { api } from '../../services/api'

const BASE_ENROLLMENT_API_PATH = `/v1/enrollment`

export const createEnrollment = async (enrollment) => {
  return api.post(`${BASE_ENROLLMENT_API_PATH}`, enrollment)
}

export const getEnrollmentProgramFilterList = async () => {
  return api.get(`${BASE_ENROLLMENT_API_PATH}/filter-list`)
}

export const updateEnrollment = async (enrollmentId, enrollment) => {
  return api.patch(`${BASE_ENROLLMENT_API_PATH}/${enrollmentId}`, enrollment)
}

export const deleteEnrollment = async (enrollmentId) => {
  return api.delete(`${BASE_ENROLLMENT_API_PATH}/${enrollmentId}`)
}
