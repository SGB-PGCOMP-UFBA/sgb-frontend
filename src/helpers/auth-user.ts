import type { LoginResponse } from '../types'

/** Usuario autenticado como fica persistido no localStorage. */
export type StoredUser = LoginResponse

const STORAGE_KEY = 'user'

export function removeUserFromLocalStorage(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function addUserToLocalStorage(user: StoredUser): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export function updateUserFromLocalStorage(
  updates: Partial<StoredUser>
): void {
  const user = getUserFromLocalStorage()

  const updatedUser = { ...user, ...updates }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser))
}

/** Devolve `null` quando nao ha ninguem autenticado. */
export function getUserFromLocalStorage(): StoredUser | null {
  const raw = localStorage.getItem(STORAGE_KEY)

  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as StoredUser
  } catch {
    return null
  }
}
