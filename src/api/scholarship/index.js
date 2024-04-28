import { api } from '../../services/api'

const BASE_SCHOLARSHIP_API_PATH = `/v1/scholarship`

export const getScholarshipStatusFilterList = async () => {
  return api.get(`${BASE_SCHOLARSHIP_API_PATH}/filter-list`)
}

export const countOnGoingScholarshipsGroupingByAgencyForCourse = async (programName) => {
  let url = `${BASE_SCHOLARSHIP_API_PATH}/count/by-agency-and-course`

  if (programName) {
    url += `?programName=${encodeURIComponent(programName)}`
  }

  return api.get(url)
}

export const getScholarships = async (page, limit, filters) => {
  let url = `${BASE_SCHOLARSHIP_API_PATH}/paginated?page=${page}&limit=${limit}`

  if (filters) {
    if (filters.scholarshipStatus) {
      url += `&scholarshipStatus=${encodeURIComponent(filters.scholarshipStatus)}`;
    }
    if (filters.agencyName) {
      url += `&agencyName=${encodeURIComponent(filters.agencyName)}`;
    }
    if (filters.advisorName) {
      url += `&advisorName=${encodeURIComponent(filters.advisorName)}`;
    }
    if (filters.programName) {
      url += `&programName=${encodeURIComponent(filters.programName)}`;
    }
  }

  return api.get(url)
}

export const deleteScholarship = async (scholarshipId) => {
  return api.delete(`${BASE_SCHOLARSHIP_API_PATH}/${scholarshipId}`)
}
