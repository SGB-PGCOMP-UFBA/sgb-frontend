import React from 'react'
import { LoggedUserSettingsView } from './LoggedUserSettingsView'
import { getUserFromLocalStorage } from '../../helpers/auth-user'

function LoggedUserSettings() {
  const user = getUserFromLocalStorage()

  return <LoggedUserSettingsView user={user} />
}

export { LoggedUserSettings }
