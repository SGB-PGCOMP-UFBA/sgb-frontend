import { getUserFromLocalStorage } from '../../helpers/auth-user'

function buildHeaders() {
  const user = getUserFromLocalStorage()
  const access_token = user.access_token

  return { 'Authorization': `Bearer ${access_token}` }
}

export { buildHeaders }
