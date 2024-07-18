import React from 'react'
import { Box } from '@mui/material'
import { ForgetPasswordForm } from './components/ForgetPasswordForm'

function PageForgetPasswordView() {
  return (
    <Box className="flex h-full w-full p-5 md:p-10">
      <ForgetPasswordForm />
    </Box>
  )
}

export { PageForgetPasswordView }
