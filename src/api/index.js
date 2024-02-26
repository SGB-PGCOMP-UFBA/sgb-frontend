import * as advisorApi from './advisor'
import * as agencyApi from './agency'
import * as analyticsApi from './analytics'
import * as passwordApi from './password'
import * as studentApi from './student'
import * as scholarshipApi from './scholarship'

const api = {
  advisor: advisorApi,
  agency: agencyApi,
  analytics: analyticsApi,
  password: passwordApi,
  student: studentApi,
  scholarship: scholarshipApi
}

export { api }
