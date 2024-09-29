import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { LoginView } from './LoginView'
import { api } from '../../api'
import { addUserToLocalStorage, getUserFromLocalStorage } from '../../helpers/auth-user'

const initialState = {
  role: 'STUDENT',
  email: '',
  password: ''
}

function Login() {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState(initialState)

  const handleFormValueChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const firstRedirect = (user) => {
    if (user && (user.role === 'ADMIN' || user.role === 'ADVISOR_WITH_ADMIN_PRIVILEGES')) {
      navigate('/dashboard', { replace: true })
    } else if (user && user.role === 'ADVISOR') {
      navigate('/orientandos', { replace: true })
    } else if (user && user.role === 'STUDENT') {
      navigate('/area-do-estudante', { replace: true })
    }
  }

  const authenticate = async () => {
    try {
      const response = await api.auth.login(formValues)

      if ([200, 201].includes(response.status)) {
        toast.success('Autenticado com sucesso.', { autoClose: 1000 })

        addUserToLocalStorage(response.data)

        firstRedirect(getUserFromLocalStorage())
      }
    } catch (err) {
      if (err.response.status >= 500) {
        toast.error(`${err.response.data.message}`)
      } else {
        toast.error('Parece que seu login ou senha está incorreto. Tente novamente!')
      }
    }
  }

  useEffect(() => {
    const user = getUserFromLocalStorage()

    firstRedirect(user)
  })

  return (
    <LoginView
      onSubmit={authenticate}
      formValues={formValues}
      onChangeFormValues={handleFormValueChange}
    />
  )
}

export { Login }
