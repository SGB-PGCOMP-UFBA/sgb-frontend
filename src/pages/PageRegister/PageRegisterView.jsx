import React from 'react'
import { Box } from '@mui/material'
import { RegisterForm } from './components/RegisterForm'

function PageRegisterView() {
  return (
    <Box className="flex h-full w-full p-5 md:p-10">
      <RegisterForm />
    </Box>
  )
}

export { PageRegisterView }
