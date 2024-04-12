import React from 'react'
import PropTypes from 'prop-types'
import { FormInput, PasswordInput } from '../../../components'

function LoginForm(props) {
  const { formErrors, formValues, onFormValueChange } = props

  return (
    <form className="flex w-full flex-col gap-y-5 font-inter">
      <FormInput
        id="email"
        label="E-mail"
        type="text"
        name="email"
        placeholder="Digite seu e-mail"
        value={formValues.email}
        handleChange={onFormValueChange}
        error={formErrors.email}
      />
      <PasswordInput
        id="password"
        label="Senha"
        name="password"
        placeholder="Digite sua senha"
        value={formValues.password}
        handleChange={onFormValueChange}
        error={formErrors.password}
      />
    </form>
  )
}

LoginForm.prototypes = {
  formValues: PropTypes.node,
  onFormValueChange: PropTypes.node
}

export { LoginForm }
