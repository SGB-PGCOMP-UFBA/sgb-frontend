export function removeUserFromLocalStorage() {
  localStorage.removeItem('user')
}

export function addUserToLocalStorage(user) {
  localStorage.setItem('user', JSON.stringify(user))
}

export function getUserFromLocalStorage() {
  return JSON.parse(localStorage.getItem('user'))
}
