import { api } from '../../services/api'

const BASE_STUDENT_API_PATH = `/v1/student`

export const getStudents = async () => {
  return api.get(`${BASE_STUDENT_API_PATH}`)
}

export const getStudentsByEmail = async (email) => {
  return api.get(`${BASE_STUDENT_API_PATH}/${email}`)
}

export const getStudentsByAdvisorId = async (advisorId) => {
  return api.get(`${BASE_STUDENT_API_PATH}/by-advisor/${advisorId}`)
}

export const createStudent = async (student) => {
  return api.post(`${BASE_STUDENT_API_PATH}`, student)
}

export const updateStudent = async (payload) => {
  return api.patch(`${BASE_STUDENT_API_PATH}`, payload)
}

export const updateStudentPassword = async (payload) => {
  return api.patch(`${BASE_STUDENT_API_PATH}/update-password`, payload)
}

export const deleteStudent = async (studentId) => {
  return api.delete(`${BASE_STUDENT_API_PATH}/${studentId}`)
}
