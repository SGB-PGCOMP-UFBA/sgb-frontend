import * as advisorApi from './advisor'
import * as agencyApi from './agency'
import * as passwordApi from './password'
import * as studentApi from './student'
import * as enrollmentApi from './enrollment'
import * as scholarshipApi from './scholarship'
import * as authApi from './auth'
import * as adminApi from './admin'
import * as embedNotificationApi from './embed-notification'

const api = {
  auth: authApi,
  advisor: advisorApi,
  agency: agencyApi,
  password: passwordApi,
  student: studentApi,
  enrollment: enrollmentApi,
  scholarship: scholarshipApi,
  admin: adminApi,
  embedNotification: embedNotificationApi
}

export { api }
