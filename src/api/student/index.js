import { api } from '../../services/api'
import { buildHeaders } from '../utils/HeaderUtils'

const BASE_STUDENT_API_PATH = `/v1/student`

export const getStudents = async () => {
  return api.get(`${BASE_STUDENT_API_PATH}`, {
    headers: buildHeaders()
  })
}

export const getStudentsByEmail = async (email) => {
  return api.get(`${BASE_STUDENT_API_PATH}/${email}`, {
    headers: buildHeaders()
  })
}

export const getStudentsByAdvisorId = async (advisorId) => {
  return api.get(`${BASE_STUDENT_API_PATH}/by-advisor/${advisorId}`, {
    headers: buildHeaders()
  })
}

export const createStudent = async (student) => {
  return api.post(`${BASE_STUDENT_API_PATH}`, student)
}

export const updateStudent = async (payload) => {
  return api.patch(`${BASE_STUDENT_API_PATH}`, payload, {
    headers: buildHeaders()
  })
}

export const updateStudentPassword = async (payload) => {
  return api.patch(`${BASE_STUDENT_API_PATH}/update-password`, payload, {
    headers: buildHeaders()
  })
}

export const deleteStudent = async (studentId) => {
  return api.delete(`${BASE_STUDENT_API_PATH}/${studentId}`, {
    headers: buildHeaders()
  })
}
