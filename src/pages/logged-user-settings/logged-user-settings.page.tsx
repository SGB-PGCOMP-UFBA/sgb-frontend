import { LoggedUserSettingsView } from './logged-user-settings.view'
import { getUserFromLocalStorage } from '@/helpers/auth-user.helper'

function LoggedUserSettings() {
  const user = getUserFromLocalStorage()

  return <LoggedUserSettingsView user={user} />
}

export { LoggedUserSettings }
