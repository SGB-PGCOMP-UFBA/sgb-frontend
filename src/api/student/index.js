import { api } from '../../services/api'

const BASE_STUDENT_API_PATH = `/v1/student`

export const getStudents = async () => {
  return api.get(`${BASE_STUDENT_API_PATH}`)
}

export const createStudent = async (student) => {
  return api.post(`${BASE_STUDENT_API_PATH}`, student)
}

export const updateStudent = async (studentId, student) => {
  return api.patch(`${BASE_STUDENT_API_PATH}/${studentId}`, student)
}

export const deleteStudent = async (studentId) => {
  return api.delete(`${BASE_STUDENT_API_PATH}/${studentId}`)
}
