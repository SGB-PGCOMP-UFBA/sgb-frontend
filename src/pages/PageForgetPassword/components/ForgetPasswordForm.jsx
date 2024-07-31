import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import Loading from '../../../components/Loading'

const initialState = {
  email: '',
  role: 'STUDENT'
}

function ForgetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState(initialState)

  const handleChangeValues = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const { email, role } = values

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/passwords/reset`, { email, role })

      if (response.status === 201) {
        toast.success('Sua nova senha foi enviada para seu e-mail.')
      }
    } catch (error) {
        toast.error(`${error.response.data.message}`)
    } finally {
      setValues(initialState)
      setIsLoading(false)
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
        <Typography component="h1" variant="h6" sx={{ mb: isLoading ? 10 : 2 }}>
          Password Recovery
        </Typography>
        {isLoading ? (
          <Loading />
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <FormControl sx={{ mt: 2, mb: 4 }}>
              <FormLabel id="label-radio-buttons-role">Quem é você?</FormLabel>
              <RadioGroup
                row
                id="radio-buttons-role"
                name="role"
                defaultValue={initialState.role}
                onChange={handleChangeValues}
              >
                <FormControlLabel value="STUDENT" control={<Radio />} label="Estudante" />
                <FormControlLabel value="ADVISOR" control={<Radio />} label="Orientador" />
                <FormControlLabel value="ADMIN" control={<Radio />} label="Administrador" />
              </RadioGroup>
            </FormControl>

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
              sx={{ mt: 6, mb: 2 }}
            >
              Enviar
            </Button>
            <Grid container justifyContent="flex-end" marginTop="3em" marginBottom="3em">
              <Grid item>
                <p className="text-center text-base font-normal leading-6">
                  Lembrou sua senha?{' '}
                  <Link to="/" className="text-base font-normal text-blue-600 transition-colors hover:text-blue-800">
                    Entrar!
                  </Link>
                </p>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  )
}

export { ForgetPasswordForm }
