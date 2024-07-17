import axios from 'axios'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { Link } from 'react-router-dom'

const initialState = {
  email: ''
}

function ForgetPasswordForm() {
  const [values, setValues] = useState(initialState)

  const handleChangeValues = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email } = values

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/password-recovery/request`, { email })
      toast.success('Verifique seu e-mail para redefinir a senha.')
    } catch (error) {
      if (!error?.response) {
        toast.error('Sem resposta do servidor.')
      } else {
        toast.error('Erro inesperado. Tente novamente!')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-[395px] flex-col gap-y-2 font-inter">
      <TextField
        required
        id="email"
        label="E-mail"
        type="email"
        name="email"
        value={values.email}
        onChange={(e) => handleChangeValues(e)}
        placeholder="Insira seu endereço de e-mail"
      />

      <div className="mt-2 flex items-center justify-center">
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Recuperar senha
        </Button>
      </div>
      <p className="pt-12 text-center text-base font-normal leading-6">
        <Link to="/" className="text-blue-600 transition-colors hover:text-blue-800">
          Lembrou sua senha? Volte e faça login.
        </Link>
      </p>
    </form>
  )
}

export { ForgetPasswordForm }
