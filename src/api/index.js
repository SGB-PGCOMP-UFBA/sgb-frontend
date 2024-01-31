import * as agencyApi from './agency'
import * as advisorApi from './advisor'
import * as passwordApi from './password'
import * as studentApi from './student'

const api = {
  agency: agencyApi,
  advisor: advisorApi,
  password: passwordApi,
  student: studentApi
}

export { api }
