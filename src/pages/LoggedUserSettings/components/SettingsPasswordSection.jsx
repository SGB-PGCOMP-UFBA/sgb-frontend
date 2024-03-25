import { useCallback, useState } from 'react'
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

function SettingsPasswordSection() {
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  })

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }, [])

  const handleSubmit = useCallback((event) => {
    event.preventDefault()
  }, [])

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
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            <TextField
              fullWidth
              label="Senha (Confirmar)"
              name="confirm"
              onChange={handleChange}
              type="password"
              value={values.confirm}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">Atualizar</Button>
        </CardActions>
      </Card>
    </form>
  )
}

export { SettingsPasswordSection }
