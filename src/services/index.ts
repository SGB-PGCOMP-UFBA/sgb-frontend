import * as agencyApi from './agency'
import * as allocationApi from './allocation'
import * as passwordApi from './password'
import * as enrollmentApi from './enrollment'
import * as scholarshipApi from './scholarship'
import * as authApi from './auth'
import * as reportApi from './report'
import * as embedNotificationApi from './embed-notification'
import * as userApi from './user'

const api = {
  auth: authApi,
  agency: agencyApi,
  allocation: allocationApi,
  password: passwordApi,
  enrollment: enrollmentApi,
  scholarship: scholarshipApi,
  report: reportApi,
  embedNotification: embedNotificationApi,
  user: userApi
}

export { api }
