import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { LoginView } from './LoginView'
import { api } from '../../api'
import { addUserToLocalStorage, getUserFromLocalStorage } from '../../utils/auth-user'

function Login() {
  const navigate = useNavigate()

  const authenticate = async (form) => {
    const response = await api.auth.login(form)

    if ([200, 201].includes(response.status)) {
      toast.success('Autenticado com sucesso.')

      addUserToLocalStorage(response.data)

      navigate('/dashboard', { replace: true })
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }
  }

  useEffect(() => {
    const user = getUserFromLocalStorage()

    if (user) {
      navigate('/dashboard', { replace: true })
    }
  }, [])

  return <LoginView action={authenticate} />
}

export { Login }
