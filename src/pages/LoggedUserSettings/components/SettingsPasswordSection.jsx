import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material'
import { api } from '../../../api'
import { Visibility, VisibilityOff } from '@mui/icons-material'

function SettingsPasswordSection(props) {
  const { user } = props
  const [values, setValues] = useState({
    email: user?.email || '',
    current_password: '',
    new_password: '',
    confirm_new_password: ''
  })

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show)
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show)

  const handleMouseDownPassword = (event) => { event.preventDefault() }
  const handleMouseDownNewPassword = (event) => { event.preventDefault() }
  const handleMouseDownConfirmPassword = (event) => { event.preventDefault() }

  const handleMouseUpPassword = (event) => { event.preventDefault() }
  const handleMouseUpNewPassword = (event) => { event.preventDefault() }
  const handleMouseUpConfirmPassword = (event) => { event.preventDefault() }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setValues({ ...values, email: user.email })
      if(user && user.role === 'ADMIN') {
        await api.admin.updateAdminPassword(values)
      }
      else if(user && (user.role === 'ADVISOR' || user.role === 'ADVISOR_WITH_ADMIN_PRIVILEGES')) {
        await api.advisor.updateAdvisorPassword(values)
      }
      else if(user && user.role === 'STUDENT') {
        await api.student.updateStudentPassword(values)
      }
      toast.success('Senha alterada com sucesso.')

      setValues({
        email: user?.email || '',
        current_password: '',
        new_password: '',
        confirm_new_password: ''
      })
    } catch (error) {
      if ([400, 422].includes(error.response.status)) {
        toast.error(getFirstErrorMessage(error.response.data.message))
      } else {
        toast.error('Erro inesperado. Tente novamente!')
      }
    }
  }

  function getFirstErrorMessage(message) {
    if (Array.isArray(message)) {
      return message[0];
    }
    return message;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card elevation={0} sx={{ border: 1, borderColor: '#e5e7eb' }}>
        <CardHeader subheader="Atualizar Senha de Acesso" title="Senha" />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 450 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="current_password">Senha Atual</InputLabel>
            <OutlinedInput
              id="current_password"
              name="current_password"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => handleChange(e)}
              value={values.current_password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Senha Atual"
            />
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="new_password">Nova Senha</InputLabel>
            <OutlinedInput
              id="new_password"
              name="new_password"
              type={showNewPassword ? 'text' : 'password'}
              onChange={(e) => handleChange(e)}
              value={values.new_password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowNewPassword}
                    onMouseDown={handleMouseDownNewPassword}
                    onMouseUp={handleMouseUpNewPassword}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Nova Senha"
            />
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="confirm_new_password">Confirmar Nova Senha</InputLabel>
            <OutlinedInput
              id="confirm_new_password"
              name="confirm_new_password"
              type={showConfirmPassword ? 'text' : 'password'}
              onChange={(e) => handleChange(e)}
              value={values.confirm_new_password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                    onMouseUp={handleMouseUpConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirmar Nova Senha"
            />
          </FormControl>

          <Typography variant='caption'>Sua senha deve ter entre 4 e 8 caracteres, incluindo letras e números.</Typography>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">Salvar Senha</Button>
        </CardActions>
      </Card>
    </form>
  )
}

SettingsPasswordSection.propTypes = {
  user: PropTypes.node
}

export { SettingsPasswordSection }
