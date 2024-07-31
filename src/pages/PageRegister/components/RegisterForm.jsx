import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import { CpfInputMask, PhoneInputMask } from '../../../components/Masks';
import { api } from '../../../api'
import { addUserToLocalStorage, getUserFromLocalStorage } from '../../../helpers/auth-user'
import { delay } from '../../../helpers/delay';

const initialState = {
  tax_id: '',
  email: '',
  phone_number: '',
  link_to_lattes: '',
  name: '',
  password: '',
  confirm_password: '',
}

function RegisterForm() {
  const navigate = useNavigate()

  const [values, setValues] = useState(initialState)

  const handleChangeValues = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const firstRedirect = (user) => {
    if (user && user.role === 'ADMIN') {
      navigate('/dashboard', { replace: true })
    } else if (user && user.role === 'ADVISOR') {
      navigate('/orientandos', { replace: true })
    } else if (user && user.role === 'STUDENT') {
      navigate('/area-do-estudante', { replace: true })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (values.password !== values.confirm_password) {
      toast.error('As senhas digitadas são diferentes!')
      return
    }

    try {
      const createStudentResponse = await api.student.createStudent({
        email: values.email,
        name: values.name,
        link_to_lattes: values.link_to_lattes,
        password: values.password,
        tax_id: values.tax_id.replace(/[^0-9]/g, ''),
        phone_number: values.phone_number.replace(/[^0-9]/g, '')
      })

      if ([200, 201].includes(createStudentResponse.status)) {
        toast.success('Cadastrado realizado com sucesso! Em poucos segundos você será redirecionado.', { autoClose: 2000 })

        const loginResponse = await api.auth.login({
          email: values.email,
          password: values.password,
          role: 'STUDENT'
        })

        if ([200, 201].includes(loginResponse.status)) {
          addUserToLocalStorage(loginResponse.data)

          await delay(2000)

          firstRedirect(getUserFromLocalStorage())
        }
      }
    } catch (error) {
      toast.error(`${error.response.data.message}`)
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
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  required
                  fullWidth
                  id="name"
                  label="Nome Completo"
                  name="name"
                  onChange={handleChangeValues}
                  placeholder="Insira o seu nome completo"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phone_number"
                  label="Telefone"
                  name="phone_number"
                  onChange={handleChangeValues}
                  InputProps={{
                    inputComponent: PhoneInputMask
                  }}
                  placeholder="Insira o seu telefone"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="tax_id"
                  label="CPF"
                  name="tax_id"
                  onChange={handleChangeValues}
                  InputProps={{
                    inputComponent: CpfInputMask
                  }}
                  placeholder="Insira o seu CPF"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="link_to_lattes"
                  label="Currículo Lattes"
                  name="link_to_lattes"
                  onChange={handleChangeValues}
                  placeholder="Insira o link de seu currículo Lattes"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  type="email"
                  name="email"
                  onChange={handleChangeValues}
                  placeholder="Insira o seu e-mail"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  onChange={handleChangeValues}
                  placeholder="Insira uma senha"
                  error={values.password === null || values.password === ''}
                  helperText={values.password === null || values.password === '' ? 'Digite uma senha válida' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirmar Senha"
                  type="password"
                  id="confirm_password"
                  onChange={handleChangeValues}
                  placeholder="Digite sua senha novamente"
                  error={values.password !== values.confirm_password}
                  helperText={values.password !== values.confirm_password ? 'As senhas digitadas são diferentes!' : ''}
                />
              </Grid>
            </Grid>
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
                  Já possui uma conta?{' '}
                  <Link to="/" className="text-base font-normal text-blue-600 transition-colors hover:text-blue-800">
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

export { RegisterForm }
