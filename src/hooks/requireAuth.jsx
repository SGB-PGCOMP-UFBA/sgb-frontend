import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { getUserFromLocalStorage } from '../helpers/auth-user'

function RequireAuth({ allowedRoles }) {
  const user = getUserFromLocalStorage()
  const location = useLocation()

  if (user && allowedRoles === user.role) {
    return <Outlet />
  }

  return <Navigate to="/" state={{ from: location }} replace />
}

export default RequireAuth
