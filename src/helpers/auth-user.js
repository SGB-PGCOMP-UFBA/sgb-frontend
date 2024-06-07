export function removeUserFromLocalStorage() {
  localStorage.removeItem('user')
}

export function addUserToLocalStorage(user) {
  localStorage.setItem('user', JSON.stringify(user))
}

export function updateUserFromLocalStorage(updates) {
  const user = JSON.parse(localStorage.getItem('user'))

  const updatedUser = { ...user, ...updates }

  localStorage.setItem('user', JSON.stringify(updatedUser))
}

export function getUserFromLocalStorage() {
  return JSON.parse(localStorage.getItem('user'))
}
