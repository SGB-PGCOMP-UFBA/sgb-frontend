import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'

function LoginForm(props) {
  const { formValues, onChangeFormValues, onSubmit } = props

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <Box noValidate component="form" autoComplete="off" onSubmit={handleSubmit}>
      <div className="flex flex-col h-full w-full gap-y-6">
        <TextField
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
        />
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
        />
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
        <Button variant="contained" type="submit">
          Entrar
        </Button>
      </div>
    </Box>
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
