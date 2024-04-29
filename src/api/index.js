import * as advisorApi from './advisor'
import * as agencyApi from './agency'
import * as passwordApi from './password'
import * as studentApi from './student'
import * as enrollmentApi from './enrollment'
import * as scholarshipApi from './scholarship'
import * as authApi from './auth'

const api = {
  auth: authApi,
  advisor: advisorApi,
  agency: agencyApi,
  password: passwordApi,
  student: studentApi,
  enrollment: enrollmentApi,
  scholarship: scholarshipApi
}

export { api }
