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
  Stack,
  TextField
} from '@mui/material'
import { api } from '../../../api'

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setValues({ ...values, email: user.email })
      if(user && user.role === 'ADMIN') {
        await api.admin.updateAdminPassword(values)
      }
      else if(user && user.role === 'ADVISOR') {
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
          <Stack spacing={3} sx={{ maxWidth: 400 }}>
            <TextField
              fullWidth
              label="Senha Atual"
              name="current_password"
              onChange={(e) => handleChange(e)}
              type="password"
              value={values.current_password}
            />
            <TextField
              fullWidth
              label="Nova Senha"
              name="new_password"
              onChange={(e) => handleChange(e)}
              type="password"
              value={values.new_password}
              inputProps={{ minLength: 4, maxLength: 8 }}
            />
            <TextField
              fullWidth
              label="Nova Senha (Confirmar)"
              name="confirm_new_password"
              onChange={(e) => handleChange(e)}
              type="password"
              value={values.confirm_new_password}
              inputProps={{ minLength: 4, maxLength: 8 }}
            />
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

SettingsPasswordSection.prototypes = {
  user: PropTypes.node
}

export { SettingsPasswordSection }
