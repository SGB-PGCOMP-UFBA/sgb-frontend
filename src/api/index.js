import * as advisorApi from './advisor'
import * as agencyApi from './agency'
import * as analyticsApi from './analytics'
import * as passwordApi from './password'
import * as studentApi from './student'

const api = {
  advisor: advisorApi,
  agency: agencyApi,
  analytics: analyticsApi,
  password: passwordApi,
  student: studentApi
}

export { api }
