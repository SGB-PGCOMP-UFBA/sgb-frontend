import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material'

const initialState = {
  email: '',
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
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src="/assets/pgcomp_1.png" alt="PGCOMP" className="max-w-[200px]" />
        <Typography component="h1" variant="h5" marginBottom="1.4em" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Sistema de Gerenciamento de Bolsas
        </Typography>
        <Typography component="h1" variant="h6">
          Password Recovery
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: '100%' }}>
          <TextField
            autoFocus
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            type="email"
            onChange={handleChangeValues}
            placeholder="Digite seu e-mail"
            helperText="Informe o endereço de e-mail utilizado em seu cadastro"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Enviar
          </Button>
          <Grid container justifyContent="flex-end" marginTop="3em" marginBottom="3em">
            <Grid item>
              <p className="text-center text-base font-normal leading-6">
                Lembrou sua senha?{' '}
                <Link to="/cadastre-se" className="text-base font-normal text-blue-600 transition-colors hover:text-blue-800">
                  Entrar!
                </Link>
              </p>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export { ForgetPasswordForm }
