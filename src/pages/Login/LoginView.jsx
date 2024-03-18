import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FormInput, PasswordInput, Button } from '../../components'

const initialState = {
  tax_id: '',
  password: ''
}

function LoginView(props) {
  const { action } = props
  const [values, setValues] = useState(initialState)

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { tax_id, password } = values

    action({ tax_id, password })
  }

  return (
    <div className="flex h-screen w-full items-center justify-center p-6 md:p-0">
      <section className="flex w-full flex-col items-center justify-center gap-y-7 md:w-11/12 lg:w-6/12">
        <img src="/assets/pgcomp_1.png" alt="Logo" className="w-full max-w-[220px]" />
        <h1 className="max-w-[395px] text-center font-poppins text-xl font-semibold leading-7 text-gray-900 md:w-11/12 lg:w-6/12">
          Sistema de acompanhamento de bolsistas do PGCOMP
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-[395px] flex-col gap-y-5 font-inter"
        >
          <FormInput
            label="CPF"
            type="text"
            id="tax_id"
            name="tax_id"
            value={values.tax_id}
            handleChange={handleChange}
            placeholder="Insira seu CPF"
            pattern="[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}"
            patternErro="CPF inválido, formato esperado: 000.000.000-00"
          />
          <PasswordInput
            label="Senha"
            id="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
            placeholder="Digite sua senha"
          />
          <Link to="/esqueci-a-senha" className="text-base font-normal leading-6 text-blue-600">
            Esqueci a senha
          </Link>
          <div className="mt-3">
            <Button type="submit" icon="enter" color="blue">
              Entrar
            </Button>
          </div>
        </form>
        <p className="text-center text-base font-normal leading-6">
          Ainda não tem uma conta?{' '}
          <a href="/#" className="text-blue-600 transition-colors hover:text-blue-800">
            Cadastre-se
          </a>
        </p>
      </section>
    </div>
  )
}

LoginView.prototypes = {
  action: PropTypes.node
}

export { LoginView }
