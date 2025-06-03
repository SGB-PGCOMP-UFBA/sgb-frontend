import { api } from '../../services/api'
import { buildHeaders } from '../utils/HeaderUtils'

const BASE_SCHOLARSHIP_API_PATH = `/v1/scholarship`

export const createScholarship = async (scholarship) => {
  return api.post(`${BASE_SCHOLARSHIP_API_PATH}`, scholarship, {
    headers: buildHeaders()
  })
}

export const getScholarshipStatusFilterList = async () => {
  return api.get(`${BASE_SCHOLARSHIP_API_PATH}/filter-list`, {
    headers: buildHeaders()
  })
}

export const countOnGoingScholarshipsGroupingByAgencyForCourse = async (programName) => {
  let url = `${BASE_SCHOLARSHIP_API_PATH}/count/by-agency-and-course`

  if (programName) {
    url += `?programName=${encodeURIComponent(programName)}`
  }

  return api.get(url, {
    headers: buildHeaders()
  })
}

export const countScholarshipsGroupingByCourseAndYear = async () => {
  return api.get(`${BASE_SCHOLARSHIP_API_PATH}/count/by-course-and-year`, {
    headers: buildHeaders()
  })
}

export const countScholarshipsGroupingByCourseAndYearFilteringByAgencyName = async (agencyName) => {
  return api.get(`${BASE_SCHOLARSHIP_API_PATH}/count/by-course-and-year/${agencyName}`, {
    headers: buildHeaders()
  })
}

export const countScholarshipsGroupingByStatusForAgency = async (agencyName) => {
  let url = `${BASE_SCHOLARSHIP_API_PATH}/count/by-agency-and-status`

  if (agencyName) {
    url += `?agencyName=${encodeURIComponent(agencyName)}`
  }

  return api.get(url, {
    headers: buildHeaders()
  })
}

export const getScholarships = async (page, limit, filters) => {
  let url = `${BASE_SCHOLARSHIP_API_PATH}/paginated?page=${page}&limit=${limit}`

  if (filters) {
    if (filters.studentName) {
      url += `&studentName=${encodeURIComponent(filters.studentName)}`
    }
    if (filters.scholarshipStatus) {
      url += `&scholarshipStatus=${encodeURIComponent(filters.scholarshipStatus)}`
    }
    if (filters.agencyName) {
      url += `&agencyName=${encodeURIComponent(filters.agencyName)}`
    }
    if (filters.allocationName) {
      url += `&allocationName=${encodeURIComponent(filters.allocationName)}`
    }
    if (filters.advisorName) {
      url += `&advisorName=${encodeURIComponent(filters.advisorName)}`
    }
    if (filters.programName) {
      url += `&programName=${encodeURIComponent(filters.programName)}`
    }
    if (filters.orderBy) {
      url += `&orderBy=${encodeURIComponent(filters.orderBy)}`
    }
  }

  return api.get(url, {
    headers: buildHeaders()
  })
}

export const updateScholarship = async (scholarshipId, scholarship) => {
  return api.patch(`${BASE_SCHOLARSHIP_API_PATH}/${scholarshipId}`, scholarship, {
    headers: buildHeaders()
  })
}

export const deleteScholarship = async (scholarshipId) => {
  return api.delete(`${BASE_SCHOLARSHIP_API_PATH}/${scholarshipId}`, {
    headers: buildHeaders()
  })
}
