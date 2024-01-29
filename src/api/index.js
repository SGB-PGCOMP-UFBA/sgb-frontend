import * as agencyApi from './agency'
import * as advisorApi from './advisor'
import * as passwordApi from './password'

const api = {
  agency: agencyApi,
  advisor: advisorApi,
  password: passwordApi
}

export { api }
