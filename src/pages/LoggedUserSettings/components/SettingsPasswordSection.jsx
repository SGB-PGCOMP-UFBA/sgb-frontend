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

const initialState = {
  email: '',
  password: '',
  confirm: ''
}

function SettingsPasswordSection(props) {
  const { user } = props
  const [values, setValues] = useState(initialState)

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValues({ ...values, email: user.email })

    try {
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
      setValues(initialState)
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
              label="Senha"
              name="password"
              onChange={(e) => handleChange(e)}
              type="password"
              value={values.password}
            />
            <TextField
              fullWidth
              label="Senha (Confirmar)"
              name="confirm"
              onChange={(e) => handleChange(e)}
              type="password"
              value={values.confirm}
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
