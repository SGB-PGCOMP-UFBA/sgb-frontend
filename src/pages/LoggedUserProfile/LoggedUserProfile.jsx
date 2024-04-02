import React from 'react'
import { LoggedUserProfileView } from './LoggedUserProfileView'
import { getUserFromLocalStorage } from '../../helpers/auth-user'

function LoggedUserProfile() {
  const user = getUserFromLocalStorage()

  return <LoggedUserProfileView user={user} />
}

export { LoggedUserProfile }
