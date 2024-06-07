import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material'
import { api } from '../../../api'

const initialState = {
  originalEmail: '',
  email: '',
  name: '',
  tax_id: '',
  phone_number: '',
  link_to_lattes: ''
}

function ProfileDetailsSection(props) {
  const { user } = props
  const [values, setValues] = useState(user || initialState)

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if(user && user.role === 'ADMIN') {
        await api.admin.updateAdmin(user.id, values)
      }
      else if(user && user.role === 'ADVISOR') {
        await api.advisor.updateAdvisor(user.id, values)
      }
      else if(user && user.role === 'STUDENT') {
        await api.student.updateStudent(user.id, values)
      }
      toast.success('Informações alteradas com sucesso.')
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
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card elevation={0} sx={{ border: 1, borderColor: '#e5e7eb' }}>
        <CardHeader subheader="Informações do Usuário" title="Perfil" />
        <CardContent>
          <Box>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  onChange={(e) => handleChange(e)}
                  value={values.name}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="E-mail"
                  name="email"
                  onChange={(e) => handleChange(e)}
                  value={values.email}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="CPF"
                  name="tax_id"
                  onChange={(e) => handleChange(e)}
                  value={values.tax_id}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Telefone"
                  name="phone_number"
                  onChange={(e) => handleChange(e)}
                  value={values.phone_number}
                />
              </Grid>
              {user.role === 'STUDENT' && (
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Link para o Lattes"
                    name="link_to_lattes"
                    onChange={(e) => handleChange(e)}
                    value={values.link_to_lattes}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">Salvar Informações</Button>
        </CardActions>
      </Card>
    </form>
  )
}

ProfileDetailsSection.prototypes = {
  user: PropTypes.node
}

export { ProfileDetailsSection }
