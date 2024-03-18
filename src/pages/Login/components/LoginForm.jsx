import React from 'react'
import PropTypes from 'prop-types'
import { FormInput, PasswordInput } from '../../../components'

function LoginForm(props) {
  const { formErrors, formValues, onFormValueChange } = props

  return (
    <form className="flex w-full flex-col gap-y-5 font-inter">
      <FormInput
        id="tax_id"
        label="CPF"
        type="text"
        name="tax_id"
        placeholder="Digite seu CPF"
        value={formValues.tax_id}
        handleChange={onFormValueChange}
        error={formErrors.tax_id}
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
