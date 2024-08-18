import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material'

function LoginForm(props) {
  const { formValues, onChangeFormValues, onSubmit } = props

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit()
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
          Entrar
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                required
                fullWidth
                error={false}
                type="email"
                id="input-email"
                name="email"
                label="E-mail"
                placeholder="Digite seu e-mail"
                value={formValues.email}
                onChange={onChangeFormValues}
                helperText={false ? 'E-mail inválido' : ''}
                InputLabelProps={{
                  shrink: true,
                }}
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                error={false}
                type="password"
                id="input-password"
                name="password"
                label="Senha"
                placeholder="Digite sua senha"
                value={formValues.password}
                onChange={onChangeFormValues}
                helperText={false ? 'Senha inválida' : ''}
                InputLabelProps={{
                  shrink: true,
                }}
                autoComplete='current-password'
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="label-radio-buttons-role">Quem é você?</FormLabel>
                <RadioGroup
                  row
                  id="radio-buttons-role"
                  name="role"
                  value={formValues.role}
                  onChange={onChangeFormValues}
                >
                  <FormControlLabel value="STUDENT" control={<Radio />} label="Estudante" />
                  <FormControlLabel value="ADVISOR" control={<Radio />} label="Orientador" />
                  <FormControlLabel value="ADMIN" control={<Radio />} label="Administrador" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
          <Grid container direction="column" alignItems="center" justifyContent="center" marginTop="3em" marginBottom="3em">
            <Grid item>
              <p className="text-center text-base font-normal leading-6">
                Você é estudante e ainda não tem uma conta?{' '}
                <Link to="/cadastro-estudante" className="text-base font-normal text-blue-600 transition-colors hover:text-blue-800">
                  Cadastre-se!
                </Link>
              </p>
            </Grid>
            <Grid item>
              <Link to="/esqueci-a-senha" className="text-base font-normal text-blue-600 leading-6 transition-colors hover:text-blue-800">
                Esqueceu sua senha?
              </Link>
            </Grid>
            <Grid item marginTop="3em">
              <p className="text-center text-base font-normal leading-6">
                Você é orientador?{' '}
                <Link to="/cadastro-orientador" className="text-base font-normal text-blue-600 transition-colors hover:text-blue-800">
                  Saiba como acessar!
                </Link>
              </p>
            </Grid>
            <Grid item marginTop="1em">
              <Link to="/sobre" className="text-base font-normal text-blue-600 leading-6 transition-colors hover:text-blue-800">
                Sobre o Sistema
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

LoginForm.prototypes = {
  onSubmit: PropTypes.func.isRequired,
  formValues: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  onChangeFormValues: PropTypes.func.isRequired,
}

export { LoginForm }
