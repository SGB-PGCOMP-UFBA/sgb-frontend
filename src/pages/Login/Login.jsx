import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { LoginView } from './LoginView'
import { api } from '../../api'
import { addUserToLocalStorage, getUserFromLocalStorage } from '../../helpers/auth-user'
import { IdentificationForm } from './components/IdentificationForm'
import { LoginForm } from './components/LoginForm'

const initialState = {
  role: 'STUDENT',
  email: '',
  password: ''
}

const steps = ['Identifique-se', 'Dados de Acesso']

function Login() {
  const navigate = useNavigate()
  const [formErrors, setFormErrors] = useState({})
  const [formValues, setFormValues] = useState(initialState)
  const [activeStep, setActiveStep] = useState(0)

  const validateForm = () => {
    const errors = {}
    if (!formValues.email) {
      errors.email = 'E-mail é obrigatório'
    }
    if (!formValues.password) {
      errors.password = 'Senha é obrigatória'
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleFormValueChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleStepperBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleStepperNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const pickFormContentByStep = (step) => {
    switch (step) {
      case 0:
        return (
          <IdentificationForm formValues={formValues} onFormValueChange={handleFormValueChange} />
        )
      case 1:
        return (
          <LoginForm
            formValues={formValues}
            formErrors={formErrors}
            onFormValueChange={handleFormValueChange}
          />
        )

      default:
        return <div>404: Not Found</div>
    }
  }

  const firstRedirect = (user) => {
    if (user && user.role === 'ADMIN') {
      navigate('/dashboard', { replace: true })
    } else if (user && user.role === 'ADVISOR') {
      navigate('/orientandos', { replace: true })
    }
  }

  const authenticate = async () => {
    if (!validateForm()) {
      return
    }

    try {
      const response = await api.auth.login(formValues)

      if ([200, 201].includes(response.status)) {
        toast.success('Autenticado com sucesso.', { autoClose: 1000 })

        addUserToLocalStorage(response.data)

        firstRedirect(getUserFromLocalStorage())
      }
    } catch (err) {
      toast.error(`[${err.response.data.statusCode}]: ${err.response.data.message}`)
    }
  }

  useEffect(() => {
    const user = getUserFromLocalStorage()

    firstRedirect(user)
  })

  return (
    <LoginView
      steps={steps}
      activeStep={activeStep}
      onFormChoose={pickFormContentByStep}
      onSubmit={authenticate}
      onStepBack={handleStepperBack}
      onStepNext={handleStepperNext}
    />
  )
}

export { Login }
