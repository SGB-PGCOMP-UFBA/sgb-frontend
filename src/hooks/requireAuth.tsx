import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { getUserFromLocalStorage } from '../helpers/auth-user'
import type { UserRole } from '../types'

export interface RequireAuthProps {
  allowedRoles: UserRole[]
}

function RequireAuth({ allowedRoles }: RequireAuthProps) {
  const user = getUserFromLocalStorage()
  const location = useLocation()

  const hasAccess = user && allowedRoles.includes(user.role)

  if (hasAccess) {
    return <Outlet />
  }

  return <Navigate to="/" state={{ from: location }} replace />
}

export default RequireAuth
