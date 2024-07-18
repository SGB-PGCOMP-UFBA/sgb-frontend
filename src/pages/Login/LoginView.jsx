import PropTypes from 'prop-types'
import React from 'react'
import { Box } from '@mui/material'
import { LoginForm } from './components/LoginForm'

function LoginView(props) {
  const { formValues, onChangeFormValues, onSubmit } = props;

  return (
    <Box className="flex h-full w-full p-5 md:p-10">
      <LoginForm formValues={formValues} onChangeFormValues={onChangeFormValues} onSubmit={onSubmit} />
    </Box>
  )
}

LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formValues: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  onChangeFormValues: PropTypes.func.isRequired,
}

export { LoginView }
