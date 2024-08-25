import * as advisorApi from './advisor'
import * as agencyApi from './agency'
import * as passwordApi from './password'
import * as studentApi from './student'
import * as enrollmentApi from './enrollment'
import * as scholarshipApi from './scholarship'
import * as authApi from './auth'
import * as adminApi from './admin'
import * as reportApi from './report'
import * as embedNotificationApi from './embed-notification'
import * as dataManagerApi from './data-manager'

const api = {
  auth: authApi,
  advisor: advisorApi,
  agency: agencyApi,
  password: passwordApi,
  student: studentApi,
  enrollment: enrollmentApi,
  scholarship: scholarshipApi,
  admin: adminApi,
  report: reportApi,
  embedNotification: embedNotificationApi,
  dataManager: dataManagerApi
}

export { api }
