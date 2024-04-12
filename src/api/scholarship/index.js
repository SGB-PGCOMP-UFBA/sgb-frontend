import { api } from '../../services/api'

const BASE_SCHOLARSHIP_API_PATH = `/v1/scholarship`

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
  }

  return api.get(url)
}

export const deleteScholarship = async (scholarshipId) => {
  return api.delete(`${BASE_SCHOLARSHIP_API_PATH}/${scholarshipId}`)
}
