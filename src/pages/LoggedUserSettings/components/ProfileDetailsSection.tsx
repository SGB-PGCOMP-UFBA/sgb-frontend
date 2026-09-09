import { useState } from 'react'
import axios from 'axios'
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
import { updateUserFromLocalStorage } from '../../../helpers/auth-user'
import type { StoredUser } from '../../../helpers/auth-user'
import { CpfMaskInput, PhoneMaskInput } from '../../../components/Masks/muiInput'

export interface ProfileDetailsSectionProps {
  /** `null` quando nao ha ninguem autenticado no localStorage. */
  user: StoredUser | null
}

/**
 * Corpo comum das tres rotas de atualizacao de perfil. `link_to_lattes` e
 * opcional porque o proprio fluxo o remove do payload quando o usuario nao e
 * estudante.
 */
interface ProfileUpdatePayload {
  current_email: string
  email: string
  name: string
  tax_id: string
  phone_number: string
  link_to_lattes?: string
}

function ProfileDetailsSection(props: ProfileDetailsSectionProps) {
  const { user } = props

  const [values, setValues] = useState({
    email: user?.email || '',
    name: user?.name || '',
    tax_id: user?.tax_id || '',
    phone_number: user?.phone_number || '',
    link_to_lattes: user?.link_to_lattes || ''
  })

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload: ProfileUpdatePayload = {
      ...values,
      current_email: user?.email || '',
      tax_id: values.tax_id.replace(/[^0-9]/g, ''),
      phone_number: values.phone_number.replace(/[^0-9]/g, '')
    }

    try {
      if(user && user.role === 'ADMIN') {
        delete payload.link_to_lattes
        await api.admin.updateAdmin(payload)
      }
      else if(user && (user.role === 'ADVISOR' || user.role === 'ADVISOR_WITH_ADMIN_PRIVILEGES')) {
        delete payload.link_to_lattes
        await api.advisor.updateAdvisor(payload)
      }
      else if(user && user.role === 'STUDENT') {
        await api.student.updateStudent(payload)
      }
      toast.success('Informações alteradas com sucesso.')
      updateUserFromLocalStorage(payload)
    } catch (error) {
      if (axios.isAxiosError(error) && [400, 422].includes(error.response?.status ?? 0)) {
        toast.error(getFirstErrorMessage(error.response?.data))
      } else {
        toast.error('Erro inesperado. Tente novamente!')
      }
    }
  }

  function getFirstErrorMessage(data: unknown): string {
    const message =
      data && typeof data === 'object' && 'message' in data ? data.message : undefined

    if (Array.isArray(message)) {
      return String(message[0]);
    }
    return String(message);
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Card elevation={0} sx={{ border: 1, borderColor: '#e5e7eb' }}>
        <CardHeader subheader="Informações do Usuário" title="Perfil" />
        <CardContent>
          <Box>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Name"
                  name="name"
                  onChange={(e) => handleChange(e)}
                  value={values.name}
                  inputProps={{ maxLength: 80 }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="E-mail"
                  name="email"
                  onChange={(e) => handleChange(e)}
                  value={values.email}
                  inputProps={{ maxLength: 80 }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="CPF"
                  name="tax_id"
                  onChange={(e) => handleChange(e)}
                  value={values.tax_id}
                  InputProps={{
                    inputComponent: CpfMaskInput
                  }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Telefone"
                  name="phone_number"
                  onChange={(e) => handleChange(e)}
                  value={values.phone_number}
                  InputProps={{
                    inputComponent: PhoneMaskInput
                  }}
                />
              </Grid>
              {}
              {user?.role === 'STUDENT' && (
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Link para o Lattes"
                    name="link_to_lattes"
                    onChange={(e) => handleChange(e)}
                    value={values.link_to_lattes}
                    inputProps={{ maxLength: 80 }}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">Salvar</Button>
        </CardActions>
      </Card>
    </form>
  )
}

export { ProfileDetailsSection }
