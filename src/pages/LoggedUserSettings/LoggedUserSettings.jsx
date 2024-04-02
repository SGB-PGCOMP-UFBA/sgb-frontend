import React from 'react'
import { LoggedUserSettingsView } from './LoggedUserSettingsView'
import { getUserFromLocalStorage } from '../../helpers/auth-user'

function LoggedUserSettings() {
  const user = getUserFromLocalStorage()

  const updatePassword = () => {}

  return <LoggedUserSettingsView user={user} onUpdatePassword={updatePassword} />
}

export { LoggedUserSettings }
